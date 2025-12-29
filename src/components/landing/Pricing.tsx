import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with solar tracking',
    features: [
      'Basic energy dashboard',
      'Solar generation tracking',
      '7-day forecast',
      'Carbon offset tracking',
      'Community support',
    ],
    cta: 'Get Started',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For serious energy optimizers and traders',
    features: [
      'Everything in Free',
      'AI-powered recommendations',
      'Smart automation engine',
      'P2P marketplace access',
      'Digital twin simulation',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    variant: 'hero' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with complex energy needs',
    features: [
      'Everything in Pro',
      'Unlimited users & locations',
      'Custom API integrations',
      'White-label options',
      'ESG compliance reports',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    variant: 'outline' as const,
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="energy" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Simple Pricing
          </Badge>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-primary">Energy Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core energy tracking features.
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
