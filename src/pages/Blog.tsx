import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLegacyContent, type LegacyBlog } from '@/hooks/useContent';
import SEO from '@/components/SEO';

interface BlogPost extends LegacyBlog {
  tags?: string[];
  readTime?: string;
}

const Blog = () => {
  const { content, loading } = useLegacyContent();

  const title = 'Insights &';
  const titleHighlight = 'Ideas';
  const subtitle = 'Thoughts on AI, technology, startups, and building the future';
  const blogPosts = (content?.blog || []) as BlogPost[];

  // Sort by date, newest first
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = a.createdAt || '1970-01-01';
    const dateB = b.createdAt || '1970-01-01';
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const featuredPosts = sortedPosts.filter(post => post.featured);

  // Generate structured data for blog listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Galib's Tech Blog",
    "description": "Insights on AI, machine learning, web development, and technology trends",
    "url": "https://galib.dev/blog",
    "author": {
      "@type": "Person",
      "name": "Sheikh Yeasin Ahsanullah Al-Galib"
    },
    "blogPost": sortedPosts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.createdAt,
      "author": {
        "@type": "Person",
        "name": "Sheikh Yeasin Ahsanullah Al-Galib"
      }
    }))
  };

  return (
    <Layout>
      <SEO 
        title="Blog - AI, Machine Learning & Web Development Insights"
        description="Read expert insights on artificial intelligence, machine learning, React development, startup tips, and technology trends from Sheikh Yeasin Ahsanullah Al-Galib."
        keywords="AI blog, machine learning tutorials, React development, web development tips, startup advice, tech insights, Python tutorials, TensorFlow guide"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      <div className="min-h-screen">
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              {title} <span className="hero-text-gradient">{titleHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`}>
                    <article className="group h-full">
                      <Card className="card-elevated overflow-hidden h-full">
                        <div className="relative overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" 
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                            <Badge variant="secondary">{post.category}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <time dateTime={post.createdAt}>
                                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </time>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime || '5 min read'}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-secondary rounded-full"></span>
              All Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <article className="group h-full">
                    <Card className="card-elevated cursor-pointer h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <time dateTime={post.createdAt}>
                                {new Date(post.createdAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric'
                                })}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime || '5 min read'}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;