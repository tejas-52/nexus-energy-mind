import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Sun, 
  Thermometer, 
  Search,
  Zap, 
  IndianRupee, 
  Leaf, 
  TrendingUp,
  Loader2,
  Lightbulb,
  CloudSun,
  MapPin
} from 'lucide-react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface Prediction {
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyEstimate: number;
  monthlySavings: number;
  yearlySavings: number;
  efficiency: number;
  peakHours: string;
  recommendations: string[];
  carbonOffset: number;
  confidence: number;
}

interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  cloudCover: number;
  description: string;
  sunlightHours: number;
}

const EnergyPredictor = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingWeather, setIsSearchingWeather] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  // Form state
  const [panelCount, setPanelCount] = useState(10);
  const [panelCapacity, setPanelCapacity] = useState(400);
  const [panelEfficiency, setPanelEfficiency] = useState(20);
  const [panelTilt, setPanelTilt] = useState(28);
  const [temperature, setTemperature] = useState(32);
  const [sunlightHours, setSunlightHours] = useState(5.5);
  const [cloudCover, setCloudCover] = useState(20);
  const [selectedMonth, setSelectedMonth] = useState('Average');
  const [citySearch, setCitySearch] = useState('');

  const handleCitySearch = async () => {
    if (!citySearch.trim()) {
      toast({
        title: "Enter City Name",
        description: "Please enter a city name to search",
        variant: "destructive",
      });
      return;
    }

    setIsSearchingWeather(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ city: citySearch }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather');
      }

      const data = await response.json();
      setWeatherData(data);
      setTemperature(data.temperature);
      setSunlightHours(data.sunlightHours);
      setCloudCover(data.cloudCover);
      
      toast({
        title: "Weather Data Loaded",
        description: `Current temperature in ${data.city}: ${data.temperature}°C`,
      });
    } catch (error) {
      console.error('Weather search error:', error);
      toast({
        title: "City Not Found",
        description: error instanceof Error ? error.message : "Could not find weather data for this city",
        variant: "destructive",
      });
    } finally {
      setIsSearchingWeather(false);
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-energy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          panelCount,
          panelCapacityWatts: panelCapacity,
          panelEfficiency,
          panelTilt,
          panelOrientation: 180,
          location: weatherData?.city || 'India',
          temperature,
          sunlightHours,
          cloudCover,
          month: selectedMonth,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          toast({
            title: "Rate Limited",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive",
          });
          return;
        }
        if (response.status === 402) {
          toast({
            title: "Credits Exhausted",
            description: "AI credits have run out. Please add funds to continue.",
            variant: "destructive",
          });
          return;
        }
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      setPrediction(data);
      
      toast({
        title: "Prediction Complete",
        description: `Estimated ${data.monthlyGeneration.toFixed(0)} kWh/month generation`,
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "Could not generate prediction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="energy" className="mb-4">
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered Prediction
          </Badge>
          <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            Solar Energy <span className="text-gradient-primary">Predictor</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get AI-powered predictions for your solar panel setup. Enter your location or temperature 
            manually to see accurate energy generation estimates.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Panel */}
          <Card variant="glass" className="p-6">
            <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <Sun className="w-5 h-5 text-accent" />
              Panel Configuration
            </h2>

            <div className="space-y-6">
              {/* City Search */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Search City (Get Live Weather)
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter city name (e.g., Delhi, Mumbai)"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleCitySearch}
                    disabled={isSearchingWeather}
                  >
                    {isSearchingWeather ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {weatherData && (
                  <div className="bg-accent/10 rounded-lg p-3 mt-2">
                    <p className="text-sm font-medium text-accent">{weatherData.city}</p>
                    <p className="text-xs text-muted-foreground">
                      {weatherData.temperature}°C • {weatherData.description} • {weatherData.sunlightHours}h sunlight
                    </p>
                  </div>
                )}
              </div>

              {/* Panel Count */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Number of Panels</Label>
                  <span className="text-sm font-medium text-primary">{panelCount}</span>
                </div>
                <Slider
                  value={[panelCount]}
                  onValueChange={([v]) => setPanelCount(v)}
                  min={1}
                  max={50}
                  step={1}
                />
              </div>

              {/* Panel Capacity */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Panel Capacity (Watts)</Label>
                  <span className="text-sm font-medium text-primary">{panelCapacity}W</span>
                </div>
                <Slider
                  value={[panelCapacity]}
                  onValueChange={([v]) => setPanelCapacity(v)}
                  min={100}
                  max={600}
                  step={50}
                />
              </div>

              {/* Panel Efficiency */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Panel Efficiency</Label>
                  <span className="text-sm font-medium text-primary">{panelEfficiency}%</span>
                </div>
                <Slider
                  value={[panelEfficiency]}
                  onValueChange={([v]) => setPanelEfficiency(v)}
                  min={10}
                  max={25}
                  step={1}
                />
              </div>

              {/* Panel Tilt */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Panel Tilt Angle</Label>
                  <span className="text-sm font-medium text-primary">{panelTilt}°</span>
                </div>
                <Slider
                  value={[panelTilt]}
                  onValueChange={([v]) => setPanelTilt(v)}
                  min={0}
                  max={45}
                  step={1}
                />
              </div>

              {/* Temperature - Manual Entry */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Temperature (Manual Entry)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-20 h-8 text-center"
                      min={0}
                      max={55}
                    />
                    <span className="text-sm text-muted-foreground">°C</span>
                  </div>
                </div>
                <Slider
                  value={[temperature]}
                  onValueChange={([v]) => setTemperature(v)}
                  min={0}
                  max={55}
                  step={1}
                />
              </div>

              {/* Sunlight Hours */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Sunlight Hours/Day
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={sunlightHours}
                      onChange={(e) => setSunlightHours(Number(e.target.value))}
                      className="w-20 h-8 text-center"
                      min={1}
                      max={14}
                      step={0.5}
                    />
                    <span className="text-sm text-muted-foreground">hrs</span>
                  </div>
                </div>
                <Slider
                  value={[sunlightHours]}
                  onValueChange={([v]) => setSunlightHours(v)}
                  min={1}
                  max={14}
                  step={0.5}
                />
              </div>

              {/* Cloud Cover */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-2">
                    <CloudSun className="w-4 h-4" />
                    Cloud Cover
                  </Label>
                  <span className="text-sm font-medium text-primary">{cloudCover}%</span>
                </div>
                <Slider
                  value={[cloudCover]}
                  onValueChange={([v]) => setCloudCover(v)}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>

              {/* Month */}
              <div className="space-y-2">
                <Label>Month (for seasonal adjustment)</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Average">Yearly Average</SelectItem>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* System Summary */}
              <div className="bg-secondary/50 rounded-xl p-4 mt-4">
                <p className="text-sm text-muted-foreground mb-2">Total System Capacity</p>
                <p className="font-display text-2xl font-bold text-primary">
                  {((panelCount * panelCapacity) / 1000).toFixed(2)} kW
                </p>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handlePredict}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    AI is analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Predict Energy Generation
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            {prediction ? (
              <>
                {/* Main Stats */}
                <Card variant="glow" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-xl font-semibold">AI Prediction Results</h2>
                    <Badge variant="energy">
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs">Daily Generation</span>
                      </div>
                      <p className="font-display text-2xl font-bold text-primary">
                        {prediction.dailyGeneration.toFixed(1)} kWh
                      </p>
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Monthly Generation</span>
                      </div>
                      <p className="font-display text-2xl font-bold text-accent">
                        {prediction.monthlyGeneration.toFixed(0)} kWh
                      </p>
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-xs">Monthly Savings</span>
                      </div>
                      <p className="font-display text-2xl font-bold text-green-500">
                        ₹{prediction.monthlySavings.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Leaf className="w-4 h-4" />
                        <span className="text-xs">CO₂ Offset/Month</span>
                      </div>
                      <p className="font-display text-2xl font-bold text-lime-500">
                        {prediction.carbonOffset.toFixed(0)} kg
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Yearly Projections */}
                <Card variant="glass" className="p-6">
                  <h3 className="font-display font-semibold mb-4">Yearly Projections</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Generation</p>
                      <p className="font-display text-xl font-bold">{prediction.yearlyEstimate.toLocaleString('en-IN')} kWh</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Savings</p>
                      <p className="font-display text-xl font-bold text-green-500">₹{prediction.yearlySavings.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Peak Hours</p>
                      <p className="font-display text-lg font-medium">{prediction.peakHours}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Actual Efficiency</p>
                      <p className="font-display text-lg font-medium">{prediction.efficiency}%</p>
                    </div>
                  </div>
                </Card>

                {/* Recommendations */}
                <Card variant="glass" className="p-6">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            ) : (
              <Card variant="glass" className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Ready to Predict</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Configure your solar panel setup on the left and click "Predict" to get 
                  AI-powered energy generation estimates.
                </p>
                <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tip:</strong> Search for your city to get live temperature and weather data, 
                    or enter temperature manually for custom calculations.
                  </p>
                </div>
              </Card>
            )}

            {/* Info Card */}
            <Card variant="glass" className="p-6">
              <h3 className="font-display font-semibold mb-3">How It Works</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">1.</span>
                  Search your city for live weather or enter temperature manually
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">2.</span>
                  Configure your solar panel specifications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">3.</span>
                  Our AI analyzes weather patterns & solar irradiance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">4.</span>
                  Get accurate predictions with savings in ₹ (INR)
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnergyPredictor;
