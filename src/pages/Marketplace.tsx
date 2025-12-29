import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useMarketplace, Listing } from '@/hooks/useMarketplace';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  Zap, 
  ArrowUpDown,
  MapPin,
  Clock,
  Star,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  User,
  Loader2,
  Plus
} from 'lucide-react';

const Marketplace = () => {
  const { user } = useAuth();
  const { listings, loading, purchasing, purchaseEnergy, createListing } = useMarketplace();
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState<Record<string, number>>({});
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newListing, setNewListing] = useState({
    listing_type: 'sell' as 'buy' | 'sell',
    energy_amount_kwh: 10,
    price_per_kwh: 0.08,
    location: '',
  });

  const filteredListings = listings.filter(listing => {
    if (filter !== 'all' && listing.listing_type !== filter) return false;
    if (searchQuery) {
      const sellerName = listing.profile?.full_name || 'Unknown Seller';
      if (!sellerName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const gridPrice = 0.12;
  const totalEnergy = listings.filter(l => l.listing_type === 'sell').reduce((acc, l) => acc + l.energy_amount_kwh, 0);
  const avgP2PPrice = listings.length > 0 
    ? listings.reduce((acc, l) => acc + l.price_per_kwh, 0) / listings.length 
    : 0.075;
  const savings = gridPrice > avgP2PPrice ? ((gridPrice - avgP2PPrice) / gridPrice * 100).toFixed(0) : '0';

  const handlePurchase = async (listing: Listing) => {
    const amount = purchaseAmount[listing.id] || listing.energy_amount_kwh;
    await purchaseEnergy(listing, amount);
    setPurchaseAmount(prev => ({ ...prev, [listing.id]: 0 }));
  };

  const handleCreateListing = async () => {
    const success = await createListing(newListing);
    if (success) {
      setCreateDialogOpen(false);
      setNewListing({ listing_type: 'sell', energy_amount_kwh: 10, price_per_kwh: 0.08, location: '' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Badge variant="energy" className="mb-4">
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Decentralized Trading
                </Badge>
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
                  P2P Energy <span className="text-gradient-primary">Marketplace</span>
                </h1>
                <p className="text-muted-foreground">
                  Buy and sell surplus energy directly with your neighbors
                </p>
              </div>
              {user && (
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="hero">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Energy Listing</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="flex gap-2">
                        <Button
                          variant={newListing.listing_type === 'sell' ? 'default' : 'outline'}
                          onClick={() => setNewListing(prev => ({ ...prev, listing_type: 'sell' }))}
                          className="flex-1"
                        >
                          I'm Selling
                        </Button>
                        <Button
                          variant={newListing.listing_type === 'buy' ? 'default' : 'outline'}
                          onClick={() => setNewListing(prev => ({ ...prev, listing_type: 'buy' }))}
                          className="flex-1"
                        >
                          I'm Buying
                        </Button>
                      </div>
                      <div>
                        <Label>Energy Amount (kWh)</Label>
                        <Input
                          type="number"
                          value={newListing.energy_amount_kwh}
                          onChange={(e) => setNewListing(prev => ({ ...prev, energy_amount_kwh: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label>Price per kWh ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newListing.price_per_kwh}
                          onChange={(e) => setNewListing(prev => ({ ...prev, price_per_kwh: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label>Location (optional)</Label>
                        <Input
                          value={newListing.location}
                          onChange={(e) => setNewListing(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="e.g., Downtown, Mumbai"
                        />
                      </div>
                      <Button onClick={handleCreateListing} className="w-full">
                        Create Listing
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card variant="stats">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">{totalEnergy.toFixed(1)} kWh</p>
                    <p className="text-xs text-muted-foreground">Available Now</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card variant="stats">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">${avgP2PPrice.toFixed(3)}/kWh</p>
                    <p className="text-xs text-muted-foreground">Avg P2P Price</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card variant="stats">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">{savings}% Savings</p>
                    <p className="text-xs text-muted-foreground">vs Grid Price</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card variant="stats">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">{listings.length}</p>
                    <p className="text-xs text-muted-foreground">Active Listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
                All
              </Button>
              <Button variant={filter === 'sell' ? 'default' : 'outline'} onClick={() => setFilter('sell')}>
                <TrendingUp className="w-4 h-4 mr-1" />
                Selling
              </Button>
              <Button variant={filter === 'buy' ? 'default' : 'outline'} onClick={() => setFilter('buy')}>
                <TrendingDown className="w-4 h-4 mr-1" />
                Buying
              </Button>
            </div>
          </div>

          {/* Listings Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredListings.length === 0 ? (
            <Card variant="glass" className="py-12 text-center">
              <p className="text-muted-foreground">No listings available. Be the first to create one!</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card 
                  key={listing.id} 
                  variant="glass"
                  className="group hover:border-primary/30 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold">
                          {(listing.profile?.full_name || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{listing.profile?.full_name || 'Anonymous'}</h3>
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 text-accent fill-accent" />
                            <span>{listing.profile?.trading_rating?.toFixed(1) || '5.0'}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={listing.listing_type === 'sell' ? 'success' : 'warning'}>
                        {listing.listing_type === 'sell' ? 'Selling' : 'Buying'}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="w-4 h-4" />
                          Available Energy
                        </div>
                        <span className="font-display font-bold text-primary">
                          {listing.energy_amount_kwh} kWh
                        </span>
                      </div>
                      {listing.location && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            Location
                          </div>
                          <span className="text-sm">{listing.location}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Listed
                        </div>
                        <span className="text-sm">
                          {new Date(listing.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-display text-2xl font-bold">
                            ${listing.price_per_kwh}
                          </span>
                          <span className="text-sm text-muted-foreground">/kWh</span>
                          {listing.listing_type === 'sell' && listing.price_per_kwh < gridPrice && (
                            <p className="text-xs text-green-500">
                              Save {Math.round((gridPrice - listing.price_per_kwh) / gridPrice * 100)}% vs grid
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {listing.listing_type === 'sell' && user && user.id !== listing.user_id && (
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="kWh"
                            value={purchaseAmount[listing.id] || ''}
                            onChange={(e) => setPurchaseAmount(prev => ({
                              ...prev,
                              [listing.id]: Math.min(parseFloat(e.target.value) || 0, listing.energy_amount_kwh)
                            }))}
                            className="w-24"
                            max={listing.energy_amount_kwh}
                          />
                          <Button 
                            variant="hero" 
                            className="flex-1"
                            onClick={() => handlePurchase(listing)}
                            disabled={purchasing === listing.id}
                          >
                            {purchasing === listing.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              'Buy Now'
                            )}
                          </Button>
                        </div>
                      )}
                      
                      {!user && listing.listing_type === 'sell' && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href="/auth">Login to Buy</a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Your Listings CTA */}
          <Card variant="glow" className="mt-8">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">
                Start Trading Your Energy
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Have surplus solar energy? List it on the marketplace and earn money while helping your community go green.
              </p>
              <div className="flex items-center justify-center gap-4">
                {user ? (
                  <Button variant="hero" size="lg" onClick={() => setCreateDialogOpen(true)}>
                    Create Listing
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" asChild>
                    <a href="/auth">Sign Up to Start</a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
