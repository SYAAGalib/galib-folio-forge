import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingMessageButton from './FloatingMessageButton';
import FloatingThemeToggle from './FloatingThemeToggle';
import CursorFollower from './CursorFollower';
import PageTransition from './PageTransition';
import ScrollProgressIndicator from './ScrollProgressIndicator';
import PagePreloader from './PagePreloader';
import StickyNavSidebar from './StickyNavSidebar';
import ScrollToTopButton from './ScrollToTopButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PagePreloader />
      <ScrollProgressIndicator />
      <CursorFollower />
      <Navbar />
      <StickyNavSidebar />
      <main className="flex-1 pt-16">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <FloatingMessageButton />
      <FloatingThemeToggle />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;