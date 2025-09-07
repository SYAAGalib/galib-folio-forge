import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Filter,
  Reply,
  Archive,
  Trash2,
  Mail,
  MailOpen,
  Clock,
  Calendar,
  ExternalLink,
  Star,
  MoreHorizontal
} from 'lucide-react';

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      name: 'Emily Carter',
      email: 'emily@example.com',
      subject: 'Collaboration Opportunity',
      message: 'Hi! I came across your portfolio and I\'m impressed by your machine learning projects. We have an exciting opportunity at our startup and would love to discuss a potential collaboration. Are you available for a call this week?',
      isRead: false,
      isStarred: true,
      category: 'Business',
      receivedAt: '2024-01-15T10:30:00Z',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      email: 'j.wilson@university.edu',
      subject: 'Research Partnership Inquiry',
      message: 'Hello, I\'m a professor at XYZ University working on AI ethics research. Your recent paper on responsible AI caught my attention. Would you be interested in collaborating on a new research project? I believe your expertise would be valuable to our team.',
      isRead: true,
      isStarred: false,
      category: 'Academic',
      receivedAt: '2024-01-14T14:15:00Z',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Alex Thompson',
      email: 'alex.t@techcorp.com',
      subject: 'Job Opportunity - Senior ML Engineer',
      message: 'We\'re impressed by your background and would like to discuss a senior machine learning engineer position. The role involves leading AI initiatives and working with cutting-edge technologies. Compensation is competitive. Let me know if you\'re interested!',
      isRead: false,
      isStarred: false,
      category: 'Job Offer',
      receivedAt: '2024-01-13T09:45:00Z',
      avatar: '/placeholder.svg'
    }
  ];

  const stats = [
    { label: 'Total Messages', value: 127, change: '+12' },
    { label: 'Unread', value: 8, change: '+3' },
    { label: 'Starred', value: 15, change: '+2' },
    { label: 'This Week', value: 23, change: '+5' }
  ];

  const getCategoryBadge = (category: string) => {
    const variants = {
      Business: 'bg-blue-100 text-blue-800',
      Academic: 'bg-green-100 text-green-800',
      'Job Offer': 'bg-purple-100 text-purple-800',
      General: 'bg-gray-100 text-gray-800'
    } as const;
    return (
      <Badge variant="outline" className={variants[category as keyof typeof variants] || variants.General}>
        {category}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive All Read
          </Button>
          <Button variant="outline">
            <MailOpen className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.label === 'Unread' && <Mail className="h-4 w-4 text-orange-500" />}
              {stat.label === 'Starred' && <Star className="h-4 w-4 text-yellow-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last week
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
                placeholder="Search messages..."
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
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4">
              {messages.map((message) => (
                <Card 
                  key={message.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage === message.id ? 'ring-2 ring-primary' : ''
                  } ${!message.isRead ? 'bg-blue-50/50' : ''}`}
                  onClick={() => setSelectedMessage(message.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback>
                            {message.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${!message.isRead ? 'text-primary' : ''}`}>
                              {message.name}
                            </h3>
                            {!message.isRead && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                          <div className="flex items-center gap-2">
                            {getCategoryBadge(message.category)}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(message.receivedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {message.isStarred && (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        )}
                        {!message.isRead ? (
                          <Mail className="h-4 w-4 text-blue-500" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className={`font-medium mb-2 ${!message.isRead ? 'text-primary' : ''}`}>
                      {message.subject}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {message.message}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:sticky lg:top-6">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {messages.find(m => m.id === selectedMessage)?.subject}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          From: {messages.find(m => m.id === selectedMessage)?.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm leading-relaxed">
                        {messages.find(m => m.id === selectedMessage)?.message}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Quick Reply</h4>
                      <Textarea placeholder="Type your reply..." />
                      <div className="flex gap-2">
                        <Button>
                          <Reply className="h-4 w-4 mr-2" />
                          Send Reply
                        </Button>
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-muted-foreground">Select a message</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a message from the list to view details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Unread messages view</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="starred">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Starred messages view</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">Archived messages view</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMessages;