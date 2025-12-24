import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectHero from '@/assets/project-hero.jpg';
import StaggeredReveal from '@/components/ui/StaggeredReveal';
import TextReveal from '@/components/ui/TextReveal';
import GradientTextReveal from '@/components/ui/GradientTextReveal';
import { useFeaturedProjectsContent } from '@/hooks/useContent';
import LazyImage from '@/components/ui/LazyImage';

const FeaturedProjects = () => {
  const { featuredProjects, loading } = useFeaturedProjectsContent();

  const title = featuredProjects?.title ?? 'Featured';
  const titleHighlight = featuredProjects?.titleHighlight ?? 'Projects';
  const subtitle = featuredProjects?.subtitle ?? 'Building innovative solutions that make a real impact in the world';
  
  const heroProject = featuredProjects?.heroProject ?? {
    title: 'AIELTS - AI-Powered IELTS Preparation Platform',
    description: 'Revolutionary AI platform that achieved 95% accuracy in IELTS score prediction and helped 10,000+ students improve their scores.',
    image: projectHero,
    metrics: ['+10K Users', '95% Accuracy', 'UIHP Award Winner'],
    techStack: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    liveUrl: 'https://aielts.com',
    githubUrl: 'https://github.com/galib/aielts'
  };

  const secondaryProjects = featuredProjects?.secondaryProjects ?? [
    {
      id: '1',
      title: 'Intelleeo Platform',
      description: 'Advanced analytics dashboard for startup metrics and KPI tracking.',
      techStack: ['Vue.js', 'Node.js', 'MongoDB'],
    },
    {
      id: '2',
      title: 'Smart Contract Analyzer',
      description: 'AI-powered tool for smart contract vulnerability detection.',
      techStack: ['Python', 'Solidity', 'ML'],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextReveal as="span" mode="words" staggerDelay={60}>{title}</TextReveal>{' '}
            <GradientTextReveal delay={200}>{titleHighlight}</GradientTextReveal>
          </h2>
          <TextReveal 
            as="p" 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            mode="words"
            delay={400}
            staggerDelay={30}
          >
            {subtitle}
          </TextReveal>
        </div>

        {/* Hero Project */}
        <div className="mb-12">
          <Card className="card-elevated overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <LazyImage
                  src={heroProject.image || projectHero}
                  alt={heroProject.title}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 pointer-events-none"></div>
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
                    <Button asChild className="btn-hero">
                      <a href={heroProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="btn-ghost-glow">
                      <a href={heroProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Secondary Projects */}
        <StaggeredReveal 
          className="grid md:grid-cols-2 gap-8 mb-12"
          staggerDelay={150}
          animation="fade-up"
          duration={600}
        >
          {secondaryProjects.map((project) => (
            <Link key={project.id || project.title} to="/projects">
              <Card className="card-elevated p-6 cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <span className="text-sm text-primary font-medium">Click to view in portfolio →</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </StaggeredReveal>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="btn-ghost-glow">
            <Link to="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
