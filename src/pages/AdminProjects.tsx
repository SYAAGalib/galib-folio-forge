import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Globe,
  Calendar,
  Tag,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number | string;
  title: string;
  description: string;
  image: string;
  type: string;
  category: string;
  techStack: string[];
  metrics: string[];
  links: { live?: string; github?: string };
  featured: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const AdminProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const base = (import.meta as any).env.BASE_URL || '/';
        const response = await fetch(`${base}data/site-content.json`);
        const data = await response.json();
        setProjects(data.projectsPage?.projects || []);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Projects', value: projects.length },
    { label: 'Featured', value: projects.filter(p => p.featured).length },
    { label: 'Categories', value: [...new Set(projects.map(p => p.category))].length }
  ];

  const getTypeBadge = (type: string) => {
    const variants = {
      Projects: 'default',
      'Case Studies': 'secondary'
    } as const;
    return <Badge variant={variants[type as keyof typeof variants] || 'outline'}>{type}</Badge>;
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects and case studies</p>
        </div>
        <Button asChild>
          <Link to="/admin/content">
            <Edit className="h-4 w-4 mr-2" />
            Edit in Content Manager
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Tag className="h-4 w-4 mr-2" />
                Category
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects ({filteredProjects.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured ({projects.filter(p => p.featured).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Tech Stack</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{project.title}</div>
                        {project.featured && (
                          <Badge variant="outline" className="text-xs">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(project.type)}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{project.techStack.length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {project.links.live && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" asChild>
                          <Link to="/admin/content">
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="featured">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.filter(p => p.featured).map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="font-medium">{project.title}</div>
                    </TableCell>
                    <TableCell>{getTypeBadge(project.type)}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to="/admin/content">
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProjects;
