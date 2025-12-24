import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Search, X, Filter } from 'lucide-react';
import { useLegacyContent, type LegacyBlog } from '@/hooks/useContent';
import SEO from '@/components/SEO';

interface BlogPost extends LegacyBlog {
  tags?: string[];
  readTime?: string;
}

const Blog = () => {
  const { content, loading } = useLegacyContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const title = 'Insights &';
  const titleHighlight = 'Ideas';
  const subtitle = 'Thoughts on AI, technology, startups, and building the future';
  const blogPosts = (content?.blog || []) as BlogPost[];

  // Sort by date, newest first
  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      const dateA = a.createdAt || '1970-01-01';
      const dateB = b.createdAt || '1970-01-01';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }, [blogPosts]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(post => post.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [blogPosts]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === null || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [sortedPosts, searchQuery, selectedCategory]);

  const featuredPosts = useMemo(() => {
    return filteredPosts.filter(post => post.featured);
  }, [filteredPosts]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== null;

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
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              {subtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 h-12 text-base bg-background/80 backdrop-blur-sm border-border/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-6 bg-muted/30 border-b sticky top-0 z-40 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <Filter className="w-4 h-4" />
                <span>Filter:</span>
              </div>
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="shrink-0"
              >
                All ({sortedPosts.length})
              </Button>
              {categories.map(category => {
                const count = sortedPosts.filter(p => p.category === category).length;
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="shrink-0"
                  >
                    {category} ({count})
                  </Button>
                );
              })}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="shrink-0 text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Results Summary */}
        {hasActiveFilters && (
          <section className="py-4 bg-background border-b">
            <div className="container mx-auto px-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                {searchQuery && <span> matching "<strong className="text-foreground">{searchQuery}</strong>"</span>}
                {selectedCategory && <span> in <strong className="text-foreground">{selectedCategory}</strong></span>}
              </p>
            </div>
          </section>
        )}

        {/* Featured Posts Section - Only show when no filters active */}
        {!hasActiveFilters && featuredPosts.length > 0 && (
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
              {hasActiveFilters ? 'Search Results' : 'All Articles'}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
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
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;