import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Trophy, Award, Users, Calendar, MapPin, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Achievements = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Education', 'Awards', 'Certifications', 'Leadership'];

  const milestones = [
    {
      id: 1,
      year: '2024',
      date: 'January 2024',
      title: 'UIHP National Award Winner',
      subtitle: 'Outstanding Innovation in AI Technology',
      type: 'Awards',
      icon: Trophy,
      description: 'Recognized nationally for groundbreaking work on AIELTS platform, achieving 95% accuracy in IELTS score prediction and helping 10,000+ students.',
      organization: 'University Industry Hub Program, Bangladesh',
      location: 'Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=600&h=400&fit=crop',
      links: {
        certificate: '#',
        news: '#'
      }
    },
    {
      id: 2,
      year: '2023',
      date: 'June 2023',
      title: 'Chairman - Intelleeo',
      subtitle: 'Leading Technology Innovation Initiative',
      type: 'Leadership',
      icon: Users,
      description: 'Appointed as Chairman of Intelleeo, spearheading technology initiatives and strategic partnerships in AI and software development.',
      organization: 'Intelleeo Technology Initiative',
      location: 'Khulna, Bangladesh',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      links: {
        website: 'https://intelleeo.com'
      }
    },
    {
      id: 3,
      year: '2023',
      date: 'March 2023',
      title: 'TensorFlow Developer Certification',
      subtitle: 'Advanced Machine Learning Specialization',
      type: 'Certifications',
      icon: Award,
      description: 'Achieved professional certification in TensorFlow development with specialization in deep learning and neural network architectures.',
      organization: 'Google Cloud Platform',
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      links: {
        certificate: 'https://certificates.google.com/tensorflow-dev',
        verify: '#'
      }
    },
    {
      id: 4,
      year: '2022',
      date: 'December 2022',
      title: 'Best Paper Award - EMNLP 2022',
      subtitle: 'Excellence in NLP Research',
      type: 'Awards',
      icon: Trophy,
      description: 'Awarded Best Paper for research on "Bengali Language Processing with Large Language Models" at the premier NLP conference.',
      organization: 'Association for Computational Linguistics',
      location: 'Abu Dhabi, UAE',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
      links: {
        paper: 'https://aclanthology.org/2022.emnlp-main.bengali',
        award: '#'
      }
    },
    {
      id: 5,
      year: '2021',
      date: 'July 2021',
      title: 'B.Sc. in Computer Science & Engineering',
      subtitle: 'Northern University of Business & Technology',
      type: 'Education',
      icon: GraduationCap,
      description: 'Graduated with First Class Honors. Class Representative for 2 years. Led multiple student innovation projects and research initiatives.',
      organization: 'NUBT Khulna',
      location: 'Khulna, Bangladesh',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
      links: {
        transcript: '#',
        university: 'https://nubtkhulna.ac.bd'
      }
    },
    {
      id: 6,
      year: '2021',
      date: 'May 2021',
      title: 'Class Representative Excellence Award',
      subtitle: 'Outstanding Leadership in Student Affairs',
      type: 'Leadership',
      icon: Users,
      description: 'Recognized for exceptional leadership as Class Representative, organizing academic events and representing student interests.',
      organization: 'NUBT Khulna',
      location: 'Khulna, Bangladesh',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      links: {
        certificate: '#'
      }
    },
    {
      id: 7,
      year: '2023',
      date: 'September 2023',
      title: 'AWS Solutions Architect Professional',
      subtitle: 'Cloud Architecture Certification',
      type: 'Certifications',
      icon: Award,
      description: 'Advanced certification in designing distributed systems and scalable applications on Amazon Web Services platform.',
      organization: 'Amazon Web Services',
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      links: {
        certificate: 'https://aws.amazon.com/certification/certified-solutions-architect-professional',
        verify: '#'
      }
    },
    {
      id: 8,
      year: '2024',
      date: 'March 2024',
      title: 'Tech Innovation Award',
      subtitle: 'Startup Excellence Recognition',
      type: 'Awards',
      icon: Trophy,
      description: 'Recognized for innovative contributions to AI education technology and successful scaling of AIELTS platform.',
      organization: 'Bangladesh Startup Summit',
      location: 'Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop',
      links: {
        award: '#',
        summit: '#'
      }
    }
  ];

  const filteredMilestones = milestones.filter(milestone => 
    selectedFilter === 'All' || milestone.type === selectedFilter
  );

  const getIconColor = (type: string) => {
    switch (type) {
      case 'Education': return 'text-blue-600';
      case 'Awards': return 'text-yellow-600';
      case 'Certifications': return 'text-green-600';
      case 'Leadership': return 'text-purple-600';
      default: return 'text-primary';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Education': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Awards': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Certifications': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Leadership': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return '';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold">
                Milestones & <span className="hero-text-gradient">Recognitions</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A journey of learning, leadership, and innovation
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background sticky top-16 z-40 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "btn-hero" : ""}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-primary rounded-full"></div>

              <div className="space-y-12">
                {filteredMilestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div
                      key={milestone.id}
                      className={`relative flex items-center ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      } animate-fade-in-up`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-primary rounded-full border-4 border-background z-10 animate-pulse-glow"></div>

                      {/* Year Badge */}
                      <div className="absolute left-16 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-8">
                        <Badge variant="secondary" className="bg-background shadow-medium border">
                          {milestone.year}
                        </Badge>
                      </div>

                      {/* Content Card */}
                      <div className={`w-full md:w-5/12 ml-24 md:ml-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                        <Card className="card-elevated overflow-hidden group cursor-pointer">
                          <div className="grid md:grid-cols-2 gap-0">
                            <div className={`relative h-48 md:h-auto ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                              <img
                                src={milestone.image}
                                alt={milestone.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                              <div className="absolute top-4 left-4">
                                <Badge className={getBadgeColor(milestone.type)}>
                                  {milestone.type}
                                </Badge>
                              </div>
                            </div>
                            
                            <CardContent className={`p-6 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0`}>
                                    <Icon className="w-5 h-5 text-primary-foreground" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold line-clamp-1">
                                      {milestone.title}
                                    </h3>
                                    <p className="text-sm text-primary font-medium">
                                      {milestone.subtitle}
                                    </p>
                                  </div>
                                </div>

                                <p className="text-muted-foreground text-sm line-clamp-3">
                                  {milestone.description}
                                </p>

                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    {milestone.date}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    {milestone.organization}
                                  </div>
                                </div>

                                {milestone.links && Object.keys(milestone.links).length > 0 && (
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {Object.entries(milestone.links).map(([key, url]) => (
                                      <Button
                                        key={key}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs capitalize"
                                      >
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        {key}
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Achievements;