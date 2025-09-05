import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Bangladesh: Opportunities and Challenges',
      excerpt: 'Exploring how artificial intelligence can transform industries in Bangladesh while addressing local challenges.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=240&fit=crop',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['AI', 'Bangladesh', 'Technology'],
      featured: true
    },
    // ... more posts
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              Insights & <span className="hero-text-gradient">Ideas</span>
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Thoughts on AI, technology, and building the future
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="card-elevated group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-4 left-4">{post.tags[0]}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{post.date}</div>
                        <div className="flex items-center"><Clock className="w-3 h-3 mr-1" />{post.readTime}</div>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;