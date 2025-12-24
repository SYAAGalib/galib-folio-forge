import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Github, Search, Filter, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useProjectsPageContent, ProjectItem } from '@/hooks/useContent';
import SEO from '@/components/SEO';
import LazyImage from '@/components/ui/LazyImage';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showMore, setShowMore] = useState(false);

  const { projectsPage, loading } = useProjectsPageContent();

  const title = projectsPage?.title ?? 'Projects &';
  const titleHighlight = projectsPage?.titleHighlight ?? 'Case Studies';
  const subtitle = projectsPage?.subtitle ?? "From AI-powered platforms to scalable business solutions — here's what I've built";
  const filters = projectsPage?.filters ?? ['All', 'Projects', 'Case Studies', 'AI/ML', 'Web Dev', 'Mobile'];
  const projects = projectsPage?.projects ?? [];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All' || project.category === selectedFilter || project.type === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);
  const visibleProjects = showMore ? regularProjects : regularProjects.slice(0, 6);

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <Layout>
      <SEO 
        title="Projects"
        description="Explore AI-powered platforms, web applications, and innovative software solutions built by Sheikh Yeasin Ahsanullah Al-Galib."
        keywords="projects, portfolio, AI projects, web development, machine learning, case studies"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold">
                {title} <span className="hero-text-gradient">{titleHighlight}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {subtitle}
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
                <Card 
                  key={project.id} 
                  className="card-elevated overflow-hidden mb-8 cursor-pointer group"
                  onClick={() => openProjectModal(project)}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 pointer-events-none"></div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))]">{project.type}</Badge>
                            <Badge variant="outline">{project.category}</Badge>
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                          <p className="text-muted-foreground mb-4">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.metrics.map((metric) => (
                            <Badge key={metric} variant="secondary" className="px-3 py-1 bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))]">
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
                          <Button 
                            className="btn-hero"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.links.live, '_blank');
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </Button>
                          <Button 
                            variant="outline" 
                            className="btn-ghost-glow"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.links.github, '_blank');
                            }}
                          >
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
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleProjects.map((project, index) => (
                    <Card
                      key={project.id}
                      className="card-elevated group cursor-pointer animate-fade-in-up hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => openProjectModal(project)}
                    >
                    <div className="relative overflow-hidden">
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {project.type}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
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
                            <Badge key={metric} variant="secondary" className="text-xs bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))]">
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
                          <Button 
                            size="sm" 
                            className="btn-hero flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.links.live, '_blank');
                            }}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Live
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="btn-ghost-glow flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.links.github, '_blank');
                            }}
                          >
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  ))}
                </div>

                {regularProjects.length > 6 && (
                  <div className="text-center mt-12">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="btn-ghost-glow"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Show Less' : `View More Projects (${regularProjects.length - 6} more)`}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No projects found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={closeProjectModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <LazyImage
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 rounded-lg"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{selectedProject.type}</Badge>
                    <Badge variant="outline">{selectedProject.category}</Badge>
                  </div>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Metrics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.metrics.map((metric) => (
                        <Badge key={metric} variant="secondary">{metric}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button className="btn-hero" onClick={() => window.open(selectedProject.links.live, '_blank')}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                    <Button variant="outline" className="btn-ghost-glow" onClick={() => window.open(selectedProject.links.github, '_blank')}>
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Projects;