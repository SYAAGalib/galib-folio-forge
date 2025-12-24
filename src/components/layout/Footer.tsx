import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import { useFooterContent } from '@/hooks/useContent';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  whatsapp: MessageCircle,
  telegram: Send,
};

const Footer = () => {
  const { footer, loading } = useFooterContent();

  const brand = footer?.brand ?? {
    logo: '/logo.svg',
    tagline: 'AI Innovator • Software Engineer • Startup Founder',
    description: 'Building the future with intelligent solutions.',
  };

  const quickLinks = footer?.quickLinks ?? [
    { href: '/projects', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/card', label: 'Digital Card' },
  ];

  const socialLinks = footer?.socialLinks ?? [
    { platform: 'email', url: 'mailto:syaagalib@gmail.com', label: 'Email' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/SYAAGalib', label: 'LinkedIn' },
    { platform: 'github', url: 'https://github.com/syaagalib', label: 'GitHub' },
    { platform: 'whatsapp', url: 'https://wa.me/8801946303020', label: 'WhatsApp' },
    { platform: 'telegram', url: 'https://t.me/SYAAGalib', label: 'Telegram' },
  ];

  const copyright = footer?.copyright ?? 'Sheikh Yeasin Ahsanullah Al‑Galib';
  const madeIn = footer?.madeIn ?? 'Bangladesh';

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img className="h-20" src={brand.logo} alt="logo" />
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              {brand.tagline}
              <br />
              {brand.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.platform] || Mail;
                return (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-glow"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {copyright}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            Made with <span className="text-red-500 mx-1">❤️</span> in {madeIn}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
