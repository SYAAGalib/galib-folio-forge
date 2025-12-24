import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Research from "./pages/Research";
import Achievements from "./pages/Achievements";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import BusinessCard from "./pages/BusinessCard";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminResearch from "./pages/AdminResearch";
import AdminBlog from "./pages/AdminBlog";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminMessages from "./pages/AdminMessages";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";
import AdminContent from "./pages/AdminContent";
import AdminLayout from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => {
  // Force set the correct title on app load
  useEffect(() => {
    document.title = "Sheikh Yeasin Ahsanullah Al-Galib | AI Engineer & Startup Founder";
  }, []);

  // Use the title hook to monitor and maintain the correct title
  useTitle();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/research" element={<Research />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/card" element={<BusinessCard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
                <Route path="/admin/research" element={<AdminLayout><AdminResearch /></AdminLayout>} />
                <Route path="/admin/blog" element={<AdminLayout><AdminBlog /></AdminLayout>} />
                <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
                <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
                <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
                <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
                <Route path="/admin/content" element={<AdminLayout><AdminContent /></AdminLayout>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Analytics />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
