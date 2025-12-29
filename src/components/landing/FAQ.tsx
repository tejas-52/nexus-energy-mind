import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Do I need solar panels to use this?',
    answer: 'No! While solar panel owners get the most benefits, anyone can use our platform to track their energy usage, find the cheapest times to run appliances, and reduce their bills. If you have a smart meter, you can start saving today.',
  },
  {
    question: 'How much does it cost?',
    answer: 'We have a free plan that includes basic monitoring and savings tips. Our Pro plan is $9.99/month and includes AI optimization, the P2P marketplace, and priority support. Most users save at least 10x their subscription cost each month.',
  },
  {
    question: 'Is it difficult to set up?',
    answer: 'Not at all! Most users complete setup in under 5 minutes. Just connect your smart meter or solar inverter (we support all major brands), and our system handles the rest. No technical knowledge required.',
  },
  {
    question: 'How does selling energy to neighbors work?',
    answer: 'When you have excess solar energy, you can list it on our marketplace at a price you choose. Nearby users can buy your clean energy at rates better than the grid. We handle all the billing and payments — you just collect your earnings each month.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption for all data, and we never sell your personal information. You have complete control over what data you share, and you can delete your account at any time.',
  },
  {
    question: 'What if I need help?',
    answer: 'Our support team is available 7 days a week via chat and email. Pro users also get access to phone support and personalized energy consultations. Plus, our in-app guides explain everything in simple terms.',
  },
];

export const FAQ = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know to get started with confidence.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
