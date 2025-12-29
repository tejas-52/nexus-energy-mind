import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Sun, 
  MapPin, 
  Calculator as CalcIcon, 
  TrendingUp,
  DollarSign,
  Leaf,
  Zap,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

const Calculator = () => {
  const [location, setLocation] = useState('');
  const [panelCapacity, setPanelCapacity] = useState([10]);
  const [panelEfficiency, setPanelEfficiency] = useState('20');
  const [roofTilt, setRoofTilt] = useState([30]);
  const [roofOrientation, setRoofOrientation] = useState('south');
  const [showResults, setShowResults] = useState(false);

  // Mock calculation results
  const results = {
    dailyGeneration: 42.5,
    monthlyGeneration: 1275,
    yearlyGeneration: 15300,
    monthlySavings: 185,
    yearlySavings: 2220,
    paybackPeriod: 6.2,
    co2Offset: 8.5,
    confidence: 87,
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <Badge variant="solar" className="mb-4">
              <Sun className="w-3 h-3 mr-1" />
              AI-Powered Calculations
            </Badge>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Solar Energy <span className="text-gradient-solar">Calculator</span>
            </h1>
            <p className="text-muted-foreground">
              Get accurate energy generation estimates based on your location, 
              panel specifications, and local weather patterns.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Input Form */}
            <Card variant="glass" className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalcIcon className="w-5 h-5 text-accent" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Enter your solar setup details for accurate estimates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter city or coordinates"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll use local weather data for accurate predictions
                  </p>
                </div>

                {/* Panel Capacity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Panel Capacity
                    </Label>
                    <span className="text-sm font-medium text-primary">
                      {panelCapacity[0]} kW
                    </span>
                  </div>
                  <Slider
                    value={panelCapacity}
                    onValueChange={setPanelCapacity}
                    max={50}
                    min={1}
                    step={0.5}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 kW</span>
                    <span>50 kW</span>
                  </div>
                </div>

                {/* Panel Efficiency */}
                <div className="space-y-2">
                  <Label htmlFor="efficiency" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Panel Efficiency
                  </Label>
                  <Select value={panelEfficiency} onValueChange={setPanelEfficiency}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select efficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">Standard (15%)</SelectItem>
                      <SelectItem value="18">High Efficiency (18%)</SelectItem>
                      <SelectItem value="20">Premium (20%)</SelectItem>
                      <SelectItem value="22">Ultra Premium (22%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Roof Tilt */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Roof Tilt Angle
                    </Label>
                    <span className="text-sm font-medium text-primary">
                      {roofTilt[0]}°
                    </span>
                  </div>
                  <Slider
                    value={roofTilt}
                    onValueChange={setRoofTilt}
                    max={60}
                    min={0}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0° (Flat)</span>
                    <span>60° (Steep)</span>
                  </div>
                </div>

                {/* Roof Orientation */}
                <div className="space-y-2">
                  <Label htmlFor="orientation">Roof Orientation</Label>
                  <Select value={roofOrientation} onValueChange={setRoofOrientation}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="south">South (Optimal)</SelectItem>
                      <SelectItem value="southeast">Southeast</SelectItem>
                      <SelectItem value="southwest">Southwest</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="solar" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCalculate}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Calculate Potential
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {showResults ? (
                <>
                  {/* Confidence Score */}
                  <Card variant="glow" className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Calculation Confidence</p>
                          <div className="font-display text-4xl font-bold text-primary">
                            {results.confidence}%
                          </div>
                        </div>
                        <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                              cx="40"
                              cy="40"
                              r="36"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="4"
                              strokeDasharray={`${results.confidence * 2.26} 226`}
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <Sun className="w-8 h-8 text-accent" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Info className="w-4 h-4" />
                        Based on 5-year historical weather data
                      </div>
                    </CardContent>
                  </Card>

                  {/* Generation Estimates */}
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        Energy Generation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <div className="font-display text-2xl font-bold text-primary">
                            {results.dailyGeneration}
                          </div>
                          <p className="text-xs text-muted-foreground">kWh / Day</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                          <div className="font-display text-2xl font-bold text-primary">
                            {results.monthlyGeneration.toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">kWh / Month</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-primary/15 border border-primary/30">
                          <div className="font-display text-2xl font-bold text-primary">
                            {results.yearlyGeneration.toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">kWh / Year</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financial & Environmental */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card variant="stats">
                      <CardContent className="p-6">
                        <DollarSign className="w-8 h-8 text-green-500 mb-3" />
                        <div className="font-display text-3xl font-bold mb-1">
                          ${results.yearlySavings.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Yearly Savings
                        </p>
                        <Badge variant="success" className="text-xs">
                          {results.paybackPeriod} year payback
                        </Badge>
                      </CardContent>
                    </Card>
                    <Card variant="stats">
                      <CardContent className="p-6">
                        <Leaf className="w-8 h-8 text-green-500 mb-3" />
                        <div className="font-display text-3xl font-bold mb-1">
                          {results.co2Offset} tons
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          CO₂ Offset / Year
                        </p>
                        <Badge variant="energy" className="text-xs">
                          42 trees equivalent
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* AI Suggestions */}
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        AI Optimization Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-sm">
                          <strong>Increase tilt to 35°</strong> could improve generation by 8% based on your latitude.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-sm">
                          <strong>Adding battery storage</strong> could save an additional $45/month by storing excess daytime generation.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card variant="glass" className="h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Sun className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      Enter Your Details
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Fill in your solar system configuration to see detailed 
                      generation estimates and savings projections.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calculator;
