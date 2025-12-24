import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import FeaturedResearch from '@/components/home/FeaturedResearch';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import BlogPreview from '@/components/home/BlogPreview';
import CallToAction from '@/components/home/CallToAction';
import StatsSection from '@/components/home/StatsSection';
import Layout from '@/components/layout/Layout';
import ScrollReveal from '@/components/ui/ScrollReveal';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <HeroSection />
        <ScrollReveal direction="up" delay={100}>
          <StatsSection />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <FeaturedProjects />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <FeaturedResearch />
        </ScrollReveal>
        <ScrollReveal direction="left" delay={100}>
          <AboutSnapshot />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <TestimonialsPreview />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={100}>
          <BlogPreview />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <CallToAction />
        </ScrollReveal>
      </div>
    </Layout>
  );
};

export default Home;