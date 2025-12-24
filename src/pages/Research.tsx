import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, ExternalLink, Search, Filter, Calendar, User, Github } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useResearchPageContent, ResearchItem } from '@/hooks/useContent';
import SEO from '@/components/SEO';
import LazyImage from '@/components/ui/LazyImage';

const Research = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);

  const { researchPage, loading } = useResearchPageContent();

  const title = researchPage?.title ?? 'Research &';
  const titleHighlight = researchPage?.titleHighlight ?? 'Innovation';
  const subtitle = researchPage?.subtitle ?? 'Exploring the frontiers of AI, machine learning, and intelligent systems';
  const filters = researchPage?.filters ?? ['All', 'AI/ML', 'LLMs', 'NLP', 'Computer Vision', 'Robotics'];
  const research = researchPage?.research ?? [];

  const filteredResearch = research.filter(item => {
    const matchesFilter = selectedFilter === 'All' || item.category === selectedFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredResearch = filteredResearch.filter(r => r.featured);
  const regularResearch = filteredResearch.filter(r => !r.featured);

  const openResearchModal = (item: ResearchItem) => {
    setSelectedResearch(item);
  };

  const closeResearchModal = () => {
    setSelectedResearch(null);
  };

  return (
    <Layout>
      <SEO 
        title="Research"
        description="Explore cutting-edge research in AI, machine learning, Bengali NLP, and intelligent systems by Sheikh Yeasin Ahsanullah Al-Galib."
        keywords="AI research, machine learning, NLP, Bengali NLP, computer vision, published papers"
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
                  placeholder="Search research..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Research */}
        {featuredResearch.length > 0 && (
          <section className="py-16 bg-accent/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Featured <span className="hero-text-gradient">Research</span>
              </h2>
              {featuredResearch.map((item) => (
                <Card 
                  key={item.id} 
                  className="card-elevated overflow-hidden mb-8 cursor-pointer group"
                  onClick={() => openResearchModal(item)}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))]">{item.category}</Badge>
                            <Badge variant="outline" className="text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.year}
                            </Badge>
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                          <p className="text-muted-foreground mb-4">{item.abstract}</p>
                        </div>

                        <div className="bg-accent/50 rounded-lg p-4">
                          <p className="text-sm font-medium text-primary">
                            📄 {item.publication}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 mb-2 text-sm text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>Authors:</span>
                          </div>
                          <p className="text-sm">{item.authors.join(', ')}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-4 pt-4">
                          <Button 
                            className="btn-hero"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(item.links.paper, '_blank');
                            }}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Read Paper
                          </Button>
                          <Button 
                            variant="outline" 
                            className="btn-ghost-glow"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(item.links.code, '_blank');
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Code
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-secondary/20 pointer-events-none"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Research Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {regularResearch.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularResearch.map((item, index) => (
                  <Card
                    key={item.id}
                    className="card-elevated group cursor-pointer animate-fade-in-up hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => openResearchModal(item)}
                  >
                    <div className="relative overflow-hidden">
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {item.category}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                          {item.year}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {item.abstract}
                        </p>

                        <div className="bg-accent/30 rounded p-2">
                          <p className="text-xs text-primary font-medium">
                            {item.publication}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2 pt-4">
                          <Button 
                            size="sm" 
                            className="btn-hero flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(item.links.paper, '_blank');
                            }}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Paper
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="btn-ghost-glow flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(item.links.code, '_blank');
                            }}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
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
                  No research found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Research Modal */}
        <Dialog open={!!selectedResearch} onOpenChange={closeResearchModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedResearch && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedResearch.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <LazyImage
                    src={selectedResearch.image}
                    alt={selectedResearch.title}
                    className="w-full h-64 rounded-lg"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{selectedResearch.category}</Badge>
                    <Badge variant="outline">{selectedResearch.year}</Badge>
                  </div>
                  <div className="bg-accent/50 rounded-lg p-4">
                    <p className="text-sm font-medium text-primary">📄 {selectedResearch.publication}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Authors</h4>
                    <p className="text-muted-foreground">{selectedResearch.authors.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Abstract</h4>
                    <p className="text-muted-foreground">{selectedResearch.abstract}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedResearch.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button className="btn-hero" onClick={() => window.open(selectedResearch.links.paper, '_blank')}>
                      <FileText className="w-4 h-4 mr-2" />
                      Read Paper
                    </Button>
                    <Button variant="outline" className="btn-ghost-glow" onClick={() => window.open(selectedResearch.links.code, '_blank')}>
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

export default Research;