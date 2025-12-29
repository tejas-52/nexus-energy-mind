import { Card } from '@/components/ui/card';
import { DollarSign, TrendingDown, Leaf, Shield, Clock, Users } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Save Up to 70% on Bills',
    description: 'Our users save an average of $200/month on their electricity bills by optimizing when they use energy.',
    stat: '$2,400+',
    statLabel: 'Yearly savings',
  },
  {
    icon: TrendingDown,
    title: 'Reduce Energy Waste',
    description: 'Smart scheduling ensures your appliances run when electricity is cheapest, not when it\'s most expensive.',
    stat: '40%',
    statLabel: 'Less wasted energy',
  },
  {
    icon: Leaf,
    title: 'Help the Environment',
    description: 'Every kWh of solar you use means less fossil fuel burned. Track your positive environmental impact.',
    stat: '5 tons',
    statLabel: 'CO₂ saved yearly',
  },
  {
    icon: Shield,
    title: 'Energy Independence',
    description: 'Less reliance on the grid means protection from price hikes and blackouts. Your power, your control.',
    stat: '90%',
    statLabel: 'Grid independence',
  },
  {
    icon: Clock,
    title: 'Set It & Forget It',
    description: 'Our AI handles everything automatically. No daily monitoring needed — just check in when you want to.',
    stat: '5 min',
    statLabel: 'Weekly time needed',
  },
  {
    icon: Users,
    title: 'Join a Community',
    description: 'Connect with neighbors, share energy tips, and be part of the clean energy movement in your area.',
    stat: '10K+',
    statLabel: 'Active users',
  },
];

export const Benefits = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Real Results
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            Why <span className="text-gradient-primary">Families Love Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of homeowners who are saving money, earning income, and helping the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                variant="glass"
                className="group p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {benefit.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-display font-bold text-gradient-primary">
                        {benefit.stat}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {benefit.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
