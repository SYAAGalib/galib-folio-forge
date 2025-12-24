import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, ArrowLeft, ArrowRight, User, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useLegacyContent, type LegacyBlog } from '@/hooks/useContent';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface BlogPost extends LegacyBlog {
  tags?: string[];
  readTime?: string;
}

interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
}

const commentSchema = z.object({
  author_name: z.string().min(2, 'Name must be at least 2 characters'),
  author_email: z.string().email('Invalid email address'),
  content: z.string().min(10, 'Comment must be at least 10 characters').max(1000, 'Comment must be less than 1000 characters'),
});

type CommentFormData = z.infer<typeof commentSchema>;

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { content, loading } = useLegacyContent();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      author_name: '',
      author_email: '',
      content: '',
    },
  });

  const blogPosts = (content?.blog || []) as BlogPost[];
  const post = blogPosts.find(p => p.id === id);
  
  // Get related posts (same category or shared tags)
  const relatedPosts = blogPosts
    .filter(p => p.id !== id)
    .filter(p => p.category === post?.category || p.tags?.some(tag => post?.tags?.includes(tag)))
    .slice(0, 3);

  // Get previous and next posts
  const currentIndex = blogPosts.findIndex(p => p.id === id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      
      setLoadingComments(true);
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data || []);
      }
      setLoadingComments(false);
    };

    fetchComments();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('blog-comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'blog_comments',
          filter: `post_id=eq.${id}`,
        },
        (payload) => {
          setComments(prev => [payload.new as Comment, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const onSubmitComment = async (data: CommentFormData) => {
    if (!id) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase.from('blog_comments').insert({
        post_id: id,
        author_name: data.author_name,
        author_email: data.author_email,
        content: data.content,
      });

      if (error) throw error;

      toast.success('Comment added successfully!');
      form.reset();
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <SEO title="Post Not Found" description="The blog post you're looking for doesn't exist." />
        <div className="min-h-screen flex flex-col items-center justify-center py-20">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const postDate = post.createdAt || '';
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": postDate,
    "dateModified": post.updatedAt || postDate,
    "author": {
      "@type": "Person",
      "name": "Sheikh Yeasin Ahsanullah Al-Galib"
    },
    "publisher": {
      "@type": "Person",
      "name": "Sheikh Yeasin Ahsanullah Al-Galib"
    },
    "image": post.image,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://galib.dev/blog/${post.id}`
    }
  };

  return (
    <Layout>
      <SEO 
        title={post.title}
        description={post.description}
        keywords={post.tags?.join(', ') || post.category}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      <article className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-bg overflow-hidden">
          <div className="container mx-auto px-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{post.category}</Badge>
                {post.tags?.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>GA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">Galib</p>
                    <p className="text-xs">Author</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={postDate}>
                    {new Date(postDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime || '5 min read'}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {comments.length} comments
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-xl"
            />
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Post Navigation */}
        <section className="py-8 border-t border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex justify-between">
              {prevPost ? (
                <Link 
                  to={`/blog/${prevPost.id}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wide">Previous</p>
                    <p className="font-medium line-clamp-1 max-w-[200px]">{prevPost.title}</p>
                  </div>
                </Link>
              ) : <div />}
              
              {nextPost ? (
                <Link 
                  to={`/blog/${nextPost.id}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-right"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide">Next</p>
                    <p className="font-medium line-clamp-1 max-w-[200px]">{nextPost.title}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Comments ({comments.length})
              </h2>

              {/* Comment Form */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Leave a Comment</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitComment)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="author_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="author_email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Share your thoughts..." rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Post Comment
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Comments List */}
              {loadingComments ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.map(comment => (
                    <Card key={comment.id} className="card-elevated">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {comment.author_name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{comment.author_name}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <p className="text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                      <Card className="card-elevated h-full group">
                        <div className="relative overflow-hidden">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <Badge className="absolute top-3 left-3">{relatedPost.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;