import { Home, TrendingUp, Wallet } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Home,
    title: 'Connect Your Home',
    description: 'Simply link your solar panels, battery, or smart meter. No technical expertise needed — setup takes just 5 minutes.',
    color: 'from-primary to-cyan-400',
  },
  {
    step: 2,
    icon: TrendingUp,
    title: 'Watch Your Savings Grow',
    description: 'Our AI automatically finds the best times to use, store, or sell your energy. You save money without lifting a finger.',
    color: 'from-accent to-orange-400',
  },
  {
    step: 3,
    icon: Wallet,
    title: 'Earn Extra Income',
    description: 'Sell your excess energy to neighbors at great rates. Get paid directly to your account every month.',
    color: 'from-green-500 to-emerald-400',
  },
];

export const HowItWorks = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Simple & Easy
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start saving money and earning income from your energy in three simple steps.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-1 bg-gradient-to-r from-primary via-accent to-green-500 rounded-full opacity-30" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.step}
                  className="relative text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Step number */}
                  <div className="relative inline-flex mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center font-display font-bold text-primary">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
