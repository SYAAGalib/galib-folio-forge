import { useState } from 'react';
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
  Download,
  BookOpen,
  Calendar,
  Users,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminResearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const research = [
    {
      id: 1,
      title: 'Deep Learning Applications in Computer Vision',
      status: 'published',
      type: 'Journal Article',
      citations: 45,
      downloads: 320,
      coAuthors: 3,
      publishedDate: '2023-12-15',
      journal: 'IEEE Transactions on AI'
    },
    {
      id: 2,
      title: 'Quantum Computing and Machine Learning Convergence',
      status: 'under-review',
      type: 'Conference Paper',
      citations: 0,
      downloads: 0,
      coAuthors: 2,
      publishedDate: null,
      journal: 'NeurIPS 2024'
    },
    {
      id: 3,
      title: 'Ethical AI in Healthcare Systems',
      status: 'draft',
      type: 'Review Paper',
      citations: 0,
      downloads: 0,
      coAuthors: 4,
      publishedDate: null,
      journal: 'Nature Medicine'
    }
  ];

  const stats = [
    { label: 'Total Papers', value: 24, change: '+3' },
    { label: 'Published', value: 18, change: '+2' },
    { label: 'Citations', value: 342, change: '+28' },
    { label: 'Downloads', value: 1540, change: '+15%' }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'default',
      'under-review': 'secondary',
      draft: 'outline'
    } as const;
    return <Badge variant={variants[status as keyof typeof variants]}>{status.replace('-', ' ')}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Journal Article': 'bg-blue-100 text-blue-800',
      'Conference Paper': 'bg-green-100 text-green-800',
      'Review Paper': 'bg-purple-100 text-purple-800'
    } as const;
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Research</h1>
          <p className="text-muted-foreground">Manage your research papers and publications</p>
        </div>
        <Button asChild>
          <Link to="/admin/research/new">
            <Plus className="h-4 w-4 mr-2" />
            New Research
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.label === 'Citations' && <FileText className="h-4 w-4 text-muted-foreground" />}
              {stat.label === 'Downloads' && <Download className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
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
                Type
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Research</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="under-review">Under Review</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Journal/Conference</TableHead>
                  <TableHead>Citations</TableHead>
                  <TableHead>Co-Authors</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {research.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{paper.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {paper.downloads} downloads
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(paper.status)}</TableCell>
                    <TableCell>{getTypeBadge(paper.type)}</TableCell>
                    <TableCell>{paper.journal}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {paper.citations}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {paper.coAuthors}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {paper.publishedDate || 'TBD'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="published">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Published research papers</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="under-review">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Papers under review</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Draft research papers</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminResearch;