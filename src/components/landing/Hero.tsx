import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="energy" className="mb-6 animate-fade-in">
            <Sparkles className="w-3 h-3 mr-1" />
            Used by 10,000+ Homeowners
          </Badge>

          {/* Headline */}
          <h1 
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up text-[hsl(210_20%_95%)]"
            style={{ animationDelay: '100ms' }}
          >
            Cut Your Energy Bills
            <br />
            <span className="text-gradient-primary">By Up to 70%</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg lg:text-xl text-[hsl(220_15%_65%)] max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            Stop overpaying for electricity. GreenMind AI finds the best times to use energy, 
            helps you sell extra power to neighbors, and saves you hundreds every month.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard">
                Start Saving Now — It's Free
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" className="text-[hsl(210_20%_90%)]" asChild>
              <Link to="/calculator">
                <Play className="w-5 h-5 mr-1" />
                Calculate My Savings
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <p className="text-sm text-[hsl(220_15%_50%)] mb-4">Works with all major solar & smart home brands</p>
            <div className="flex items-center justify-center flex-wrap gap-6 lg:gap-10 opacity-60">
              {['Tesla Powerwall', 'SunPower', 'Enphase', 'Nest', 'Ecobee'].map((company) => (
                <span key={company} className="font-display font-medium text-[hsl(220_15%_60%)] text-xs lg:text-sm">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div 
          className="mt-16 lg:mt-24 max-w-6xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '500ms' }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 rounded-3xl blur-2xl opacity-50" />
            
            {/* Preview container */}
            <div className="relative bg-[hsl(220_25%_9%)] rounded-2xl lg:rounded-3xl border border-[hsl(220_20%_18%)] shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(220_25%_7%)] border-b border-[hsl(220_20%_15%)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-[hsl(220_20%_12%)] rounded-lg text-xs text-[hsl(220_15%_50%)]">
                    app.greenmind.ai/dashboard
                  </div>
                </div>
              </div>
              
              {/* Dashboard mockup */}
              <div className="p-4 lg:p-6 min-h-[300px] lg:min-h-[400px]">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4">
                  {[
                    { label: 'Solar Generation', value: '24.5 kWh', color: 'from-accent to-orange-400' },
                    { label: 'Grid Usage', value: '3.2 kWh', color: 'from-blue-500 to-indigo-500' },
                    { label: 'Battery', value: '87%', color: 'from-purple-500 to-pink-500' },
                    { label: 'Savings Today', value: '₹248', color: 'from-primary to-cyan-400' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[hsl(220_25%_11%)] rounded-xl p-4 border border-[hsl(220_20%_15%)]">
                      <p className="text-xs text-[hsl(220_15%_50%)] mb-1">{stat.label}</p>
                      <p className={`font-display font-bold text-lg lg:text-xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Chart placeholder */}
                <div className="bg-[hsl(220_25%_11%)] rounded-xl p-4 border border-[hsl(220_20%_15%)] h-48 lg:h-64 flex items-end">
                  <div className="flex items-end gap-2 w-full h-full">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-primary/50"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[hsl(220_15%_30%)] flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
