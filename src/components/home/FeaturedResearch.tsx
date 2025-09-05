import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink } from 'lucide-react';
import researchHero from '@/assets/research-hero.jpg';

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
    <section className="py-20 bg-background">
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
          <Card className="card-elevated overflow-hidden animate-fade-in-up">
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
                    <Button className="btn-hero">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Paper
                    </Button>
                    <Button variant="outline" className="btn-ghost-glow">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Code
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
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {secondaryResearch.map((research, index) => (
            <Card
              key={research.title}
              className="card-elevated p-6 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">{research.title}</h4>
                <p className="text-muted-foreground">{research.description}</p>
                <div className="flex flex-wrap gap-2">
                  {research.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="btn-ghost-glow">
            View All Research
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResearch;