import React, { useState } from 'react';
import { mockAnimations, categories } from '../mock';
import { AnimationCard } from '../components/AnimationCard';
import { AnimationModal } from '../components/AnimationModal';
import { Button } from '../components/ui/button';
import { ChevronDown } from 'lucide-react';
import { SectionReveal, CardReveal } from '../components/SectionReveal';
import { LightningDivider } from '../components/LightningDivider';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAnimations =
    selectedCategory === 'All'
      ? mockAnimations
      : mockAnimations.filter((anim) => anim.category === selectedCategory);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openModal = (animation) => {
    setSelectedAnimation(animation);
    setIsModalOpen(true);
  };

  // Pre-compute spark positions for hero title
  const sparks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    tx: `${(Math.random() - 0.5) * 200}px`,
    ty: `${(Math.random() - 0.5) * 200}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`
  }));

  // Floating orbs
  const orbs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: 80 + Math.random() * 120,
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 80}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${10 + Math.random() * 8}s`
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        {/* Floating Golden Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {orbs.map((orb) => (
            <div
              key={orb.id}
              className="floating-orb"
              style={{
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                left: orb.left,
                top: orb.top,
                animationDelay: orb.delay,
                animationDuration: orb.duration
              }}
            />
          ))}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFE000]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFE000]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          {/* Hero title with shimmer + glitch + sparks */}
          <div className="relative inline-block mb-6">
            {/* Electric sparks around title */}
            {sparks.map((spark) => (
              <div
                key={spark.id}
                className="electric-spark"
                style={{
                  left: spark.left,
                  top: spark.top,
                  '--tx': spark.tx,
                  '--ty': spark.ty,
                  animationDelay: spark.delay
                }}
              />
            ))}
            <h1
              className="gold-shimmer-text text-6xl md:text-8xl font-bold tracking-tight relative"
              style={{ filter: 'drop-shadow(0 0 24px rgba(255, 224, 0, 0.4))' }}
            >
              GoldenFX
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-white mb-12 font-light">
            Roblox Animator & Motion Designer
          </p>
          <Button
            onClick={scrollToPortfolio}
            className="bg-black text-[#FFE000] border-2 border-[#FFE000] hover:bg-[#FFE000] hover:text-black font-bold text-lg px-8 py-6 transition-all duration-300"
          >
            View My Work
            <ChevronDown className="ml-2 animate-bounce" size={20} />
          </Button>
        </div>
      </section>

      {/* Lightning Divider */}
      <LightningDivider />

      {/* About Section */}
      <SectionReveal>
        <section id="about" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FFE000] mb-8 text-center">
              About Me
            </h2>
            <div className="bg-[#0a0a0a] border border-[#FFE000] rounded-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#FFE000] blur-md opacity-50 animate-pulse"></div>
                    <img
                      src="/pfp.png"
                      alt="GoldenFX Profile"
                      className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full object-cover border-4 border-[#FFE000] shadow-[0_0_20px_rgba(255,224,0,0.6)]"
                    />
                  </div>
                </div>
                {/* Bio Text */}
                <div className="flex-1">
                  <p className="text-white text-lg leading-relaxed">
                    Hey! I'm GoldenFX, a passionate Roblox animator specializing in creating dynamic,
                    high-quality animations that bring characters and stories to life. From smooth walk
                    cycles to intense combat sequences and cinematic cutscenes, I focus on delivering
                    polished motion work that enhances gameplay experiences. Whether it's crafting
                    expressive emotes or epic boss battles, I'm dedicated to pushing the boundaries
                    of what's possible in Roblox animation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Lightning Divider */}
      <LightningDivider />

      {/* Portfolio Section */}
      <SectionReveal>
        <section id="portfolio" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto relative">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FFE000]/30"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#FFE000]/30"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#FFE000]/30"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FFE000]/30"></div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#FFE000] mb-4 text-center">
              Portfolio
            </h2>
            <p className="text-white/70 text-center mb-12 text-lg">
              Explore my animation work across different categories
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? 'bg-[#FFE000] text-black border-[#FFE000]'
                      : 'bg-black text-[#FFE000] border-[#FFE000] hover:bg-[#FFE000] hover:text-black'
                  } border-2 font-bold transition-all duration-300`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Animation Grid */}
            {filteredAnimations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
                {filteredAnimations.map((animation, idx) => (
                  <CardReveal key={animation.id} delay={idx * 120}>
                    <AnimationCard
                      animation={animation}
                      onClick={() => openModal(animation)}
                    />
                  </CardReveal>
                ))}
              </div>
            ) : (
              <div className="py-20 px-8">
                <div className="max-w-2xl mx-auto border-2 border-dashed border-[#FFE000] rounded-lg p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-[#FFE000] text-8xl font-bold">ANIMATIONS</span>
                  </div>
                  <p className="text-[#FFE000] text-2xl font-bold relative z-10">
                    No animations yet — check back soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </SectionReveal>

      {/* Lightning Divider */}
      <LightningDivider />

      {/* Contact Section */}
      <SectionReveal>
        <section id="contact" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FFE000] mb-4 text-center">
              Find Me Online
            </h2>
            <p className="text-white/70 text-center mb-12 text-lg">
              Commissions, collabs, or just want to talk shop? Hit me up on any of these.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {/* X (Twitter) Card */}
              <a
                href="https://x.com/xxgoldenxx0863"
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift bg-[#0a0a0a] border-2 border-[#FFE000] rounded-lg p-8 hover:shadow-[0_0_16px_rgba(255,224,0,0.4)] transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#FFFFFF"
                      className="group-hover:scale-110 transition-transform"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#FFE000] font-bold text-lg">X (Twitter)</p>
                    <p className="text-white/60 text-sm">Follow me on X</p>
                  </div>
                </div>
                <p className="text-white font-mono">@xxgoldenxx0863</p>
              </a>

              {/* YouTube Card */}
              <a
                href="https://www.youtube.com/@G0ldenAnims_gg"
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift bg-[#0a0a0a] border-2 border-[#FFE000] rounded-lg p-8 hover:shadow-[0_0_16px_rgba(255,224,0,0.4)] transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF0000]/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      fill="#FF0000"
                      className="group-hover:scale-110 transition-transform"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#FFE000] font-bold text-lg">YouTube</p>
                    <p className="text-white/60 text-sm">Subscribe on YouTube</p>
                  </div>
                </div>
                <p className="text-white font-mono">@G0ldenAnims_gg</p>
              </a>

              {/* Discord Card */}
              <div className="card-lift bg-[#0a0a0a] border-2 border-[#FFE000] rounded-lg p-8 hover:shadow-[0_0_16px_rgba(255,224,0,0.4)] transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#5865F2]/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#5865F2"
                      className="group-hover:scale-110 transition-transform"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#FFE000] font-bold text-lg">Discord</p>
                    <p className="text-white/60 text-sm">Message me directly</p>
                  </div>
                </div>
                <p className="text-white font-mono">xxgoldenxx0863</p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Animation Modal */}
      <AnimationModal
        animation={selectedAnimation}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
