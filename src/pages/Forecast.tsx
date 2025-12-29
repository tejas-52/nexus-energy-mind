import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSun,
  Wind,
  Droplets,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const forecastData = [
  { 
    day: 'Today', 
    date: 'Dec 29',
    icon: Sun,
    weather: 'Sunny',
    high: 72,
    low: 54,
    generation: 45.2,
    confidence: 95,
    risk: 'low',
  },
  { 
    day: 'Mon', 
    date: 'Dec 30',
    icon: CloudSun,
    weather: 'Partly Cloudy',
    high: 68,
    low: 52,
    generation: 38.5,
    confidence: 88,
    risk: 'low',
  },
  { 
    day: 'Tue', 
    date: 'Dec 31',
    icon: Sun,
    weather: 'Sunny',
    high: 74,
    low: 55,
    generation: 46.8,
    confidence: 92,
    risk: 'low',
  },
  { 
    day: 'Wed', 
    date: 'Jan 1',
    icon: CloudSun,
    weather: 'Partly Cloudy',
    high: 70,
    low: 53,
    generation: 35.2,
    confidence: 85,
    risk: 'medium',
  },
  { 
    day: 'Thu', 
    date: 'Jan 2',
    icon: Cloud,
    weather: 'Overcast',
    high: 65,
    low: 50,
    generation: 22.4,
    confidence: 78,
    risk: 'high',
  },
  { 
    day: 'Fri', 
    date: 'Jan 3',
    icon: CloudRain,
    weather: 'Light Rain',
    high: 62,
    low: 48,
    generation: 15.8,
    confidence: 72,
    risk: 'high',
  },
  { 
    day: 'Sat', 
    date: 'Jan 4',
    icon: CloudSun,
    weather: 'Clearing',
    high: 67,
    low: 51,
    generation: 32.5,
    confidence: 80,
    risk: 'medium',
  },
];

const hourlyForecast = [
  { hour: '6AM', generation: 0.5 },
  { hour: '7AM', generation: 1.8 },
  { hour: '8AM', generation: 3.5 },
  { hour: '9AM', generation: 5.2 },
  { hour: '10AM', generation: 6.8 },
  { hour: '11AM', generation: 7.5 },
  { hour: '12PM', generation: 8.2 },
  { hour: '1PM', generation: 8.0 },
  { hour: '2PM', generation: 7.2 },
  { hour: '3PM', generation: 5.8 },
  { hour: '4PM', generation: 3.5 },
  { hour: '5PM', generation: 1.5 },
  { hour: '6PM', generation: 0.2 },
];

const Forecast = () => {
  const totalWeeklyGeneration = forecastData.reduce((sum, day) => sum + day.generation, 0);
  const avgConfidence = Math.round(forecastData.reduce((sum, day) => sum + day.confidence, 0) / forecastData.length);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Badge variant="solar" className="mb-4">
                  <Sun className="w-3 h-3 mr-1" />
                  Weather-Aware Predictions
                </Badge>
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
                  7-Day <span className="text-gradient-solar">Forecast</span>
                </h1>
                <p className="text-muted-foreground">
                  AI-powered energy generation predictions with confidence intervals
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Card variant="stats" className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold">{totalWeeklyGeneration.toFixed(0)} kWh</p>
                      <p className="text-xs text-muted-foreground">Weekly Forecast</p>
                    </div>
                  </div>
                </Card>
                <Card variant="stats" className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold">{avgConfidence}%</p>
                      <p className="text-xs text-muted-foreground">Avg Confidence</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Today's Detailed Forecast */}
          <Card variant="glow" className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-accent" />
                  Today's Hourly Forecast
                </CardTitle>
                <Badge variant="success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Optimal Conditions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyForecast}>
                    <defs>
                      <linearGradient id="generationGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(45 95% 55%)" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="hsl(45 95% 55%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="hour" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `${value} kW`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="generation" 
                      stroke="hsl(45 95% 55%)" 
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#generationGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">8 mph</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">45% humidity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-accent" />
                    <span className="text-sm">UV Index: 6</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Peak generation expected at 12PM
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Forecast Grid */}
          <h2 className="font-display text-xl font-semibold mb-4">Extended Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {forecastData.map((day, index) => {
              const Icon = day.icon;
              const isToday = index === 0;
              return (
                <Card 
                  key={day.day} 
                  variant={isToday ? 'glow' : 'glass'}
                  className={`text-center ${isToday ? 'ring-2 ring-primary/50' : ''}`}
                >
                  <CardContent className="p-4">
                    <p className="font-medium text-sm mb-1">{day.day}</p>
                    <p className="text-xs text-muted-foreground mb-3">{day.date}</p>
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${
                      day.weather.includes('Sunny') ? 'text-accent' : 
                      day.weather.includes('Rain') ? 'text-blue-500' : 
                      'text-muted-foreground'
                    }`} />
                    <p className="text-xs text-muted-foreground mb-2">{day.weather}</p>
                    <div className="flex justify-center gap-2 text-sm mb-3">
                      <span className="font-medium">{day.high}°</span>
                      <span className="text-muted-foreground">{day.low}°</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="font-display text-lg font-bold text-primary">
                        {day.generation} kWh
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          day.confidence >= 90 ? 'bg-green-500' :
                          day.confidence >= 80 ? 'bg-accent' :
                          'bg-orange-500'
                        }`} />
                        <span className="text-xs text-muted-foreground">
                          {day.confidence}% conf
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Alerts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Low Generation Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {forecastData.filter(day => day.risk === 'high').map((day) => (
                  <div key={day.day} className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{day.day}, {day.date}</span>
                      <Badge variant="warning">{day.weather}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expected generation: <strong>{day.generation} kWh</strong> (48% below average)
                    </p>
                    <p className="text-xs text-orange-500 mt-2">
                      💡 Consider storing extra energy today to offset low production
                    </p>
                  </div>
                ))}
                {forecastData.filter(day => day.risk === 'high').length === 0 && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm">No low generation days in the forecast!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Forecast vs Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Yesterday's Accuracy</span>
                      <span className="font-medium text-primary">94%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: '94%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">7-Day Average</span>
                      <span className="font-medium text-primary">91%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: '91%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">30-Day Average</span>
                      <span className="font-medium text-accent">89%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full"
                        style={{ width: '89%' }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  Our AI model continuously learns from your actual generation data to improve predictions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forecast;
