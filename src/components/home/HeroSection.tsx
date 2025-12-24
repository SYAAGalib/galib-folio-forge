import { Button } from '@/components/ui/button';
import { Download, ArrowDown, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import heroPortrait from '@/assets/galib-hero-best.jpg';
import { useEffect, useState } from 'react';
import TypeIt from 'typeit';
import useParallax from '@/hooks/useParallax';
import LazyImage from '@/components/ui/LazyImage';
import { useHeroContent } from '@/hooks/useContent';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  linkedin: Linkedin,
  github: Github,
};

const HeroSection = () => {
  const { parallaxY, parallaxOpacity } = useParallax();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { hero, loading } = useHeroContent();
  
  const socialLinks = hero?.socialLinks ?? [
    { platform: 'email', url: 'mailto:syaagalib@gmail.com', label: 'Email' },
    { platform: 'whatsapp', url: 'https://wa.me/8801234567890', label: 'WhatsApp' },
    { platform: 'telegram', url: 'https://t.me/SYAAGalib', label: 'Telegram' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/SYAAGalib', label: 'LinkedIn' },
    { platform: 'github', url: 'https://github.com/syaagalib', label: 'GitHub' },
  ];

  const firstName = hero?.firstName ?? 'Sheikh Yeasin';
  const roles = hero?.roles ?? ['AI Innovator', 'Software Engineer', 'Startup Founder'];
  const ctaPrimary = hero?.ctaButtons?.primary ?? { text: 'View My Work', link: '#projects' };
  const ctaSecondary = hero?.ctaButtons?.secondary ?? { text: 'Download Resume', link: '/resume.pdf' };

  // Track if animation has already run to prevent re-runs
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Don't run animation if still loading or already started
    if (loading || animationStarted) return;
    
    setAnimationStarted(true);
    
    const primaryBullet = '<em><strong style="background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;"> • </strong></em>';
    const primaryHyphen = '<em><strong style="background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">‑</strong></em>';
    
    let heroComplete = false;
    let subInitialComplete = false;

    const heroInstance = new TypeIt("#hero-typing", {
      speed: 80,
      startDelay: 500,
      cursorChar: "|",
      lifeLike: true,
      waitUntilVisible: true,
      afterComplete: function(instance) {
        heroComplete = true;
        setTimeout(() => {
          hideCursor("#hero-typing");
          startSubtitleSequence();
        }, 300);
      }
    });

    heroInstance
      .type("Ahsanullah A", { delay: 300 })
      .move(null, { to: "START", delay: 200 })
      .move(7, { delay: 150 })
      .delete(1, { delay: 150 })
      .type("l", { delay: 150 })
      .move(null, { to: "END", delay: 200 })
      .type("l galib", { delay: 300 })
      .move(-4, { delay: 200 })
      .delete(1, { delay: 150 })
      .type("G", { delay: 150 })
      .move(null, { to: "END", delay: 200 })
      .go();

    function startSubtitleSequence() {
      const subInstance = new TypeIt("#sub-typing", {
        speed: 70,
        startDelay: 200,
        cursorChar: "|",
        lifeLike: true,
        afterComplete: function(instance) {
          subInitialComplete = true;
          setTimeout(() => {
            performCursorJumpEdit();
          }, 300);
        }
      });

      subInstance
        .type(`${roles[0]}${primaryBullet}`, { delay: 250 })
        .type(`${roles[1]}${primaryBullet}`, { delay: 250 })
        .go();
    }

    function performCursorJumpEdit() {
      hideCursor("#sub-typing");
      
      setTimeout(() => {
        showCursor("#hero-typing");
        
        const heroEl = document.querySelector("#hero-typing");
        const currentContent = heroEl?.innerHTML.replace(/<span[^>]*class="ti-cursor"[^>]*>.*?<\/span>/g, '') || '';
        
        simulateEdit(currentContent);
      }, 400);
    }

    function simulateEdit(originalContent: string) {
      const heroEl = document.querySelector("#hero-typing");
      
      setTimeout(() => {
        const editedContent = originalContent.replace(/(\s)(Galib)/, primaryHyphen + '$2');
        if (heroEl) {
          heroEl.innerHTML = editedContent + '<span class="ti-cursor" style="font-weight: 100; color: inherit;">|</span>';
        }
        
        setTimeout(() => {
          hideCursor("#hero-typing");
          showCursor("#sub-typing");
          finishSubtitleTyping();
        }, 800);
      }, 600);
    }

    function finishSubtitleTyping() {
      const subEl = document.querySelector("#sub-typing");
      const currentContent = subEl?.innerHTML.replace(/<span[^>]*class="ti-cursor"[^>]*>.*?<\/span>/g, '') || '';
      
      const finalText = roles[2] || "Startup Founder";
      let currentIndex = 0;
      
      function typeNextChar() {
        if (currentIndex < finalText.length && subEl) {
          const char = finalText.charAt(currentIndex);
          subEl.innerHTML = currentContent + finalText.substring(0, currentIndex + 1) + '<span class="ti-cursor" style="font-weight: 100; color: inherit;">|</span>';
          currentIndex++;
          setTimeout(typeNextChar, 70 + Math.random() * 50);
        }
      }
      
      setTimeout(typeNextChar, 200);
    }

    function hideCursor(selector: string) {
      const cursor = document.querySelector(`${selector} .ti-cursor`) as HTMLElement;
      if (cursor) {
        cursor.style.visibility = "hidden";
      }
    }

    function showCursor(selector: string) {
      const cursor = document.querySelector(`${selector} .ti-cursor`) as HTMLElement;
      if (cursor) {
        cursor.style.visibility = "visible";
      }
    }
  }, [loading, animationStarted, roles]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Animation with Parallax */}
      <div 
        className="absolute inset-0 opacity-30 parallax-element"
        style={{ 
          transform: `translateY(${parallaxY(0.3)}px)`,
          opacity: parallaxOpacity(0, 600)
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full filter blur-[100px] animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="hero-text-gradient">{firstName}</span>
                <br />
                <span id="hero-typing" className="text-foreground"></span>
              </h1>
              <p id="sub-typing" className="text-xl md:text-2xl text-muted-foreground font-medium"></p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero text-lg px-8 py-6" asChild>
                <a href={ctaPrimary.link}>
                  {ctaPrimary.text}
                  <ArrowDown className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="btn-ghost-glow text-lg px-8 py-6" asChild>
                <a href={ctaSecondary.link}>
                  <Download className="mr-2 w-5 h-5" />
                  {ctaSecondary.text}
                </a>
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.platform] || Mail;
                return (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-background/10 backdrop-blur-sm border border-border/30 rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-glow"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column - Portrait with Parallax */}
          <div 
            className="flex justify-center lg:justify-end animate-fade-in parallax-element" 
            style={{ 
              animationDelay: '0.3s',
              transform: `translateY(${parallaxY(-0.15)}px)`
            }}
          >
            <div className="relative">
              {/* Rotating border effect */}
              <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-primary via-secondary to-primary opacity-60 blur-sm animate-[spin_8s_linear_infinite]"></div>
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/50 via-transparent to-secondary/50 animate-[spin_12s_linear_infinite_reverse]"></div>
              
              <div className="relative glow-border p-2 animate-pulse-glow bg-background">
                <LazyImage
                  src={heroPortrait}
                  alt={`${firstName} - AI Engineer and Startup Founder`}
                  className="w-80 h-80 md:w-96 md:h-96 rounded-lg hero-portrait-bg"
                  skeletonClassName="rounded-lg"
                />
              </div>
              {/* Corner accent lines */}
              <div 
                className="absolute -top-6 -right-6 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg parallax-element"
                style={{ transform: `translateY(${parallaxY(-0.3)}px)` }}
              ></div>
              <div 
                className="absolute -bottom-6 -left-6 w-12 h-12 border-b-2 border-l-2 border-secondary/40 rounded-bl-lg parallax-element"
                style={{ transform: `translateY(${parallaxY(-0.2)}px)` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
