import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Star,
  Quote,
  Building,
  Mail,
  MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminTestimonials = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp Inc.',
      email: 'sarah@techcorp.com',
      rating: 5,
      category: 'Client',
      content: 'Working with this developer was an exceptional experience. Their technical expertise and attention to detail resulted in a product that exceeded our expectations.',
      featured: true,
      avatar: '/placeholder.svg',
      dateAdded: '2024-01-10'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      role: 'Research Director',
      company: 'AI Research Lab',
      email: 'mchen@ailab.edu',
      rating: 5,
      category: 'Colleague',
      content: 'A brilliant researcher with deep understanding of machine learning concepts. Their contributions to our joint research have been invaluable.',
      featured: true,
      avatar: '/placeholder.svg',
      dateAdded: '2024-01-08'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'Startup Founder',
      company: 'InnovateCo',
      email: 'lisa@innovateco.com',
      rating: 4,
      category: 'Client',
      content: 'Great developer who delivered our MVP on time and within budget. Excellent communication throughout the project.',
      featured: false,
      avatar: '/placeholder.svg',
      dateAdded: '2024-01-05'
    }
  ];

  const stats = [
    { label: 'Total Testimonials', value: 28, change: '+4' },
    { label: 'Featured', value: 12, change: '+2' },
    { label: 'Average Rating', value: 4.8, change: '+0.1' },
    { label: 'This Month', value: 6, change: '+3' }
  ];

  const getCategoryBadge = (category: string) => {
    const variants = {
      Client: 'bg-blue-100 text-blue-800',
      Colleague: 'bg-green-100 text-green-800',
      Mentor: 'bg-purple-100 text-purple-800'
    } as const;
    return (
      <Badge variant="outline" className={variants[category as keyof typeof variants]}>
        {category}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage client and colleague testimonials</p>
        </div>
        <Button asChild>
          <Link to="/admin/testimonials/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.label === 'Average Rating' && <Star className="h-4 w-4 text-yellow-400" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.label === 'Average Rating' ? stat.value.toFixed(1) : stat.value.toLocaleString()}
              </div>
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
                placeholder="Search testimonials..."
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
                <Star className="h-4 w-4 mr-2" />
                Rating
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Testimonials</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="colleagues">Colleagues</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getCategoryBadge(testimonial.category)}
                      {testimonial.featured && (
                        <Badge variant="outline" className="text-xs">Featured</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {testimonial.rating}/5
                    </span>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                      {testimonial.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {testimonial.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Featured testimonials view</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Client testimonials view</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colleagues">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Colleague testimonials view</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTestimonials;