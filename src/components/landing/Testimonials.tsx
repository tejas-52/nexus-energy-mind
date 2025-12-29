import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh K.',
    location: 'Jaipur, Rajasthan',
    avatar: 'RK',
    rating: 5,
    quote: 'I was skeptical at first, but after 3 months my electricity bill went from ₹12,000 to just ₹3,500. The app is so easy to use — even my parents figured it out!',
    highlight: 'Saved ₹8,500/month',
  },
  {
    name: 'Priya S.',
    location: 'Bangalore, Karnataka',
    avatar: 'PS',
    rating: 5,
    quote: 'The marketplace feature is amazing. I\'m now selling my extra solar power to my neighbors and making ₹6,000 extra each month. It basically pays for itself.',
    highlight: 'Earning ₹6,000/month',
  },
  {
    name: 'Amit M.',
    location: 'Mumbai, Maharashtra',
    avatar: 'AM',
    rating: 5,
    quote: 'Finally, an energy app that doesn\'t require an engineering degree! Everything is explained in simple Hindi and English. I love seeing my environmental impact too.',
    highlight: 'Easy to use',
  },
];

export const Testimonials = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            What Our <span className="text-gradient-primary">Users Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real homeowners who transformed their energy bills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              variant="glass"
              className="p-6 relative animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Highlight badge */}
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {testimonial.highlight}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
