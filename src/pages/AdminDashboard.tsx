import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Microscope,
  BookOpen,
  MessageSquare,
  Star,
  Eye,
  Plus,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  projects: number;
  research: number;
  blog: number;
  testimonials: number;
  messages: number;
  unreadMessages: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    research: 0,
    blog: 0,
    testimonials: 0,
    messages: 0,
    unreadMessages: 0
  });

  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    bounceRate: 0
  });

  useEffect(() => {
    // Load content stats
    const loadStats = async () => {
      try {
        const base = (import.meta as any).env.BASE_URL || '/';
        const [contentRes, messagesRes, analyticsRes] = await Promise.all([
          fetch(`${base}data/content.json`),
          fetch(`${base}data/messages.json`),
          fetch(`${base}data/analytics.json`)
        ]);

        const content = await contentRes.json();
        const messages = await messagesRes.json();
        const analyticsData = await analyticsRes.json();

        setStats({
          projects: content.projects?.length || 0,
          research: content.research?.length || 0,
          blog: content.blog?.length || 0,
          testimonials: content.testimonials?.length || 0,
          messages: messages.messages?.length || 0,
          unreadMessages: messages.messages?.filter((m: any) => !m.read).length || 0
        });

        setAnalytics(analyticsData.overview);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadStats();
  }, []);

  const quickActions = [
    { icon: Plus, label: 'New Project', href: '/admin/projects/new', color: 'bg-blue-500' },
    { icon: Plus, label: 'New Research', href: '/admin/research/new', color: 'bg-green-500' },
    { icon: Plus, label: 'New Blog Post', href: '/admin/blog/new', color: 'bg-purple-500' },
    { icon: MessageSquare, label: 'View Messages', href: '/admin/messages', color: 'bg-orange-500' }
  ];

  const statsCards = [
    { icon: FileText, label: 'Projects', value: stats.projects, href: '/admin/projects', color: 'text-blue-600' },
    { icon: Microscope, label: 'Research', value: stats.research, href: '/admin/research', color: 'text-green-600' },
    { icon: BookOpen, label: 'Blog Posts', value: stats.blog, href: '/admin/blog', color: 'text-purple-600' },
    { icon: Star, label: 'Testimonials', value: stats.testimonials, href: '/admin/testimonials', color: 'text-yellow-600' },
    { icon: MessageSquare, label: 'Messages', value: stats.messages, href: '/admin/messages', color: 'text-orange-600', badge: stats.unreadMessages }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalVisits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              -3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <div className="flex items-center gap-2">
                  {stat.badge && stat.badge > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {stat.badge}
                    </Badge>
                  )}
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Link to={stat.href} className="text-xs text-primary hover:underline">
                  View all →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  asChild
                  variant="outline"
                  className="h-24 flex-col gap-2 hover:shadow-md transition-shadow"
                >
                  <Link to={action.href}>
                    <div className={`h-8 w-8 rounded-full ${action.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;