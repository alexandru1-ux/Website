import React from 'react';
import { Check, MessageSquare, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../components/ui/accordion';
import { SectionReveal } from '../components/SectionReveal';
import { LightningDivider } from '../components/LightningDivider';

const DISCORD_HANDLE = 'xxgoldenxx0863';

const standardFeatures = [
  'Walk Cycle',
  'Run Cycle',
  'Idle Animation',
  'Jump Animation',
  'Simple Emote',
  'Basic Combat Move'
];

const specialFeatures = [
  'Complex Combat Sequences',
  'Cinematic Cutscenes',
  'Boss Fight Animations',
  'Full Animation Packs',
  'Custom Rigs',
  'Any unique request'
];

const faqs = [
  {
    q: 'How long does it take?',
    a: 'Standard animations typically take 2-5 days. Complex projects may take longer depending on scope.'
  },
  {
    q: 'How do I pay?',
    a: 'I take Revolut or Paypal.'
  },
  {
    q: 'Can I request revisions?',
    a: "Yes! I offer revisions to make sure you're 100% happy with the result."
  },
  {
    q: 'What format do I get the animation in?',
    a: 'Animations are delivered as Roblox-compatible files ready to use in your game.'
  },
  {
    q: 'What if I want something not on the list?',
    a: "Just contact me! If it involves animation, I can most likely do it. We'll negotiate a fair price."
  }
];

const steps = [
  'Contact me on Discord with your animation idea',
  'We discuss the details, timeline and confirm the price',
  'I deliver your custom animation — ready to use in Roblox'
];

export const Commissions = () => {
  const scrollToCTA = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const copyDiscord = async () => {
    const text = DISCORD_HANDLE;
    let copied = false;

    // Method 1: Modern Clipboard API (requires secure context + permission)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (_) {
        copied = false;
      }
    }

    // Method 2: Fallback using a temporary textarea + execCommand
    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      // Avoid scrolling to bottom on iOS
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '2em';
      textarea.style.height = '2em';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      textarea.style.opacity = '0';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      try {
        copied = document.execCommand('copy');
      } catch (_) {
        copied = false;
      }
      document.body.removeChild(textarea);
    }

    toast('Copied!', {
      description: text,
      duration: 2000,
      style: {
        background: '#FFFFFF',
        color: '#000000',
        border: '1px solid #FFE000',
        boxShadow: '0 0 16px rgba(255, 224, 0, 0.5)'
      }
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <SectionReveal>
        <section className="px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1
              className="gold-shimmer-text text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              style={{ filter: 'drop-shadow(0 0 24px rgba(255, 224, 0, 0.4))' }}
            >
              Custom Animations
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-4 font-light">
              Need a custom animation? I got you.
            </p>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              All animations are handcrafted with attention to detail and delivered to your exact
              specifications.
            </p>
          </div>
        </section>
      </SectionReveal>

      <LightningDivider />

      {/* Pricing Section */}
      <SectionReveal>
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FFE000] mb-12 text-center">
              Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Standard Card */}
              <Card
                data-testid="standard-pricing-card"
                className="card-lift bg-[#0a0a0a] border-2 border-[#FFE000] rounded-lg p-8 transition-all duration-300 flex flex-col"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#FFE000] mb-3">Standard Animation</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Perfect for straightforward animation needs
                  </p>
                  <p className="text-5xl font-bold text-[#22c55e]">$60</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {standardFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white">
                      <Check className="text-[#FFE000] flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  data-testid="standard-order-btn"
                  onClick={scrollToCTA}
                  className="w-full bg-black text-[#FFE000] border-2 border-[#FFE000] hover:bg-[#FFE000] hover:text-black font-bold py-6 transition-all duration-300"
                >
                  <MessageSquare className="mr-2" size={18} />
                  Order Now
                </Button>
              </Card>

              {/* Special Request Card - with glow */}
              <Card
                data-testid="special-pricing-card"
                className="card-lift bg-[#0a0a0a] border-2 border-[#FFE000] rounded-lg p-8 transition-all duration-300 flex flex-col relative"
                style={{ boxShadow: '0 0 24px rgba(255, 224, 0, 0.5)' }}
              >
                <div className="absolute -top-3 right-6 bg-[#FFE000] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} />
                  CUSTOM
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#FFE000] mb-3">Special Request</h3>
                  <p className="text-white/70 text-sm mb-4">
                    For complex, unique, or large-scale animation projects
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-[#FFE000]">Let's Negotiate</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {specialFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white">
                      <Check className="text-[#FFE000] flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  data-testid="special-contact-btn"
                  onClick={scrollToCTA}
                  className="w-full bg-[#FFE000] text-black border-2 border-[#FFE000] hover:bg-black hover:text-[#FFE000] font-bold py-6 transition-all duration-300"
                >
                  <MessageSquare className="mr-2" size={18} />
                  Contact Me
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <LightningDivider />

      {/* How It Works */}
      <SectionReveal>
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FFE000] mb-12 text-center">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  data-testid={`step-${idx + 1}`}
                  className="bg-[#0a0a0a] border border-[#FFE000] rounded-lg p-6 text-center relative overflow-hidden group hover:shadow-[0_0_16px_rgba(255,224,0,0.4)] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[#FFE000] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-[0_0_16px_rgba(255,224,0,0.6)]">
                    {idx + 1}
                  </div>
                  <p className="text-white text-base leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <LightningDivider />

      {/* FAQ Section */}
      <SectionReveal>
        <section className="px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FFE000] mb-12 text-center">
              FAQ
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  data-testid={`faq-item-${idx}`}
                  className="bg-[#0a0a0a] border border-[#FFE000] rounded-lg px-6 [&[data-state=open]]:shadow-[0_0_12px_rgba(255,224,0,0.3)] transition-all duration-300"
                >
                  <AccordionTrigger className="text-[#FFE000] font-bold text-left text-lg hover:no-underline hover:text-[#FFE000]/80 py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white text-base leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA */}
      <SectionReveal>
        <section id="cta-section" className="px-4 py-16">
          <div className="max-w-3xl mx-auto text-center bg-[#0a0a0a] border-2 border-[#FFE000] rounded-lg p-12 shadow-[0_0_24px_rgba(255,224,0,0.3)]">
            <h3 className="text-3xl md:text-4xl font-bold text-[#FFE000] mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Send me a message on Discord and let's bring your animation to life.
            </p>
            <Button
              data-testid="cta-discord-btn"
              onClick={copyDiscord}
              className="bg-black text-[#FFE000] border-2 border-[#FFE000] hover:bg-[#FFE000] hover:text-black font-bold text-lg px-8 py-6 transition-all duration-300"
            >
              <MessageSquare className="mr-2" size={20} />
              Copy Discord: {DISCORD_HANDLE}
            </Button>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
};
