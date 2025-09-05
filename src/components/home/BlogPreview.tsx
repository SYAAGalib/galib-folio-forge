import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Bangladesh: Opportunities and Challenges',
      excerpt: 'Exploring how artificial intelligence can transform industries in Bangladesh while addressing local challenges and cultural contexts.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=240&fit=crop',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['AI', 'Bangladesh', 'Technology'],
    },
    {
      id: 2,
      title: 'Building AIELTS: Lessons from Creating an AI EdTech Platform',
      excerpt: 'Behind the scenes of developing an award-winning AI platform that helped thousands of students improve their IELTS scores.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop',
      date: '2024-01-08',
      readTime: '12 min read',
      tags: ['Startup', 'EdTech', 'AI'],
    },
    {
      id: 3,
      title: 'Fine-tuning Large Language Models for Bengali: Technical Deep Dive',
      excerpt: 'A comprehensive guide to adapting state-of-the-art LLMs for Bengali language processing, including challenges and solutions.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop',
      date: '2024-01-01',
      readTime: '15 min read',
      tags: ['LLM', 'NLP', 'Bengali', 'Research'],
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="hero-text-gradient">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on AI, technology, and building the future
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="card-elevated group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90">
                    {post.tags[0]}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(1).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="btn-ghost-glow">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;