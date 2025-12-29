import { 
  LayoutDashboard, 
  Calculator, 
  Sun, 
  Brain, 
  Cpu, 
  ShoppingCart,
  Home,
  PiggyBank,
  Leaf,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Energy Command Center',
    description: 'Real-time visualization of generation, consumption, storage, and grid usage with AI-powered insights.',
    color: 'from-primary to-cyan-400',
  },
  {
    icon: Calculator,
    title: 'Solar Calculator',
    description: 'Advanced calculations based on location, panel specs, weather data, and optimization suggestions.',
    color: 'from-accent to-orange-400',
  },
  {
    icon: Sun,
    title: '7-Day Forecast',
    description: 'Weather-aware energy predictions with confidence intervals and risk alerts for low generation days.',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    icon: Brain,
    title: 'AI Co-Pilot',
    description: 'Explainable AI that suggests when to sell, store, or use energy with reasoned recommendations.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cpu,
    title: 'Digital Twin',
    description: 'Virtual replica of your energy setup for simulations, forecasting, and automation decisions.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: ShoppingCart,
    title: 'P2P Marketplace',
    description: 'Buy and sell surplus energy locally with dynamic pricing and smart matching algorithms.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Home,
    title: 'Smart Home Control',
    description: 'Energy-aware device control, scheduling, and load balancing for optimal efficiency.',
    color: 'from-rose-500 to-red-400',
  },
  {
    icon: PiggyBank,
    title: 'ROI Analytics',
    description: 'Track monthly savings, payback period, and long-term profit projections.',
    color: 'from-cyan-500 to-teal-400',
  },
  {
    icon: Leaf,
    title: 'Carbon Credits',
    description: 'CO₂ offset tracking, environmental impact scores, and ESG-ready sustainability reports.',
    color: 'from-lime-500 to-green-500',
  },
  {
    icon: Zap,
    title: 'Automation Engine',
    description: 'Visual IF-THEN rules that run automatically based on energy conditions and forecasts.',
    color: 'from-primary to-teal-400',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Daily, monthly, and yearly trends with interactive charts and exportable reports.',
    color: 'from-violet-500 to-purple-400',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Role-based access, secure transactions, and scalable cloud-ready architecture.',
    color: 'from-slate-500 to-gray-600',
  },
];

export const Features = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">
            Complete <span className="text-gradient-primary">Energy Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to generate, optimize, trade, and track your energy in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                variant="glass"
                className="group p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
