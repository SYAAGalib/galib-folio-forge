import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import projectHero from '@/assets/project-hero.jpg';

const FeaturedProjects = () => {
  const heroProject = {
    title: 'AIELTS - AI-Powered IELTS Preparation Platform',
    description: 'Revolutionary AI platform that achieved 95% accuracy in IELTS score prediction and helped 10,000+ students improve their scores.',
    image: projectHero,
    metrics: ['+10K Users', '95% Accuracy', 'UIHP Award Winner'],
    techStack: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    links: {
      live: 'https://aielts.com',
      github: 'https://github.com/galib/aielts'
    }
  };

  const secondaryProjects = [
    {
      title: 'Intelleeo Platform',
      description: 'Advanced analytics dashboard for startup metrics and KPI tracking.',
      techStack: ['Vue.js', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Smart Contract Analyzer',
      description: 'AI-powered tool for smart contract vulnerability detection.',
      techStack: ['Python', 'Solidity', 'ML'],
    },
  ];

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="hero-text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions that make a real impact in the world
          </p>
        </div>

        {/* Hero Project */}
        <div className="mb-12">
          <Card className="card-elevated overflow-hidden animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={heroProject.image}
                  alt={heroProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{heroProject.title}</h3>
                    <p className="text-muted-foreground mb-4">{heroProject.description}</p>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3">
                    {heroProject.metrics.map((metric) => (
                      <Badge key={metric} variant="secondary" className="px-3 py-1 bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))] hover:bg-[hsl(var(--metric-badge))] border-[hsl(var(--metric-badge))]">
                        {metric}
                      </Badge>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <p className="text-sm font-medium mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {heroProject.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button className="btn-hero">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                    <Button variant="outline" className="btn-ghost-glow">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Secondary Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {secondaryProjects.map((project, index) => (
            <Card
              key={project.title}
              className="card-elevated p-6 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">{project.title}</h4>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
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
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;