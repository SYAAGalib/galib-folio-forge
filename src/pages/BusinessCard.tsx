import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, Phone, MapPin, Globe, Github, Linkedin, 
  MessageCircle, Send, Download, ExternalLink, Briefcase, GraduationCap, Award, Share2, Copy, Check
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import heroPortrait from '@/assets/galib-hero-best.jpg';

const BusinessCard = () => {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const contactInfo = {
    name: 'Sheikh Yeasin Ahsanullah Al‑Galib',
    title: 'AI Innovator • Software Engineer • Startup Founder',
    email: 'syaagalib@gmail.com',
    phone: '+880 1946 303 020',
    location: 'Dhaka, Bangladesh',
    website: 'https://galib.dev',
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:syaagalib@gmail.com', label: 'Email', color: 'bg-red-500/10 text-red-500 hover:bg-red-500' },
    { icon: MessageCircle, href: 'https://wa.me/8801946303020', label: 'WhatsApp', color: 'bg-green-500/10 text-green-500 hover:bg-green-500' },
    { icon: Send, href: 'https://t.me/SYAAGalib', label: 'Telegram', color: 'bg-blue-400/10 text-blue-400 hover:bg-blue-400' },
    { icon: Linkedin, href: 'https://linkedin.com/in/SYAAGalib', label: 'LinkedIn', color: 'bg-blue-600/10 text-blue-600 hover:bg-blue-600' },
    { icon: Github, href: 'https://github.com/syaagalib', label: 'GitHub', color: 'bg-gray-500/10 text-gray-500 hover:bg-gray-500' },
  ];

  const expertise = [
    'Artificial Intelligence',
    'Machine Learning',
    'Full-Stack Development',
    'Startup Strategy',
    'Research & Innovation',
  ];

  const highlights = [
    { icon: Briefcase, label: '15+ Projects', desc: 'Delivered' },
    { icon: GraduationCap, label: '5+ Papers', desc: 'Published' },
    { icon: Award, label: '3+ Awards', desc: 'Won' },
  ];

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TITLE:${contactInfo.title}
EMAIL:${contactInfo.email}
TEL:${contactInfo.phone}
ADR:;;${contactInfo.location};;;
URL:${contactInfo.website}
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'galib-contact.vcf';
    a.click();
    URL.revokeObjectURL(url);
    
    // Trigger confetti celebration
    triggerConfetti();
    toast.success('Contact saved!');
  };

  const handleShare = async () => {
    const shareData = {
      title: contactInfo.name,
      text: `${contactInfo.title} - Digital Business Card`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background decorative elements for glassmorphism effect */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[150px]"></div>
      
      <div 
        className={`w-full max-w-md transition-all duration-700 ease-out relative z-10 ${
          isLoaded 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Main Card with Glassmorphism */}
        <Card className="relative overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-background/70 dark:bg-background/60 backdrop-blur-2xl backdrop-saturate-150">
          {/* Gradient Header with Banner */}
          <div className="h-36 bg-gradient-primary relative overflow-hidden">
            {/* Animated mesh gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent"></div>
            
            {/* Geometric patterns */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-20 h-20 border border-white/30 rounded-full"></div>
              <div className="absolute top-8 left-8 w-12 h-12 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/30 rotate-45"></div>
              <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
            </div>
            
            {/* Decorative blurs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/15 rounded-full blur-2xl"></div>
            
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>

          {/* Profile Image with Banner Effect */}
          <div className="relative -mt-20 flex justify-center">
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 bg-gradient-primary rounded-full opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-300"></div>
              {/* Spinning border */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full animate-[spin_6s_linear_infinite] opacity-80"></div>
              {/* Inner background */}
              <div className="absolute -inset-1 bg-background rounded-full"></div>
              {/* Profile image */}
              <img
                src={heroPortrait}
                alt={contactInfo.name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-background shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              {/* Status indicator */}
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-background shadow-lg animate-pulse"></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-4 space-y-6">
            {/* Name & Title */}
            <div 
              className={`text-center space-y-2 transition-all duration-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h1 className="text-2xl font-bold hero-text-gradient">{contactInfo.name}</h1>
              <p className="text-muted-foreground text-sm">{contactInfo.title}</p>
            </div>

            {/* Highlights */}
            <div 
              className={`grid grid-cols-3 gap-2 transition-all duration-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.label} 
                    className="text-center p-4 bg-gradient-to-br from-muted/60 to-muted/30 rounded-xl border border-border/50 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div 
              className={`space-y-3 transition-all duration-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded-xl border border-border/50 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</div>
                  <div className="text-sm font-semibold truncate">{contactInfo.email}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <a 
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded-xl border border-border/50 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Phone</div>
                  <div className="text-sm font-semibold">{contactInfo.phone}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded-xl border border-border/50 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Location</div>
                  <div className="text-sm font-semibold">{contactInfo.location}</div>
                </div>
              </div>

              <a 
                href={contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded-xl border border-border/50 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Website</div>
                  <div className="text-sm font-semibold">{contactInfo.website}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>

            {/* Expertise Tags */}
            <div 
              className={`space-y-2 transition-all duration-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, index) => (
                  <span 
                    key={skill} 
                    className="px-4 py-1.5 bg-gradient-to-r from-primary/15 to-primary/5 text-primary text-xs rounded-full font-semibold border border-primary/20 hover:border-primary/40 hover:from-primary/25 hover:to-primary/10 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div 
              className={`flex justify-center gap-3 transition-all duration-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div 
              className={`grid grid-cols-2 gap-3 transition-all duration-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <Button 
                onClick={handleDownloadVCard}
                className="btn-hero"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Save Contact
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline"
                className="btn-ghost-glow"
                size="lg"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </>
                )}
              </Button>
            </div>

            {/* QR Code for sharing */}
            <div 
              className={`flex flex-col items-center pt-4 border-t border-border space-y-2 transition-all duration-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <p className="text-xs text-muted-foreground">Share this card</p>
              <div className={`p-3 rounded-xl shadow-inner ${isDark ? 'bg-muted' : 'bg-white'}`}>
                <QRCodeSVG 
                  value={typeof window !== 'undefined' ? window.location.href : 'https://galib.dev/card'}
                  size={80}
                  level="M"
                  includeMargin={false}
                  bgColor={isDark ? 'hsl(240 10% 10%)' : '#ffffff'}
                  fgColor={isDark ? '#ffffff' : '#000000'}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Sheikh Yeasin Ahsanullah Al‑Galib
        </p>
      </div>
    </div>
  );
};

export default BusinessCard;
