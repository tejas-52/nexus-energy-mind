import { Sun, Zap, Leaf, TrendingUp } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const stats = [
  {
    icon: Sun,
    value: 2547839,
    suffix: ' kWh',
    label: 'Energy Generated',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Zap,
    value: 1893456,
    suffix: ' kWh',
    label: 'Energy Traded',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Leaf,
    value: 892347,
    suffix: ' kg',
    label: 'CO₂ Offset',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: TrendingUp,
    value: 45892,
    prefix: '$',
    label: 'Total Savings',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
];

export const LiveStats = () => {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Live Platform Stats</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Real-Time <span className="text-gradient-primary">Global Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our community make a difference in real-time. Every kilowatt-hour counts towards a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-glow transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="font-display text-2xl lg:text-3xl font-bold mb-1">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2500}
                    decimals={1}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
