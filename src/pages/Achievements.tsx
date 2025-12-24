import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Trophy, Award, Users, Calendar, MapPin, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAchievementsPageContent, AchievementItem } from '@/hooks/useContent';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Trophy,
  Award,
  Users,
};

const Achievements = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { achievementsPage, loading } = useAchievementsPageContent();

  const title = achievementsPage?.title ?? 'Milestones &';
  const titleHighlight = achievementsPage?.titleHighlight ?? 'Recognitions';
  const subtitle = achievementsPage?.subtitle ?? 'A journey of learning, leadership, and innovation';
  const filters = achievementsPage?.filters ?? ['All', 'Education', 'Awards', 'Certifications', 'Leadership'];
  const milestones = achievementsPage?.milestones ?? [];

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
                {title} <span className="hero-text-gradient">{titleHighlight}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {subtitle}
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
                  const Icon = iconMap[milestone.icon] || Trophy;
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
                                        onClick={() => window.open(url, '_blank')}
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