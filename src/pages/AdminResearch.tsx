import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  BookOpen,
  Calendar,
  Users,
  FileText,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Research {
  id: number | string;
  title: string;
  abstract: string;
  image: string;
  category: string;
  tags: string[];
  publication: string;
  year: string;
  authors: string[];
  links: { paper?: string; code?: string; dataset?: string };
  featured: boolean;
}

const AdminResearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResearch = async () => {
      try {
        const base = (import.meta as any).env.BASE_URL || '/';
        const response = await fetch(`${base}data/site-content.json`);
        const data = await response.json();
        setResearch(data.researchPage?.research || []);
      } catch (error) {
        console.error('Error loading research:', error);
      } finally {
        setLoading(false);
      }
    };
    loadResearch();
  }, []);

  const filteredResearch = research.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.abstract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Papers', value: research.length },
    { label: 'Featured', value: research.filter(r => r.featured).length },
    { label: 'Categories', value: [...new Set(research.map(r => r.category))].length }
  ];

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      'AI/ML': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'LLMs': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'NLP': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Computer Vision': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return (
      <Badge variant="outline" className={colors[category] || ''}>
        {category}
      </Badge>
    );
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
          <h1 className="text-3xl font-bold">Research</h1>
          <p className="text-muted-foreground">Manage your research papers and publications</p>
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
                placeholder="Search research papers..."
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
                <BookOpen className="h-4 w-4 mr-2" />
                Category
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Research ({filteredResearch.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured ({research.filter(r => r.featured).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Publication</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Authors</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResearch.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{paper.title}</div>
                        {paper.featured && (
                          <Badge variant="outline" className="text-xs">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(paper.category)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{paper.publication}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {paper.year}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {paper.authors.length}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {paper.links.paper && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={paper.links.paper} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Publication</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {research.filter(r => r.featured).map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>
                      <div className="font-medium">{paper.title}</div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(paper.category)}</TableCell>
                    <TableCell>{paper.publication}</TableCell>
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

export default AdminResearch;
