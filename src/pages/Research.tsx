import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, ExternalLink, Search, Filter, Calendar, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import researchHero from '@/assets/research-hero.jpg';

const Research = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'AI/ML', 'LLMs', 'NLP', 'Computer Vision', 'Robotics'];

  const research = [
    {
      id: 1,
      title: 'Large Language Models for Bangladeshi Language Processing',
      abstract: 'Comprehensive study on fine-tuning state-of-the-art LLMs for Bengali language understanding, achieving breakthrough results in sentiment analysis, machine translation, and text generation.',
      image: researchHero,
      category: 'LLMs',
      tags: ['LLM', 'NLP', 'Bengali', 'Transformer', 'Fine-tuning'],
      publication: 'Accepted at EMNLP 2024',
      year: '2024',
      authors: ['Sheikh Yeasin A. Al-Galib', 'Dr. Sarah Ahmed', 'Prof. Rajesh Kumar'],
      links: {
        paper: 'https://arxiv.org/paper/bengali-llm-2024',
        code: 'https://github.com/galib/bengali-llm',
        dataset: 'https://huggingface.co/datasets/galib/bengali-corpus'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Federated Learning for Privacy-Preserving Healthcare AI',
      abstract: 'Novel federated learning framework enabling collaborative medical AI training while maintaining patient privacy across distributed healthcare networks.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      category: 'AI/ML',
      tags: ['Federated Learning', 'Healthcare', 'Privacy', 'Distributed ML'],
      publication: 'Under Review at Nature Machine Intelligence',
      year: '2024',
      authors: ['Sheikh Yeasin A. Al-Galib', 'Dr. Maria Rodriguez', 'Prof. James Wilson'],
      links: {
        paper: 'https://arxiv.org/paper/federated-healthcare-2024',
        code: 'https://github.com/galib/federated-health-ai'
      },
      featured: false
    },
    {
      id: 3,
      title: 'Real-time Emotion Recognition in Bengali Speech',
      abstract: 'Deep learning approach for emotion classification in Bengali speech using attention-based neural networks with cultural context awareness.',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop',
      category: 'NLP',
      tags: ['Speech Recognition', 'Emotion AI', 'Bengali', 'Attention Networks'],
      publication: 'Published in IEEE TASLP 2023',
      year: '2023',
      authors: ['Sheikh Yeasin A. Al-Galib', 'Dr. Fatima Khan'],
      links: {
        paper: 'https://ieeexplore.ieee.org/document/bengali-emotion-2023',
        code: 'https://github.com/galib/bengali-emotion-recognition'
      },
      featured: false
    },
    {
      id: 4,
      title: 'Multimodal AI for Educational Content Generation',
      abstract: 'Innovative multimodal approach combining text, image, and audio for automated educational content creation tailored to individual learning styles.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      category: 'AI/ML',
      tags: ['Multimodal AI', 'Education', 'Content Generation', 'Personalization'],
      publication: 'Presented at ICML 2023',
      year: '2023',
      authors: ['Sheikh Yeasin A. Al-Galib', 'Dr. Alex Thompson', 'Prof. Linda Chen'],
      links: {
        paper: 'https://proceedings.mlr.press/multimodal-education-2023',
        code: 'https://github.com/galib/multimodal-education-ai'
      },
      featured: false
    },
    {
      id: 5,
      title: 'Adversarial Robustness in Bengali Text Classification',
      abstract: 'Comprehensive analysis of adversarial vulnerabilities in Bengali NLP models and development of robust defense mechanisms.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      category: 'NLP',
      tags: ['Adversarial ML', 'Robustness', 'Bengali NLP', 'Security'],
      publication: 'Published in ACL 2023',
      year: '2023',
      authors: ['Sheikh Yeasin A. Al-Galib', 'Dr. Michael Brown'],
      links: {
        paper: 'https://aclanthology.org/2023.acl-long.adversarial-bengali',
        code: 'https://github.com/galib/adversarial-bengali-nlp'
      },
      featured: false
    },
    {
      id: 6,
      title: 'Neural Architecture Search for Edge AI Deployment',
      abstract: 'Automated neural architecture search framework optimized for resource-constrained edge devices with emphasis on model efficiency.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      category: 'AI/ML',
      tags: ['NAS', 'Edge Computing', 'Model Compression', 'Optimization'],
      publication: 'Published in NeurIPS 2022',
      year: '2022',
      authors: ['Sheikh Yeasin A. Al-Galib', 'Dr. Jennifer Lee', 'Prof. David Kim'],
      links: {
        paper: 'https://papers.nips.cc/paper/2022/nas-edge-ai',
        code: 'https://github.com/galib/nas-edge-ai'
      },
      featured: false
    }
  ];

  const filteredResearch = research.filter(item => {
    const matchesFilter = selectedFilter === 'All' || item.category === selectedFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredResearch = filteredResearch.filter(r => r.featured);
  const regularResearch = filteredResearch.filter(r => !r.featured);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold">
                Research & <span className="hero-text-gradient">Innovation</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Exploring the frontiers of AI, machine learning, and intelligent systems
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
                <Card key={item.id} className="card-elevated overflow-hidden mb-8">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs bg-[hsl(var(--metric-badge))] text-[hsl(var(--metric-badge-foreground))] hover:bg-[hsl(var(--metric-badge))] border-[hsl(var(--metric-badge))]">{item.category}</Badge>
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
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-secondary/20"></div>
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
                    className="card-elevated group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-background/90">
                          {item.category}
                        </Badge>
                        <Badge variant="outline" className="bg-background/90 text-xs">
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
                          <Button size="sm" className="btn-hero flex-1">
                            <FileText className="w-3 h-3 mr-1" />
                            Paper
                          </Button>
                          <Button variant="outline" size="sm" className="btn-ghost-glow flex-1">
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
      </div>
    </Layout>
  );
};

export default Research;