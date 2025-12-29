import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  User
} from 'lucide-react';

const listings = [
  {
    id: 1,
    seller: 'Green Home Solar',
    avatar: 'GH',
    rating: 4.9,
    reviews: 127,
    distance: 0.8,
    energy: 15.5,
    price: 0.08,
    available: '2-6 PM',
    type: 'sell',
    verified: true,
  },
  {
    id: 2,
    seller: 'EcoVille Community',
    avatar: 'EV',
    rating: 4.7,
    reviews: 89,
    distance: 1.2,
    energy: 25.0,
    price: 0.07,
    available: '12-4 PM',
    type: 'sell',
    verified: true,
  },
  {
    id: 3,
    seller: 'SunPower Residence',
    avatar: 'SP',
    rating: 4.8,
    reviews: 56,
    distance: 2.1,
    energy: 8.2,
    price: 0.085,
    available: '1-5 PM',
    type: 'sell',
    verified: false,
  },
  {
    id: 4,
    seller: 'Valley Solar Farm',
    avatar: 'VS',
    rating: 5.0,
    reviews: 234,
    distance: 3.5,
    energy: 100.0,
    price: 0.065,
    available: '9 AM-7 PM',
    type: 'sell',
    verified: true,
  },
  {
    id: 5,
    seller: 'Tech Hub Office',
    avatar: 'TH',
    rating: 4.6,
    reviews: 42,
    distance: 1.8,
    energy: 45.0,
    price: 0.09,
    available: '8 AM-6 PM',
    type: 'buy',
    verified: true,
  },
  {
    id: 6,
    seller: 'Downtown Apartments',
    avatar: 'DA',
    rating: 4.5,
    reviews: 78,
    distance: 0.5,
    energy: 30.0,
    price: 0.095,
    available: '6-10 PM',
    type: 'buy',
    verified: false,
  },
];

const Marketplace = () => {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = listings.filter(listing => {
    if (filter !== 'all' && listing.type !== filter) return false;
    if (searchQuery && !listing.seller.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const gridPrice = 0.12;
  const avgP2PPrice = 0.075;
  const savings = ((gridPrice - avgP2PPrice) / gridPrice * 100).toFixed(0);

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
                    <p className="font-display text-xl font-bold">248.5 kWh</p>
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
                    <p className="font-display text-xl font-bold">${avgP2PPrice}/kWh</p>
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
                    <p className="font-display text-xl font-bold">1,247</p>
                    <p className="text-xs text-muted-foreground">Active Traders</p>
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
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'sell' ? 'default' : 'outline'}
                onClick={() => setFilter('sell')}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Selling
              </Button>
              <Button
                variant={filter === 'buy' ? 'default' : 'outline'}
                onClick={() => setFilter('buy')}
              >
                <TrendingDown className="w-4 h-4 mr-1" />
                Buying
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Listings Grid */}
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
                        {listing.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{listing.seller}</h3>
                          {listing.verified && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 text-accent fill-accent" />
                          <span>{listing.rating}</span>
                          <span>({listing.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={listing.type === 'sell' ? 'success' : 'warning'}>
                      {listing.type === 'sell' ? 'Selling' : 'Buying'}
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
                        {listing.energy} kWh
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        Distance
                      </div>
                      <span className="text-sm">{listing.distance} miles</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Available
                      </div>
                      <span className="text-sm">{listing.available}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <span className="font-display text-2xl font-bold">
                        ${listing.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/kWh</span>
                      {listing.type === 'sell' && (
                        <p className="text-xs text-green-500">
                          Save {Math.round((gridPrice - listing.price) / gridPrice * 100)}% vs grid
                        </p>
                      )}
                    </div>
                    <Button variant={listing.type === 'sell' ? 'hero' : 'solar'}>
                      {listing.type === 'sell' ? 'Buy Now' : 'Sell Here'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
                <Button variant="hero" size="lg">
                  Create Listing
                </Button>
                <Button variant="outline" size="lg">
                  View My Trades
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
