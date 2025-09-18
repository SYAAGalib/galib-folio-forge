import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { href: '/projects', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Mail, href: 'mailto:galib@example.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com/in/galibtech', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/galibtech', label: 'GitHub' },
    { icon: MessageCircle, href: 'https://wa.me/8801234567890', label: 'WhatsApp' },
    { icon: Send, href: 'https://t.me/galibtech', label: 'Telegram' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img className='h-20' src="/logo.svg" alt="logo" />
              {/* <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">YG</span>
              </div>
              <span className="font-semibold text-lg">Sheikh Yeasin</span> */}
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              AI Innovator • Software Engineer • Startup Founder
              <br />
              Building the future with intelligent solutions.
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
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
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
            © 2024 Sheikh Yeasin Ahsanullah Al‑Galib. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            Made with <span className="text-red-500 mx-1">❤️</span> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;