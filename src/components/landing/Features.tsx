import { 
  LayoutDashboard, 
  Calculator, 
  Sun, 
  Brain, 
  ShoppingCart,
  Home,
  PiggyBank,
  Leaf
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: LayoutDashboard,
    title: 'See Everything at a Glance',
    description: 'One simple screen shows how much energy you\'re making, using, and saving — updated in real-time.',
    color: 'from-primary to-cyan-400',
  },
  {
    icon: Calculator,
    title: 'Know Before You Buy',
    description: 'Thinking about solar? See exactly how much you\'d save based on your location and roof before spending a dime.',
    color: 'from-accent to-orange-400',
  },
  {
    icon: Sun,
    title: 'Weather-Smart Planning',
    description: 'Get alerts before cloudy days so you can plan ahead. No surprises on your energy bill.',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    icon: Brain,
    title: 'Smart Recommendations',
    description: '"Run your dryer now to use free solar power" — helpful tips that save money without the guesswork.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: ShoppingCart,
    title: 'Sell to Your Neighbors',
    description: 'Extra solar power? Sell it locally at better rates than the utility company pays. Earn real money.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Home,
    title: 'Control Your Home',
    description: 'Schedule your AC, water heater, and appliances to run when electricity is cheapest. Set it and forget it.',
    color: 'from-rose-500 to-red-400',
  },
  {
    icon: PiggyBank,
    title: 'Track Your Savings',
    description: 'See exactly how much money you\'ve saved this week, month, and year. Watch your investment pay off.',
    color: 'from-cyan-500 to-teal-400',
  },
  {
    icon: Leaf,
    title: 'Feel Good About It',
    description: 'Track the trees you\'ve saved and CO₂ you\'ve avoided. Share your environmental impact with friends.',
    color: 'from-lime-500 to-green-500',
  },
];

export const Features = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Everything You Need
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            Simple Tools, <span className="text-gradient-primary">Big Savings</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No engineering degree required. Our app makes saving money on energy as easy as checking the weather.
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
