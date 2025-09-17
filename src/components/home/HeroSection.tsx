import { Button } from '@/components/ui/button';
import { Download, ArrowDown, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import heroPortrait from '@/assets/hero-galib.jpg';

const HeroSection = () => {
  const socialLinks = [
    { icon: Mail, href: 'mailto:galib@example.com', label: 'Email' },
    { icon: MessageCircle, href: 'https://wa.me/8801234567890', label: 'WhatsApp' },
    { icon: Send, href: 'https://t.me/galibtech', label: 'Telegram' },
    { icon: Linkedin, href: 'https://linkedin.com/in/galibtech', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/galibtech', label: 'GitHub' },
  ];

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
                <span className="text-foreground">Ahsanullah Al‑Galib</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                AI Innovator • Software Engineer • Startup Founder
              </p>
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