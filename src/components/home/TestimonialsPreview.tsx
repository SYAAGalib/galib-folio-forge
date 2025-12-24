import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TextReveal from '@/components/ui/TextReveal';
import GradientTextReveal from '@/components/ui/GradientTextReveal';
import { useTestimonialsContent } from '@/hooks/useContent';

const TestimonialsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { testimonials: testimonialsContent, loading } = useTestimonialsContent();

  const title = testimonialsContent?.title ?? 'What People';
  const titleHighlight = testimonialsContent?.titleHighlight ?? 'Say';
  const subtitle = testimonialsContent?.subtitle ?? 'Testimonials from colleagues, collaborators, and industry leaders';

  const testimonials = testimonialsContent?.items ?? [
    {
      id: '1',
      name: 'Dr. Sarah Ahmed',
      role: 'Professor of Computer Science',
      organization: 'University of Dhaka',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: "Sheikh Yeasin's work on Bengali language processing has been groundbreaking. His approach to fine-tuning LLMs shows exceptional understanding of both technical depth and cultural context.",
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'CEO',
      organization: 'TechVenture Partners',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'AIELTS has revolutionized how students prepare for language proficiency tests. The AI accuracy and user experience Galib created is truly remarkable.',
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      role: 'Lead Data Scientist',
      organization: 'Google Research',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'Working with Galib on research collaborations has been inspiring. His innovative thinking and technical execution consistently exceed expectations.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextReveal as="span" mode="words" staggerDelay={60}>{title}</TextReveal>{' '}
            <GradientTextReveal delay={250}>{titleHighlight}</GradientTextReveal>
          </h2>
          <TextReveal 
            as="p" 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            mode="words"
            delay={400}
            staggerDelay={30}
          >
            {subtitle}
          </TextReveal>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <Card className="card-elevated relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                {/* Quote Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={testimonials[currentIndex].avatar} />
                    <AvatarFallback>
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-primary">
                      {testimonials[currentIndex].organization}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
