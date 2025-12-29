import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-8 shadow-glow">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-6 text-[hsl(210_20%_95%)]">
            Ready to Power Your
            <br />
            <span className="text-gradient-primary">Sustainable Future?</span>
          </h2>
          
          <p className="text-lg text-[hsl(220_15%_65%)] mb-10 max-w-xl mx-auto">
            Join thousands of energy-conscious users who are already saving money 
            and reducing their carbon footprint with EnergyOS.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard">
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" className="text-[hsl(210_20%_90%)]" asChild>
              <Link to="/calculator">
                Try Solar Calculator
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-[hsl(220_15%_50%)]">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
};
