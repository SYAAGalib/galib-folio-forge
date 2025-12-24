import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingMessageButton from './FloatingMessageButton';
import FloatingThemeToggle from './FloatingThemeToggle';
import CursorFollower from './CursorFollower';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CursorFollower />
      <Navbar />
      <main className="flex-1 pt-16">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <FloatingMessageButton />
      <FloatingThemeToggle />
    </div>
  );
};

export default Layout;