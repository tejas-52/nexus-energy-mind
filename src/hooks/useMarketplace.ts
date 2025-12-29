import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Listing {
  id: string;
  user_id: string;
  listing_type: 'buy' | 'sell';
  energy_amount_kwh: number;
  price_per_kwh: number;
  location: string | null;
  is_active: boolean;
  available_from: string | null;
  available_until: string | null;
  created_at: string;
  profile?: {
    full_name: string | null;
    trading_rating: number | null;
  };
}

export const useMarketplace = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('energy_listings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Fetch profiles separately
      const userIds = [...new Set(data.map(l => l.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, trading_rating')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      
      const listingsWithProfiles = data.map(listing => ({
        ...listing,
        listing_type: listing.listing_type as 'buy' | 'sell',
        profile: profileMap.get(listing.user_id) as { full_name: string | null; trading_rating: number | null } | undefined,
      }));

      setListings(listingsWithProfiles);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to load marketplace listings');
    } finally {
      setLoading(false);
    }
  };

  const purchaseEnergy = async (listing: Listing, amount: number) => {
    if (!user) {
      toast.error('Please login to purchase energy');
      return false;
    }

    if (listing.user_id === user.id) {
      toast.error('You cannot buy your own listing');
      return false;
    }

    if (amount > listing.energy_amount_kwh) {
      toast.error('Requested amount exceeds available energy');
      return false;
    }

    setPurchasing(listing.id);

    try {
      const totalPrice = amount * listing.price_per_kwh;

      // Create transaction record
      const { error: txError } = await supabase
        .from('energy_transactions')
        .insert({
          seller_id: listing.user_id,
          buyer_id: user.id,
          energy_amount_kwh: amount,
          price_per_kwh: listing.price_per_kwh,
          total_price: totalPrice,
          transaction_type: 'sell',
          status: 'completed',
          completed_at: new Date().toISOString(),
        });

      if (txError) throw txError;

      // Update listing - deduct purchased amount
      const remainingEnergy = listing.energy_amount_kwh - amount;
      
      if (remainingEnergy <= 0) {
        // Deactivate listing if no energy left
        const { error: updateError } = await supabase
          .from('energy_listings')
          .update({ 
            is_active: false,
            energy_amount_kwh: 0 
          })
          .eq('id', listing.id);

        if (updateError) throw updateError;
      } else {
        // Update remaining energy
        const { error: updateError } = await supabase
          .from('energy_listings')
          .update({ energy_amount_kwh: remainingEnergy })
          .eq('id', listing.id);

        if (updateError) throw updateError;
      }

      toast.success(`Successfully purchased ${amount} kWh for $${totalPrice.toFixed(2)}`);
      
      // Refresh listings
      await fetchListings();
      return true;

    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to complete purchase');
      return false;
    } finally {
      setPurchasing(null);
    }
  };

  const createListing = async (data: {
    listing_type: 'buy' | 'sell';
    energy_amount_kwh: number;
    price_per_kwh: number;
    location?: string;
  }) => {
    if (!user) {
      toast.error('Please login to create a listing');
      return false;
    }

    try {
      const { error } = await supabase
        .from('energy_listings')
        .insert({
          user_id: user.id,
          listing_type: data.listing_type,
          energy_amount_kwh: data.energy_amount_kwh,
          price_per_kwh: data.price_per_kwh,
          location: data.location || null,
          is_active: true,
        });

      if (error) throw error;

      toast.success('Listing created successfully!');
      await fetchListings();
      return true;
    } catch (error) {
      console.error('Create listing error:', error);
      toast.error('Failed to create listing');
      return false;
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    purchasing,
    purchaseEnergy,
    createListing,
    refetch: fetchListings,
  };
};
