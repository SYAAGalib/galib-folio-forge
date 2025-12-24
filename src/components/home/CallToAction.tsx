import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import TextReveal from '@/components/ui/TextReveal';
import GradientTextReveal from '@/components/ui/GradientTextReveal';
import { useCallToActionContent } from '@/hooks/useContent';

const CallToAction = () => {
  const { callToAction, loading } = useCallToActionContent();

  const title = callToAction?.title ?? "Let's Build Something";
  const titleHighlight = callToAction?.titleHighlight ?? 'Extraordinary';
  const subtitle = callToAction?.subtitle ?? "Whether you have a project in mind, want to collaborate on research, or just want to connect, I'd love to hear from you.";
  
  const ctaPrimary = callToAction?.ctaButtons?.primary ?? { text: 'Contact Me', link: '/contact' };
  const ctaSecondary = callToAction?.ctaButtons?.secondary ?? { text: 'Download Resume', link: '/resume.pdf' };

  const stats = callToAction?.stats ?? [
    { value: '10K+', label: 'Students Helped' },
    { value: '5+', label: 'Research Papers' },
    { value: '15+', label: 'Projects Built' },
    { value: '3+', label: 'Awards Won' },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="card-elevated relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
            
            <div className="relative p-8 md:p-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  <TextReveal as="span" mode="words" staggerDelay={60}>{title}</TextReveal>{' '}
                  <GradientTextReveal delay={300}>{titleHighlight}</GradientTextReveal>
                </h2>
                <TextReveal 
                  as="p" 
                  className="text-xl text-muted-foreground max-w-2xl mx-auto"
                  mode="words"
                  delay={500}
                  staggerDelay={25}
                >
                  {subtitle}
                </TextReveal>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center max-w-2xl mx-auto">
                {/* Main CTA */}
                <div className="space-y-4">
                  <Button size="lg" className="btn-hero w-full text-lg px-8 py-6" asChild>
                    <Link to={ctaPrimary.link}>
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {ctaPrimary.text}
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="btn-ghost-glow w-full text-lg px-8 py-6" asChild>
                    <a href={ctaSecondary.link}>
                      <Download className="w-5 h-5 mr-2" />
                      {ctaSecondary.text}
                    </a>
                  </Button>
                </div>

                {/* QR Code */}
                <Link to="/card" className="flex flex-col items-center space-y-4 group">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300 p-3">
                    <QRCodeSVG 
                      value={typeof window !== 'undefined' ? `${window.location.origin}/card` : 'https://galib.dev/card'}
                      size={100}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    Scan for digital business card
                  </p>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold hero-text-gradient">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
