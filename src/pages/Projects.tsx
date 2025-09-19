import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ExternalLink, Github, Search, Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import projectHero from '@/assets/project-hero.jpg';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Projects', 'Case Studies', 'AI/ML', 'Web Dev', 'Mobile'];

  const projects = [
    {
      id: 1,
      title: 'AIELTS - AI-Powered IELTS Platform',
      description: 'Revolutionary AI platform for IELTS preparation with 95% accuracy in score prediction. Winner of UIHP National Award.',
      image: projectHero,
      type: 'Projects',
      category: 'AI/ML',
      techStack: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
      metrics: ['+10K Users', '95% Accuracy', 'Award Winner'],
      links: {
        live: 'https://aielts.com',
        github: 'https://github.com/galib/aielts'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Intelleeo Analytics Dashboard',
      description: 'Comprehensive analytics platform for startup metrics and KPI tracking with real-time insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      type: 'Projects',
      category: 'Web Dev',
      techStack: ['Vue.js', 'Node.js', 'MongoDB', 'D3.js'],
      metrics: ['Real-time Analytics', '50+ KPIs', 'Multi-tenant'],
      links: {
        live: 'https://intelleeo.com',
        github: 'https://github.com/galib/intelleeo'
      },
      featured: false
    },
    {
      id: 3,
      title: 'Smart Contract Security Analyzer',
      description: 'AI-powered tool for detecting vulnerabilities in smart contracts with advanced pattern recognition.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      type: 'Case Studies',
      category: 'AI/ML',
      techStack: ['Python', 'Solidity', 'PyTorch', 'Web3.js'],
      metrics: ['99.2% Accuracy', '1M+ Contracts Analyzed', 'Zero False Positives'],
      links: {
        live: 'https://smartaudit.ai',
        github: 'https://github.com/galib/smart-audit'
      },
      featured: false
    },
    {
      id: 4,
      title: 'Bangladesh Tourism Mobile App',
      description: 'Flutter-based mobile application promoting tourism in Bangladesh with AR features and local guides.',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=600&h=400&fit=crop',
      type: 'Projects',
      category: 'Mobile',
      techStack: ['Flutter', 'Firebase', 'ARCore', 'Google Maps'],
      metrics: ['100K+ Downloads', '4.8★ Rating', 'Featured by Google'],
      links: {
        live: 'https://play.google.com/store/apps/details?id=bd.tourism',
        github: 'https://github.com/galib/bd-tourism'
      },
      featured: false
    },
    {
      id: 5,
      title: 'Real-time Collaboration Platform',
      description: 'Google Docs-like collaborative platform built from scratch with operational transformation.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      type: 'Case Studies',
      category: 'Web Dev',
      techStack: ['React', 'Socket.io', 'OT.js', 'Redis'],
      metrics: ['Sub-100ms Latency', '1000+ Concurrent Users', 'Conflict-free'],
      links: {
        live: 'https://collab.tech',
        github: 'https://github.com/galib/realtime-collab'
      },
      featured: false
    },
    {
      id: 6,
      title: 'AI-Powered Content Generator',
      description: 'Advanced content generation platform using fine-tuned GPT models for Bengali and English content.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      type: 'Projects',
      category: 'AI/ML',
      techStack: ['Python', 'Transformers', 'FastAPI', 'Docker'],
      metrics: ['10M+ Words Generated', '98% Quality Score', '40+ Languages'],
      links: {
        live: 'https://contentai.co',
        github: 'https://github.com/galib/content-ai'
      },
      featured: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All' || project.category === selectedFilter || project.type === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold">
                Projects & <span className="hero-text-gradient">Case Studies</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                From AI-powered platforms to scalable business solutions — here's what I've built
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-background sticky top-16 z-40 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={selectedFilter === filter ? "btn-hero" : ""}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {filter}
                  </Button>
                ))}
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="py-16 bg-accent/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Featured <span className="hero-text-gradient">Projects</span>
              </h2>
              {featuredProjects.map((project) => (
                <Card key={project.id} className="card-elevated overflow-hidden mb-8">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{project.type}</Badge>
                            <Badge variant="outline">{project.category}</Badge>
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                          <p className="text-muted-foreground mb-4">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.metrics.map((metric) => (
                            <Badge key={metric} variant="secondary" className="px-3 py-1 bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))] hover:bg-[hsl(var(--metric-badge))] border-[hsl(var(--metric-badge))]">
                              {metric}
                            </Badge>
                          ))}
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Tech Stack:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

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
              ))}
            </div>
          </section>
        )}

        {/* Project Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {regularProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project, index) => (
                  <Card
                    key={project.id}
                    className="card-elevated group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-background/90">
                          {project.type}
                        </Badge>
                        <Badge variant="outline" className="bg-background/90">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {project.metrics.slice(0, 2).map((metric) => (
                            <Badge key={metric} variant="secondary" className="text-xs bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))] hover:bg-[hsl(var(--metric-badge))] border-[hsl(var(--metric-badge))]">
                              {metric}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.techStack.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2 pt-4">
                          <Button size="sm" className="btn-hero flex-1">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Live
                          </Button>
                          <Button variant="outline" size="sm" className="btn-ghost-glow flex-1">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No projects found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Projects;