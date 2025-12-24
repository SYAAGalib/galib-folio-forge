import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import researchHero from '@/assets/research-hero.jpg';
import StaggeredReveal from '@/components/ui/StaggeredReveal';

const FeaturedResearch = () => {
  const heroResearch = {
    title: 'Large Language Models for Bangladeshi Language Processing',
    description: 'Groundbreaking research on fine-tuning LLMs for Bengali language understanding, achieving state-of-the-art results in sentiment analysis and machine translation.',
    image: researchHero,
    tags: ['LLM', 'NLP', 'Bengali', 'Transformer'],
    publication: 'Accepted at EMNLP 2024',
    links: {
      paper: 'https://arxiv.org/paper/bengali-llm',
      code: 'https://github.com/galib/bengali-llm'
    }
  };

  const secondaryResearch = [
    {
      title: 'AI-Driven Code Generation for Low-Resource Languages',
      description: 'Novel approach to automated code generation using multi-modal transformers.',
      tags: ['AI', 'Code Generation', 'Multimodal'],
    },
    {
      title: 'Federated Learning in Edge Computing',
      description: 'Privacy-preserving machine learning framework for distributed systems.',
      tags: ['Federated Learning', 'Edge Computing', 'Privacy'],
    },
  ];

  return (
    <section id="research" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="hero-text-gradient">Research</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pushing the boundaries of AI and machine learning through innovative research
          </p>
        </div>

        {/* Hero Research */}
        <div className="mb-12">
          <Card className="card-elevated overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{heroResearch.title}</h3>
                    <p className="text-muted-foreground mb-4">{heroResearch.description}</p>
                  </div>

                  {/* Publication */}
                  <div className="bg-accent/50 rounded-lg p-4">
                    <p className="text-sm font-medium text-primary">
                      📄 {heroResearch.publication}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {heroResearch.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button asChild className="btn-hero">
                      <a href={heroResearch.links.paper} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        Read Paper
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="btn-ghost-glow">
                      <a href={heroResearch.links.code} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <div className="relative h-64 lg:h-auto">
                <img
                  src={heroResearch.image}
                  alt={heroResearch.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-secondary/20"></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary Research */}
        <StaggeredReveal 
          className="grid md:grid-cols-2 gap-8 mb-12"
          staggerDelay={180}
          animation="fade-left"
          duration={550}
        >
          {secondaryResearch.map((research) => (
            <Link key={research.title} to="/research">
              <Card className="card-elevated p-6 cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">{research.title}</h4>
                  <p className="text-muted-foreground">{research.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {research.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <span className="text-sm text-primary font-medium">Click to view in research →</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </StaggeredReveal>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="btn-ghost-glow">
            <Link to="/research">
              View All Research
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResearch;