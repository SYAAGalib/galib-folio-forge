import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import FeaturedResearch from '@/components/home/FeaturedResearch';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import BlogPreview from '@/components/home/BlogPreview';
import CallToAction from '@/components/home/CallToAction';
import Layout from '@/components/layout/Layout';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MorphingBackground from '@/components/ui/MorphingBackground';
import ScrollParticles from '@/components/ui/ScrollParticles';

const Home = () => {
  return (
    <Layout>
      <MorphingBackground shapeCount={6} opacity={0.12} />
      <ScrollParticles particleCount={40} maxOpacity={0.5} />
      <div className="min-h-screen relative z-10">
        <HeroSection />
        
        {/* Projects - slide up with a subtle flip for depth */}
        <ScrollReveal animation="flip-up" duration={800} delay={50}>
          <FeaturedProjects />
        </ScrollReveal>
        
        {/* Research - fade from right for variety */}
        <ScrollReveal animation="fade-left" duration={750} delay={0} distance={80}>
          <FeaturedResearch />
        </ScrollReveal>
        
        {/* About - blur in for a soft, personal feel */}
        <ScrollReveal animation="blur-in" duration={900} delay={0}>
          <AboutSnapshot />
        </ScrollReveal>
        
        {/* Testimonials - gentle fade up */}
        <ScrollReveal animation="fade-up" duration={700} delay={0} distance={50}>
          <TestimonialsPreview />
        </ScrollReveal>
        
        {/* Blog - slide from right */}
        <ScrollReveal animation="slide-right" duration={800} delay={0}>
          <BlogPreview />
        </ScrollReveal>
        
        {/* CTA - rotate in for attention */}
        <ScrollReveal animation="rotate-in" duration={700} delay={0}>
          <CallToAction />
        </ScrollReveal>
      </div>
    </Layout>
  );
};

export default Home;