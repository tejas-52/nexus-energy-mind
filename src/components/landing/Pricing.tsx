import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Great for trying out the basics',
    features: [
      'See your energy usage in real-time',
      'Basic savings tips',
      '7-day weather forecast',
      'Track your environmental impact',
      'Email support',
    ],
    cta: 'Start Free',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'Best value for most homes',
    features: [
      'Everything in Starter',
      'AI-powered money-saving tips',
      'Automatic scheduling for appliances',
      'Sell energy to neighbors',
      'Detailed savings reports',
      'Priority chat support',
    ],
    cta: 'Try Pro Free for 14 Days',
    variant: 'hero' as const,
    popular: true,
  },
  {
    name: 'Family',
    price: '$19.99',
    period: '/month',
    description: 'For multiple properties or larger homes',
    features: [
      'Everything in Pro',
      'Up to 5 properties',
      'Family member accounts',
      'Phone support',
      'Personalized energy consultation',
      'Advanced automation rules',
    ],
    cta: 'Start Family Plan',
    variant: 'outline' as const,
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Pricing
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            Plans That <span className="text-gradient-primary">Pay for Themselves</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most Pro users save $200+/month — that's 20x the subscription cost. Start free, upgrade when you're ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.popular ? 'glow' : 'glass'}
              className={`relative p-8 ${plan.popular ? 'border-primary/50 scale-105 shadow-glow' : ''}`}
            >
              {plan.popular && (
                <Badge variant="energy" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} size="lg" className="w-full" asChild>
                <Link to="/dashboard">{plan.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
