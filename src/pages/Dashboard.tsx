import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sun, 
  Zap, 
  Battery, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Leaf,
  DollarSign,
  Activity,
  ChevronRight,
  Lightbulb,
  Brain
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Mock data for charts
const hourlyData = [
  { time: '6AM', generation: 0.2, consumption: 1.5, grid: 1.3 },
  { time: '7AM', generation: 0.8, consumption: 2.1, grid: 1.3 },
  { time: '8AM', generation: 2.5, consumption: 1.8, grid: 0 },
  { time: '9AM', generation: 4.2, consumption: 1.2, grid: 0 },
  { time: '10AM', generation: 5.8, consumption: 1.5, grid: 0 },
  { time: '11AM', generation: 6.5, consumption: 2.0, grid: 0 },
  { time: '12PM', generation: 7.2, consumption: 2.8, grid: 0 },
  { time: '1PM', generation: 7.0, consumption: 2.2, grid: 0 },
  { time: '2PM', generation: 6.4, consumption: 1.8, grid: 0 },
  { time: '3PM', generation: 5.5, consumption: 2.5, grid: 0 },
  { time: '4PM', generation: 4.0, consumption: 3.2, grid: 0 },
  { time: '5PM', generation: 2.2, consumption: 4.5, grid: 2.3 },
  { time: '6PM', generation: 0.8, consumption: 5.2, grid: 4.4 },
];

const weeklyData = [
  { day: 'Mon', generation: 28, savings: 12 },
  { day: 'Tue', generation: 32, savings: 14 },
  { day: 'Wed', generation: 25, savings: 10 },
  { day: 'Thu', generation: 35, savings: 16 },
  { day: 'Fri', generation: 30, savings: 13 },
  { day: 'Sat', generation: 38, savings: 18 },
  { day: 'Sun', generation: 42, savings: 20 },
];

const statCards = [
  {
    title: 'Solar Generation',
    value: '24.5',
    unit: 'kWh',
    change: '+12%',
    trend: 'up',
    icon: Sun,
    color: 'from-accent to-orange-400',
    description: 'Today\'s total generation',
  },
  {
    title: 'Grid Usage',
    value: '3.2',
    unit: 'kWh',
    change: '-28%',
    trend: 'down',
    icon: Zap,
    color: 'from-blue-500 to-indigo-500',
    description: 'Down from yesterday',
  },
  {
    title: 'Battery Level',
    value: '87',
    unit: '%',
    change: 'Charging',
    trend: 'up',
    icon: Battery,
    color: 'from-purple-500 to-pink-500',
    description: '2.5 hrs to full',
  },
  {
    title: 'Today\'s Savings',
    value: '$12.40',
    unit: '',
    change: '+$2.10',
    trend: 'up',
    icon: DollarSign,
    color: 'from-primary to-cyan-400',
    description: 'vs grid-only usage',
  },
];

const aiInsights = [
  {
    icon: Lightbulb,
    title: 'Peak Production Alert',
    message: 'Solar output will peak at 1PM today. Consider running high-power appliances then.',
    type: 'tip',
  },
  {
    icon: TrendingUp,
    title: 'Trading Opportunity',
    message: 'Grid prices are 23% higher than usual. Selling your surplus could earn $4.50 more today.',
    type: 'opportunity',
  },
  {
    icon: Brain,
    title: 'Automation Suggestion',
    message: 'Based on your patterns, pre-cooling your home at 2PM could save $18/month.',
    type: 'automation',
  },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
                  Energy <span className="text-gradient-primary">Dashboard</span>
                </h1>
                <p className="text-muted-foreground">
                  Real-time overview of your energy ecosystem
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="live" className="gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Live
                </Badge>
                <div className="flex bg-secondary rounded-lg p-1">
                  {(['today', 'week', 'month'] as const).map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                      className="capitalize"
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} variant="stats" className="group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge 
                        variant={stat.trend === 'up' ? 'success' : 'warning'}
                        className="text-xs"
                      >
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 mr-0.5" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-0.5" />
                        )}
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="font-display text-3xl font-bold mb-1">
                      {stat.value}
                      <span className="text-lg text-muted-foreground font-normal ml-1">
                        {stat.unit}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Charts */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Energy Flow Chart */}
            <Card variant="glass" className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Energy Flow
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-muted-foreground">Generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive/70" />
                      <span className="text-muted-foreground">Consumption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Grid</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyData}>
                      <defs>
                        <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(45 95% 55%)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(45 95% 55%)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(350 75% 55%)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(350 75% 55%)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(220 70% 55%)" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(220 70% 55%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="time" 
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
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorGeneration)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="consumption" 
                        stroke="hsl(350 75% 55%)" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorConsumption)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="grid" 
                        stroke="hsl(220 70% 55%)" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorGrid)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div 
                      key={index}
                      className="group p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {insight.message}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
                <Button variant="ghost" className="w-full mt-2" size="sm">
                  View All Insights
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Overview & Carbon */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Performance */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="day" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar 
                        dataKey="generation" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        name="Generation (kWh)"
                      />
                      <Bar 
                        dataKey="savings" 
                        fill="hsl(var(--accent))" 
                        radius={[4, 4, 0, 0]}
                        name="Savings ($)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Carbon Impact */}
            <Card variant="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="font-display text-4xl font-bold text-green-500 mb-2">
                      892
                    </div>
                    <p className="text-sm text-muted-foreground">kg CO₂ Offset</p>
                    <p className="text-xs text-green-500 mt-1">This month</p>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="font-display text-4xl font-bold text-primary mb-2">
                      47
                    </div>
                    <p className="text-sm text-muted-foreground">Trees Equivalent</p>
                    <p className="text-xs text-primary mt-1">Planted this year</p>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Carbon Credit Progress</span>
                    <span className="text-sm text-primary">78%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full transition-all duration-1000"
                      style={{ width: '78%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    22 more kWh to earn your next carbon credit
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
