import { Button } from '@/components/ui/button';
import { Download, ArrowDown, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import heroPortrait from '@/assets/hero-galib.jpg';
import { useEffect } from 'react';
import TypeIt from 'typeit';

const HeroSection = () => {
  const socialLinks = [
    { icon: Mail, href: 'mailto:syaagalib@gmail.com', label: 'Email' },
    { icon: MessageCircle, href: 'https://wa.me/8801234567890', label: 'WhatsApp' },
    { icon: Send, href: 'https://t.me/SYAAGalib', label: 'Telegram' },
    { icon: Linkedin, href: 'https://linkedin.com/in/SYAAGalib', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/syaagalib', label: 'GitHub' },
  ];

  useEffect(() => {
    const primaryBullet = '<em><strong style="background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;"> • </strong></em>';
    const primaryHyphen = '<em><strong style="background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">‑</strong></em>';
    // '<em><strong style="background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">‑</strong></em>';
    // '<em><strong class="text-pink-600"> • </strong></em>';
    
    let heroComplete = false;
    let subInitialComplete = false;

    // Step 1: Hero name typing with corrections
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
        .type(`AI Innovator${primaryBullet}`, { delay: 250 })
        .type(`Software Engineer${primaryBullet}`, { delay: 250 })
        .go();
    }

    function performCursorJumpEdit() {
      hideCursor("#sub-typing");
      
      setTimeout(() => {
        showCursor("#hero-typing");
        
        const heroEl = document.querySelector("#hero-typing");
        let currentContent = heroEl?.innerHTML.replace(/<span[^>]*class="ti-cursor"[^>]*>.*?<\/span>/g, '') || '';
        
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
      
      let finalText = "Startup Founder";
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
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="hero-text-gradient">Sheikh Yeasin</span>
                <br />
                <span id="hero-typing" className="text-foreground"></span>
              </h1>
              <p id="sub-typing" className="text-xl md:text-2xl text-muted-foreground font-medium"></p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero text-lg px-8 py-6">
                View My Work
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="btn-ghost-glow text-lg px-8 py-6">
                <Download className="mr-2 w-5 h-5" />
                Download Resume
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
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

          {/* Right Column - Portrait */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="glow-border p-2 animate-pulse-glow">
                <img
                  src={heroPortrait}
                  alt="Sheikh Yeasin Ahsanullah Al‑Galib - AI Engineer and Startup Founder"
                  className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-lg"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
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