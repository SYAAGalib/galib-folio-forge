import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import FeaturedResearch from '@/components/home/FeaturedResearch';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import BlogPreview from '@/components/home/BlogPreview';
import CallToAction from '@/components/home/CallToAction';
import Layout from '@/components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <HeroSection />
        <FeaturedProjects />
        <FeaturedResearch />
        <AboutSnapshot />
        <TestimonialsPreview />
        <BlogPreview />
        <CallToAction />
      </div>
    </Layout>
  );
};

export default Home;