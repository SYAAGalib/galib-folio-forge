import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, Phone, MapPin, Globe, Github, Linkedin, 
  MessageCircle, Send, Download, ExternalLink, Briefcase, GraduationCap, Award, Share2, Copy, Check
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { toast } from 'sonner';
import heroPortrait from '@/assets/galib-hero-best.jpg';

const BusinessCard = () => {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isDark = resolvedTheme === 'dark';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-primary relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Profile Image */}
          <div className="relative -mt-16 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-primary rounded-full animate-[spin_8s_linear_infinite] opacity-70"></div>
              <img
                src={heroPortrait}
                alt={contactInfo.name}
                className="relative w-28 h-28 rounded-full object-cover border-4 border-background shadow-xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-4 space-y-6">
            {/* Name & Title */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold hero-text-gradient">{contactInfo.name}</h1>
              <p className="text-muted-foreground text-sm">{contactInfo.title}</p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="text-center p-3 bg-muted/50 rounded-lg">
                    <Icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm font-medium">{contactInfo.email}</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
              </a>

              <a 
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="text-sm font-medium">{contactInfo.phone}</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
              </a>

              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="text-sm font-medium">{contactInfo.location}</div>
                </div>
              </div>

              <a 
                href={contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Website</div>
                  <div className="text-sm font-medium">{contactInfo.website}</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
              </a>
            </div>

            {/* Expertise Tags */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
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
            <div className="grid grid-cols-2 gap-3">
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
            <div className="flex flex-col items-center pt-4 border-t border-border space-y-2">
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
