import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, X, ExternalLink, Calendar, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const filters = ['All', 'Events', 'Awards', 'Speaking', 'Press', 'Behind the Scenes'];

  const mediaItems = [
    {
      id: 1,
      title: 'UIHP Award Ceremony 2024',
      category: 'Awards',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=600&h=400&fit=crop',
      fullImage: 'https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=1200&h=800&fit=crop',
      date: 'January 15, 2024',
      location: 'Dhaka, Bangladesh',
      description: 'Receiving the prestigious UIHP National Award for innovation in AI technology and educational platforms.',
      featured: true
    },
    {
      id: 2,
      title: 'AI Conference Keynote',
      category: 'Speaking',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
      videoUrl: 'https://player.vimeo.com/video/sample',
      date: 'March 10, 2024',
      location: 'Dhaka University',
      description: 'Keynote presentation on "The Future of AI in Bangladesh" at the International AI Conference.',
      featured: true
    },
    {
      id: 3,
      title: 'Team Building at Intelleeo',
      category: 'Behind the Scenes',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
      fullImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
      date: 'February 20, 2024',
      location: 'Khulna Office',
      description: 'Strategic planning session with the Intelleeo team, discussing new technology initiatives.',
      featured: false
    },
    {
      id: 4,
      title: 'TechCrunch Feature',
      category: 'Press',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
      articleUrl: 'https://techcrunch.com/aielts-feature',
      date: 'December 5, 2023',
      location: 'Online',
      description: 'Featured article about AIELTS platform and its impact on language learning technology.',
      featured: false
    },
    {
      id: 5,
      title: 'Product Launch Event',
      category: 'Events',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop',
      fullImage: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=800&fit=crop',
      date: 'November 18, 2023',
      location: 'Dhaka Tech Hub',
      description: 'Official launch of AIELTS 2.0 with advanced AI features and enhanced user experience.',
      featured: false
    },
    {
      id: 6,
      title: 'Research Lab Visit',
      category: 'Behind the Scenes',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      fullImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop',
      date: 'October 15, 2023',
      location: 'BUET AI Lab',
      description: 'Collaborative research session on Bengali language processing models.',
      featured: false
    },
    {
      id: 7,
      title: 'Startup Summit Panel',
      category: 'Speaking',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
      videoUrl: 'https://player.vimeo.com/video/sample2',
      date: 'September 22, 2023',
      location: 'Dhaka Convention Center',
      description: 'Panel discussion on "AI Entrepreneurship in Bangladesh" at the National Startup Summit.',
      featured: false
    },
    {
      id: 8,
      title: 'University Guest Lecture',
      category: 'Speaking',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
      fullImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
      date: 'August 12, 2023',
      location: 'NSU, Dhaka',
      description: 'Guest lecture on "Machine Learning Applications in EdTech" for computer science students.',
      featured: false
    },
    {
      id: 9,
      title: 'IEEE Publication Feature',
      category: 'Press',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      articleUrl: 'https://ieee.org/publications/bengali-nlp',
      date: 'July 8, 2023',
      location: 'Online',
      description: 'Research paper featured in IEEE Transactions on Audio, Speech, and Language Processing.',
      featured: false
    }
  ];

  const filteredMedia = mediaItems.filter(item => 
    selectedFilter === 'All' || item.category === selectedFilter
  );

  const featuredMedia = filteredMedia.filter(item => item.featured);
  const regularMedia = filteredMedia.filter(item => !item.featured);

  const openLightbox = (item: any) => {
    setSelectedMedia(item);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const MediaCard = ({ item, featured = false }: { item: any, featured?: boolean }) => (
    <Card
      className={`card-elevated group cursor-pointer animate-fade-in-up ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      onClick={() => openLightbox(item)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            featured ? 'h-64 md:h-80' : 'h-48'
          }`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/90">
            {item.category}
          </Badge>
        </div>

        {/* Media Type Indicator */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
          </div>
        )}

        {item.type === 'article' && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className={`font-semibold mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
            {item.title}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {item.date}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {item.location}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold">
                Gallery & <span className="hero-text-gradient">Media</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A visual journey through my work, achievements, and public appearances
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background sticky top-16 z-40 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "btn-hero" : ""}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Media */}
        {featuredMedia.length > 0 && (
          <section className="py-16 bg-accent/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Featured <span className="hero-text-gradient">Highlights</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredMedia.map((item) => (
                  <MediaCard key={item.id} item={item} featured />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Media Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {regularMedia.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularMedia.map((item, index) => (
                  <div
                    key={item.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <MediaCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No media found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedMedia && (
          <Dialog open={!!selectedMedia} onOpenChange={() => closeLightbox()}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                >
                  <X className="w-4 h-4" />
                </Button>

                {selectedMedia.type === 'image' && (
                  <img
                    src={selectedMedia.fullImage}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                )}

                {selectedMedia.type === 'video' && (
                  <div className="aspect-video">
                    <iframe
                      src={selectedMedia.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}

                {selectedMedia.type === 'article' && (
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">{selectedMedia.title}</h3>
                    <p className="text-muted-foreground mb-6">{selectedMedia.description}</p>
                    <Button className="btn-hero" onClick={() => window.open(selectedMedia.articleUrl, '_blank')}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </Button>
                  </div>
                )}

                {/* Media Info */}
                <div className="p-6 bg-background">
                  <h3 className="text-xl font-semibold mb-2">{selectedMedia.title}</h3>
                  <p className="text-muted-foreground mb-4">{selectedMedia.description}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedMedia.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedMedia.location}
                    </div>
                    <Badge variant="outline">{selectedMedia.category}</Badge>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;