import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { LiveStats } from '@/components/landing/LiveStats';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Benefits } from '@/components/landing/Benefits';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <LiveStats />
        <HowItWorks />
        <Benefits />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
