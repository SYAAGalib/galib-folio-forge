-- Create comments table for blog posts
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read approved comments (public blog)
CREATE POLICY "Anyone can view approved comments" 
ON public.blog_comments 
FOR SELECT 
USING (approved = true);

-- Allow anyone to insert comments (public blog)
CREATE POLICY "Anyone can add comments" 
ON public.blog_comments 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster lookups by post_id
CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(post_id);

-- Enable realtime for comments
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_comments;