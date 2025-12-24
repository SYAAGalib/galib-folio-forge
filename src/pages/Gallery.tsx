import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Play, X, ExternalLink, Calendar, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useGalleryPageContent, GalleryItem } from '@/hooks/useContent';

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  const { galleryPage, loading } = useGalleryPageContent();

  const title = galleryPage?.title ?? 'Gallery &';
  const titleHighlight = galleryPage?.titleHighlight ?? 'Media';
  const subtitle = galleryPage?.subtitle ?? 'A visual journey through my work, achievements, and public appearances';
  const filters = galleryPage?.filters ?? ['All', 'Events', 'Awards', 'Speaking', 'Press', 'Behind the Scenes'];
  const mediaItems = galleryPage?.items ?? [];

  const filteredMedia = mediaItems.filter(item => 
    selectedFilter === 'All' || item.category === selectedFilter
  );

  const featuredMedia = filteredMedia.filter(item => item.featured);
  const regularMedia = filteredMedia.filter(item => !item.featured);

  const openLightbox = (item: GalleryItem) => {
    setSelectedMedia(item);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const MediaCard = ({ item, featured = false }: { item: GalleryItem, featured?: boolean }) => (
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
                {title} <span className="hero-text-gradient">{titleHighlight}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {subtitle}
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

                {selectedMedia.type === 'image' && selectedMedia.fullImage && (
                  <img
                    src={selectedMedia.fullImage}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                )}

                {selectedMedia.type === 'video' && selectedMedia.videoUrl && (
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