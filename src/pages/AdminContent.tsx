import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Save, Plus, Trash2, RefreshCw } from 'lucide-react';
import { 
  useSiteContent, 
  SiteContent, 
  HeroContent, 
  AboutContent, 
  StatItem,
  FeaturedProjectsContent,
  FeaturedResearchContent,
  TestimonialsContent,
  CallToActionContent,
  FooterContent,
  BusinessCardContent
} from '@/hooks/useContent';

const AdminContent = () => {
  const { content, loading, error, updateContent, refetch } = useSiteContent();
  const [editedContent, setEditedContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setEditedContent(content);
    }
  }, [content]);

  const handleSave = async () => {
    if (!editedContent) return;
    setSaving(true);
    try {
      await updateContent(editedContent);
      toast.success('Content saved successfully!');
    } catch (err) {
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof SiteContent>(
    section: K,
    field: string,
    value: any
  ) => {
    if (!editedContent) return;
    setEditedContent({
      ...editedContent,
      [section]: {
        ...editedContent[section],
        [field]: value,
      },
    });
  };

  const updateNestedField = <K extends keyof SiteContent>(
    section: K,
    path: string[],
    value: any
  ) => {
    if (!editedContent) return;
    const newContent = { ...editedContent };
    let current: any = newContent[section];
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setEditedContent(newContent);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !editedContent) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Failed to load content: {error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Edit all website content from here</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="btn-hero">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About Home</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="projects">Featured Projects</TabsTrigger>
          <TabsTrigger value="research">Featured Research</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="aboutPage">About Page</TabsTrigger>
          <TabsTrigger value="projectsPage">Projects Page</TabsTrigger>
          <TabsTrigger value="researchPage">Research Page</TabsTrigger>
          <TabsTrigger value="blogPage">Blog Page</TabsTrigger>
          <TabsTrigger value="contactPage">Contact Page</TabsTrigger>
          <TabsTrigger value="achievementsPage">Achievements</TabsTrigger>
          <TabsTrigger value="galleryPage">Gallery</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={editedContent.hero.firstName}
                    onChange={(e) => updateField('hero', 'firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={editedContent.hero.lastName}
                    onChange={(e) => updateField('hero', 'lastName', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>Roles (comma separated)</Label>
                <Input
                  value={editedContent.hero.roles.join(', ')}
                  onChange={(e) => updateField('hero', 'roles', e.target.value.split(', '))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary CTA Text</Label>
                  <Input
                    value={editedContent.hero.ctaButtons.primary.text}
                    onChange={(e) => updateNestedField('hero', ['ctaButtons', 'primary', 'text'], e.target.value)}
                  />
                </div>
                <div>
                  <Label>Primary CTA Link</Label>
                  <Input
                    value={editedContent.hero.ctaButtons.primary.link}
                    onChange={(e) => updateNestedField('hero', ['ctaButtons', 'primary', 'link'], e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Secondary CTA Text</Label>
                  <Input
                    value={editedContent.hero.ctaButtons.secondary.text}
                    onChange={(e) => updateNestedField('hero', ['ctaButtons', 'secondary', 'text'], e.target.value)}
                  />
                </div>
                <div>
                  <Label>Secondary CTA Link</Label>
                  <Input
                    value={editedContent.hero.ctaButtons.secondary.link}
                    onChange={(e) => updateNestedField('hero', ['ctaButtons', 'secondary', 'link'], e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Social Links</Label>
                {editedContent.hero.socialLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 mt-2">
                    <Input
                      placeholder="Platform"
                      value={link.platform}
                      onChange={(e) => {
                        const newLinks = [...editedContent.hero.socialLinks];
                        newLinks[index] = { ...newLinks[index], platform: e.target.value };
                        updateField('hero', 'socialLinks', newLinks);
                      }}
                    />
                    <Input
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...editedContent.hero.socialLinks];
                        newLinks[index] = { ...newLinks[index], url: e.target.value };
                        updateField('hero', 'socialLinks', newLinks);
                      }}
                    />
                    <Input
                      placeholder="Label"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...editedContent.hero.socialLinks];
                        newLinks[index] = { ...newLinks[index], label: e.target.value };
                        updateField('hero', 'socialLinks', newLinks);
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editedContent.about.title}
                    onChange={(e) => updateField('about', 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Title Highlight</Label>
                  <Input
                    value={editedContent.about.titleHighlight}
                    onChange={(e) => updateField('about', 'titleHighlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Paragraphs</Label>
                {editedContent.about.paragraphs.map((para, index) => (
                  <div key={index} className="mt-2">
                    <Textarea
                      value={para}
                      onChange={(e) => {
                        const newParagraphs = [...editedContent.about.paragraphs];
                        newParagraphs[index] = e.target.value;
                        updateField('about', 'paragraphs', newParagraphs);
                      }}
                      rows={3}
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    updateField('about', 'paragraphs', [...editedContent.about.paragraphs, '']);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Paragraph
                </Button>
              </div>

              <div>
                <Label>Skills</Label>
                {editedContent.about.skills.map((skill, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 mt-2">
                    <Input
                      placeholder="Icon"
                      value={skill.icon}
                      onChange={(e) => {
                        const newSkills = [...editedContent.about.skills];
                        newSkills[index] = { ...newSkills[index], icon: e.target.value };
                        updateField('about', 'skills', newSkills);
                      }}
                    />
                    <Input
                      placeholder="Label"
                      value={skill.label}
                      onChange={(e) => {
                        const newSkills = [...editedContent.about.skills];
                        newSkills[index] = { ...newSkills[index], label: e.target.value };
                        updateField('about', 'skills', newSkills);
                      }}
                    />
                    <Input
                      placeholder="Description"
                      value={skill.description}
                      onChange={(e) => {
                        const newSkills = [...editedContent.about.skills];
                        newSkills[index] = { ...newSkills[index], description: e.target.value };
                        updateField('about', 'skills', newSkills);
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newSkills = editedContent.about.skills.filter((_, i) => i !== index);
                        updateField('about', 'skills', newSkills);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Section */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Stats Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 items-end">
                  <div>
                    <Label>Icon</Label>
                    <Input
                      value={stat.icon}
                      onChange={(e) => {
                        const newStats = [...editedContent.stats];
                        newStats[index] = { ...newStats[index], icon: e.target.value };
                        setEditedContent({ ...editedContent, stats: newStats });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      type="number"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...editedContent.stats];
                        newStats[index] = { ...newStats[index], value: parseFloat(e.target.value) };
                        setEditedContent({ ...editedContent, stats: newStats });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Suffix</Label>
                    <Input
                      value={stat.suffix}
                      onChange={(e) => {
                        const newStats = [...editedContent.stats];
                        newStats[index] = { ...newStats[index], suffix: e.target.value };
                        setEditedContent({ ...editedContent, stats: newStats });
                      }}
                    />
                  </div>
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...editedContent.stats];
                        newStats[index] = { ...newStats[index], label: e.target.value };
                        setEditedContent({ ...editedContent, stats: newStats });
                      }}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newStats = editedContent.stats.filter((_, i) => i !== index);
                      setEditedContent({ ...editedContent, stats: newStats });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setEditedContent({
                    ...editedContent,
                    stats: [...editedContent.stats, { icon: 'Star', value: 0, suffix: '', label: 'New Stat' }]
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Stat
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Section */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Featured Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={editedContent.featuredProjects.title}
                    onChange={(e) => updateField('featuredProjects', 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Title Highlight</Label>
                  <Input
                    value={editedContent.featuredProjects.titleHighlight}
                    onChange={(e) => updateField('featuredProjects', 'titleHighlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Subtitle</Label>
                <Input
                  value={editedContent.featuredProjects.subtitle}
                  onChange={(e) => updateField('featuredProjects', 'subtitle', e.target.value)}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Hero Project</h4>
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editedContent.featuredProjects.heroProject.title}
                      onChange={(e) => updateNestedField('featuredProjects', ['heroProject', 'title'], e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editedContent.featuredProjects.heroProject.description}
                      onChange={(e) => updateNestedField('featuredProjects', ['heroProject', 'description'], e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Live URL</Label>
                      <Input
                        value={editedContent.featuredProjects.heroProject.liveUrl}
                        onChange={(e) => updateNestedField('featuredProjects', ['heroProject', 'liveUrl'], e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>GitHub URL</Label>
                      <Input
                        value={editedContent.featuredProjects.heroProject.githubUrl}
                        onChange={(e) => updateNestedField('featuredProjects', ['heroProject', 'githubUrl'], e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Metrics (comma separated)</Label>
                    <Input
                      value={editedContent.featuredProjects.heroProject.metrics.join(', ')}
                      onChange={(e) => updateNestedField('featuredProjects', ['heroProject', 'metrics'], e.target.value.split(', '))}
                    />
                  </div>
                  <div>
                    <Label>Tech Stack (comma separated)</Label>
                    <Input
                      value={editedContent.featuredProjects.heroProject.techStack.join(', ')}
                      onChange={(e) => updateNestedField('featuredProjects', ['heroProject', 'techStack'], e.target.value.split(', '))}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Secondary Projects</h4>
                {editedContent.featuredProjects.secondaryProjects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Project {index + 1}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newProjects = editedContent.featuredProjects.secondaryProjects.filter((_, i) => i !== index);
                          updateField('featuredProjects', 'secondaryProjects', newProjects);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Title"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...editedContent.featuredProjects.secondaryProjects];
                          newProjects[index] = { ...newProjects[index], title: e.target.value };
                          updateField('featuredProjects', 'secondaryProjects', newProjects);
                        }}
                      />
                      <Textarea
                        placeholder="Description"
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...editedContent.featuredProjects.secondaryProjects];
                          newProjects[index] = { ...newProjects[index], description: e.target.value };
                          updateField('featuredProjects', 'secondaryProjects', newProjects);
                        }}
                      />
                      <Input
                        placeholder="Tech Stack (comma separated)"
                        value={project.techStack.join(', ')}
                        onChange={(e) => {
                          const newProjects = [...editedContent.featuredProjects.secondaryProjects];
                          newProjects[index] = { ...newProjects[index], techStack: e.target.value.split(', ') };
                          updateField('featuredProjects', 'secondaryProjects', newProjects);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    updateField('featuredProjects', 'secondaryProjects', [
                      ...editedContent.featuredProjects.secondaryProjects,
                      { id: Date.now().toString(), title: '', description: '', techStack: [] }
                    ]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Section */}
        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Featured Research</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={editedContent.featuredResearch.title}
                    onChange={(e) => updateField('featuredResearch', 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Title Highlight</Label>
                  <Input
                    value={editedContent.featuredResearch.titleHighlight}
                    onChange={(e) => updateField('featuredResearch', 'titleHighlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Subtitle</Label>
                <Input
                  value={editedContent.featuredResearch.subtitle}
                  onChange={(e) => updateField('featuredResearch', 'subtitle', e.target.value)}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Hero Research</h4>
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editedContent.featuredResearch.heroResearch.title}
                      onChange={(e) => updateNestedField('featuredResearch', ['heroResearch', 'title'], e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editedContent.featuredResearch.heroResearch.description}
                      onChange={(e) => updateNestedField('featuredResearch', ['heroResearch', 'description'], e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Publication</Label>
                    <Input
                      value={editedContent.featuredResearch.heroResearch.publication}
                      onChange={(e) => updateNestedField('featuredResearch', ['heroResearch', 'publication'], e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Paper URL</Label>
                      <Input
                        value={editedContent.featuredResearch.heroResearch.paperUrl}
                        onChange={(e) => updateNestedField('featuredResearch', ['heroResearch', 'paperUrl'], e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Code URL</Label>
                      <Input
                        value={editedContent.featuredResearch.heroResearch.codeUrl}
                        onChange={(e) => updateNestedField('featuredResearch', ['heroResearch', 'codeUrl'], e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Tags (comma separated)</Label>
                    <Input
                      value={editedContent.featuredResearch.heroResearch.tags.join(', ')}
                      onChange={(e) => updateNestedField('featuredResearch', ['heroResearch', 'tags'], e.target.value.split(', '))}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Secondary Research</h4>
                {editedContent.featuredResearch.secondaryResearch.map((research, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Research {index + 1}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newResearch = editedContent.featuredResearch.secondaryResearch.filter((_, i) => i !== index);
                          updateField('featuredResearch', 'secondaryResearch', newResearch);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Title"
                        value={research.title}
                        onChange={(e) => {
                          const newResearch = [...editedContent.featuredResearch.secondaryResearch];
                          newResearch[index] = { ...newResearch[index], title: e.target.value };
                          updateField('featuredResearch', 'secondaryResearch', newResearch);
                        }}
                      />
                      <Textarea
                        placeholder="Description"
                        value={research.description}
                        onChange={(e) => {
                          const newResearch = [...editedContent.featuredResearch.secondaryResearch];
                          newResearch[index] = { ...newResearch[index], description: e.target.value };
                          updateField('featuredResearch', 'secondaryResearch', newResearch);
                        }}
                      />
                      <Input
                        placeholder="Tags (comma separated)"
                        value={research.tags.join(', ')}
                        onChange={(e) => {
                          const newResearch = [...editedContent.featuredResearch.secondaryResearch];
                          newResearch[index] = { ...newResearch[index], tags: e.target.value.split(', ') };
                          updateField('featuredResearch', 'secondaryResearch', newResearch);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    updateField('featuredResearch', 'secondaryResearch', [
                      ...editedContent.featuredResearch.secondaryResearch,
                      { id: Date.now().toString(), title: '', description: '', tags: [] }
                    ]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Research
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Section */}
        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={editedContent.testimonials.title}
                    onChange={(e) => updateField('testimonials', 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Title Highlight</Label>
                  <Input
                    value={editedContent.testimonials.titleHighlight}
                    onChange={(e) => updateField('testimonials', 'titleHighlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Subtitle</Label>
                <Input
                  value={editedContent.testimonials.subtitle}
                  onChange={(e) => updateField('testimonials', 'subtitle', e.target.value)}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Testimonial Items</h4>
                {editedContent.testimonials.items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.name || `Testimonial ${index + 1}`}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newItems = editedContent.testimonials.items.filter((_, i) => i !== index);
                          updateField('testimonials', 'items', newItems);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => {
                            const newItems = [...editedContent.testimonials.items];
                            newItems[index] = { ...newItems[index], name: e.target.value };
                            updateField('testimonials', 'items', newItems);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input
                          value={item.role}
                          onChange={(e) => {
                            const newItems = [...editedContent.testimonials.items];
                            newItems[index] = { ...newItems[index], role: e.target.value };
                            updateField('testimonials', 'items', newItems);
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <Label>Organization</Label>
                        <Input
                          value={item.organization}
                          onChange={(e) => {
                            const newItems = [...editedContent.testimonials.items];
                            newItems[index] = { ...newItems[index], organization: e.target.value };
                            updateField('testimonials', 'items', newItems);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Avatar URL</Label>
                        <Input
                          value={item.avatar}
                          onChange={(e) => {
                            const newItems = [...editedContent.testimonials.items];
                            newItems[index] = { ...newItems[index], avatar: e.target.value };
                            updateField('testimonials', 'items', newItems);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={item.content}
                        onChange={(e) => {
                          const newItems = [...editedContent.testimonials.items];
                          newItems[index] = { ...newItems[index], content: e.target.value };
                          updateField('testimonials', 'items', newItems);
                        }}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    updateField('testimonials', 'items', [
                      ...editedContent.testimonials.items,
                      { id: Date.now().toString(), name: '', role: '', organization: '', avatar: '', content: '' }
                    ]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA Section */}
        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle>Call to Action Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editedContent.callToAction.title}
                    onChange={(e) => updateField('callToAction', 'title', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Title Highlight</Label>
                  <Input
                    value={editedContent.callToAction.titleHighlight}
                    onChange={(e) => updateField('callToAction', 'titleHighlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Subtitle</Label>
                <Textarea
                  value={editedContent.callToAction.subtitle}
                  onChange={(e) => updateField('callToAction', 'subtitle', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary CTA Text</Label>
                  <Input
                    value={editedContent.callToAction.ctaButtons.primary.text}
                    onChange={(e) => updateNestedField('callToAction', ['ctaButtons', 'primary', 'text'], e.target.value)}
                  />
                </div>
                <div>
                  <Label>Primary CTA Link</Label>
                  <Input
                    value={editedContent.callToAction.ctaButtons.primary.link}
                    onChange={(e) => updateNestedField('callToAction', ['ctaButtons', 'primary', 'link'], e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Stats</Label>
                {editedContent.callToAction.stats.map((stat, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 mt-2">
                    <Input
                      placeholder="Value"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...editedContent.callToAction.stats];
                        newStats[index] = { ...newStats[index], value: e.target.value };
                        updateField('callToAction', 'stats', newStats);
                      }}
                    />
                    <Input
                      placeholder="Label"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...editedContent.callToAction.stats];
                        newStats[index] = { ...newStats[index], label: e.target.value };
                        updateField('callToAction', 'stats', newStats);
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newStats = editedContent.callToAction.stats.filter((_, i) => i !== index);
                        updateField('callToAction', 'stats', newStats);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Section */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tagline</Label>
                <Input
                  value={editedContent.footer.brand.tagline}
                  onChange={(e) => updateNestedField('footer', ['brand', 'tagline'], e.target.value)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={editedContent.footer.brand.description}
                  onChange={(e) => updateNestedField('footer', ['brand', 'description'], e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Copyright Name</Label>
                  <Input
                    value={editedContent.footer.copyright}
                    onChange={(e) => updateField('footer', 'copyright', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Made In</Label>
                  <Input
                    value={editedContent.footer.madeIn}
                    onChange={(e) => updateField('footer', 'madeIn', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Quick Links</Label>
                {editedContent.footer.quickLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 mt-2">
                    <Input
                      placeholder="Label"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...editedContent.footer.quickLinks];
                        newLinks[index] = { ...newLinks[index], label: e.target.value };
                        updateField('footer', 'quickLinks', newLinks);
                      }}
                    />
                    <Input
                      placeholder="Href"
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...editedContent.footer.quickLinks];
                        newLinks[index] = { ...newLinks[index], href: e.target.value };
                        updateField('footer', 'quickLinks', newLinks);
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newLinks = editedContent.footer.quickLinks.filter((_, i) => i !== index);
                        updateField('footer', 'quickLinks', newLinks);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    updateField('footer', 'quickLinks', [...editedContent.footer.quickLinks, { label: '', href: '' }]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Page */}
        <TabsContent value="aboutPage">
          <Card>
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.aboutPage && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={editedContent.aboutPage.name}
                        onChange={(e) => updateField('aboutPage', 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={editedContent.aboutPage.fullName}
                        onChange={(e) => updateField('aboutPage', 'fullName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editedContent.aboutPage.title}
                      onChange={(e) => updateField('aboutPage', 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Paragraphs</Label>
                    {editedContent.aboutPage.paragraphs.map((para, index) => (
                      <div key={index} className="mt-2 flex gap-2">
                        <Textarea
                          value={para}
                          onChange={(e) => {
                            const newParagraphs = [...editedContent.aboutPage!.paragraphs];
                            newParagraphs[index] = e.target.value;
                            updateField('aboutPage', 'paragraphs', newParagraphs);
                          }}
                          rows={2}
                          className="flex-1"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newParagraphs = editedContent.aboutPage!.paragraphs.filter((_, i) => i !== index);
                            updateField('aboutPage', 'paragraphs', newParagraphs);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        updateField('aboutPage', 'paragraphs', [...editedContent.aboutPage!.paragraphs, '']);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Paragraph
                    </Button>
                  </div>
                  <div>
                    <Label>Workflow Phases (comma separated)</Label>
                    <Textarea
                      value={editedContent.aboutPage.workflowPhases.join(', ')}
                      onChange={(e) => updateField('aboutPage', 'workflowPhases', e.target.value.split(', '))}
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Page */}
        <TabsContent value="projectsPage">
          <Card>
            <CardHeader>
              <CardTitle>Projects Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.projectsPage && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editedContent.projectsPage.title}
                        onChange={(e) => updateField('projectsPage', 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title Highlight</Label>
                      <Input
                        value={editedContent.projectsPage.titleHighlight}
                        onChange={(e) => updateField('projectsPage', 'titleHighlight', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={editedContent.projectsPage.subtitle}
                      onChange={(e) => updateField('projectsPage', 'subtitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Filters (comma separated)</Label>
                    <Input
                      value={editedContent.projectsPage.filters.join(', ')}
                      onChange={(e) => updateField('projectsPage', 'filters', e.target.value.split(', '))}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Projects ({editedContent.projectsPage.projects.length})</h4>
                    {editedContent.projectsPage.projects.map((project, index) => (
                      <div key={project.id} className="border rounded-lg p-4 mb-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">Project #{index + 1}</h5>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newProjects = editedContent.projectsPage!.projects.filter((_, i) => i !== index);
                              updateField('projectsPage', 'projects', newProjects);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Title"
                            value={project.title}
                            onChange={(e) => {
                              const newProjects = [...editedContent.projectsPage!.projects];
                              newProjects[index] = { ...newProjects[index], title: e.target.value };
                              updateField('projectsPage', 'projects', newProjects);
                            }}
                          />
                          <Input
                            placeholder="Category"
                            value={project.category}
                            onChange={(e) => {
                              const newProjects = [...editedContent.projectsPage!.projects];
                              newProjects[index] = { ...newProjects[index], category: e.target.value };
                              updateField('projectsPage', 'projects', newProjects);
                            }}
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...editedContent.projectsPage!.projects];
                            newProjects[index] = { ...newProjects[index], description: e.target.value };
                            updateField('projectsPage', 'projects', newProjects);
                          }}
                          rows={2}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Live URL"
                            value={project.links.live}
                            onChange={(e) => {
                              const newProjects = [...editedContent.projectsPage!.projects];
                              newProjects[index] = { ...newProjects[index], links: { ...newProjects[index].links, live: e.target.value } };
                              updateField('projectsPage', 'projects', newProjects);
                            }}
                          />
                          <Input
                            placeholder="GitHub URL"
                            value={project.links.github}
                            onChange={(e) => {
                              const newProjects = [...editedContent.projectsPage!.projects];
                              newProjects[index] = { ...newProjects[index], links: { ...newProjects[index].links, github: e.target.value } };
                              updateField('projectsPage', 'projects', newProjects);
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) => {
                              const newProjects = [...editedContent.projectsPage!.projects];
                              newProjects[index] = { ...newProjects[index], featured: e.target.checked };
                              updateField('projectsPage', 'projects', newProjects);
                            }}
                          />
                          <Label>Featured</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Page */}
        <TabsContent value="researchPage">
          <Card>
            <CardHeader>
              <CardTitle>Research Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.researchPage && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editedContent.researchPage.title}
                        onChange={(e) => updateField('researchPage', 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title Highlight</Label>
                      <Input
                        value={editedContent.researchPage.titleHighlight}
                        onChange={(e) => updateField('researchPage', 'titleHighlight', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={editedContent.researchPage.subtitle}
                      onChange={(e) => updateField('researchPage', 'subtitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Filters (comma separated)</Label>
                    <Input
                      value={editedContent.researchPage.filters.join(', ')}
                      onChange={(e) => updateField('researchPage', 'filters', e.target.value.split(', '))}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Research Items ({editedContent.researchPage.research.length})</h4>
                    {editedContent.researchPage.research.map((item, index) => (
                      <div key={item.id} className="border rounded-lg p-4 mb-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">Research #{index + 1}</h5>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newResearch = editedContent.researchPage!.research.filter((_, i) => i !== index);
                              updateField('researchPage', 'research', newResearch);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Title"
                          value={item.title}
                          onChange={(e) => {
                            const newResearch = [...editedContent.researchPage!.research];
                            newResearch[index] = { ...newResearch[index], title: e.target.value };
                            updateField('researchPage', 'research', newResearch);
                          }}
                        />
                        <Textarea
                          placeholder="Abstract"
                          value={item.abstract}
                          onChange={(e) => {
                            const newResearch = [...editedContent.researchPage!.research];
                            newResearch[index] = { ...newResearch[index], abstract: e.target.value };
                            updateField('researchPage', 'research', newResearch);
                          }}
                          rows={2}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Publication"
                            value={item.publication}
                            onChange={(e) => {
                              const newResearch = [...editedContent.researchPage!.research];
                              newResearch[index] = { ...newResearch[index], publication: e.target.value };
                              updateField('researchPage', 'research', newResearch);
                            }}
                          />
                          <Input
                            placeholder="Year"
                            value={item.year}
                            onChange={(e) => {
                              const newResearch = [...editedContent.researchPage!.research];
                              newResearch[index] = { ...newResearch[index], year: e.target.value };
                              updateField('researchPage', 'research', newResearch);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blog Page */}
        <TabsContent value="blogPage">
          <Card>
            <CardHeader>
              <CardTitle>Blog Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.blogPage && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editedContent.blogPage.title}
                        onChange={(e) => updateField('blogPage', 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title Highlight</Label>
                      <Input
                        value={editedContent.blogPage.titleHighlight}
                        onChange={(e) => updateField('blogPage', 'titleHighlight', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={editedContent.blogPage.subtitle}
                      onChange={(e) => updateField('blogPage', 'subtitle', e.target.value)}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Blog Posts ({editedContent.blogPage.posts.length})</h4>
                    {editedContent.blogPage.posts.map((post, index) => (
                      <div key={post.id} className="border rounded-lg p-4 mb-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">Post #{index + 1}</h5>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newPosts = editedContent.blogPage!.posts.filter((_, i) => i !== index);
                              updateField('blogPage', 'posts', newPosts);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Title"
                          value={post.title}
                          onChange={(e) => {
                            const newPosts = [...editedContent.blogPage!.posts];
                            newPosts[index] = { ...newPosts[index], title: e.target.value };
                            updateField('blogPage', 'posts', newPosts);
                          }}
                        />
                        <Textarea
                          placeholder="Excerpt"
                          value={post.excerpt}
                          onChange={(e) => {
                            const newPosts = [...editedContent.blogPage!.posts];
                            newPosts[index] = { ...newPosts[index], excerpt: e.target.value };
                            updateField('blogPage', 'posts', newPosts);
                          }}
                          rows={2}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Date"
                            value={post.date}
                            onChange={(e) => {
                              const newPosts = [...editedContent.blogPage!.posts];
                              newPosts[index] = { ...newPosts[index], date: e.target.value };
                              updateField('blogPage', 'posts', newPosts);
                            }}
                          />
                          <Input
                            placeholder="Read Time"
                            value={post.readTime}
                            onChange={(e) => {
                              const newPosts = [...editedContent.blogPage!.posts];
                              newPosts[index] = { ...newPosts[index], readTime: e.target.value };
                              updateField('blogPage', 'posts', newPosts);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Page */}
        <TabsContent value="contactPage">
          <Card>
            <CardHeader>
              <CardTitle>Contact Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.contactPage && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editedContent.contactPage.title}
                        onChange={(e) => updateField('contactPage', 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title Highlight</Label>
                      <Input
                        value={editedContent.contactPage.titleHighlight}
                        onChange={(e) => updateField('contactPage', 'titleHighlight', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Textarea
                      value={editedContent.contactPage.subtitle}
                      onChange={(e) => updateField('contactPage', 'subtitle', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Form Labels</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name Label</Label>
                        <Input
                          value={editedContent.contactPage.formLabels.name}
                          onChange={(e) => updateNestedField('contactPage', ['formLabels', 'name'], e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Email Label</Label>
                        <Input
                          value={editedContent.contactPage.formLabels.email}
                          onChange={(e) => updateNestedField('contactPage', ['formLabels', 'email'], e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Subject Label</Label>
                        <Input
                          value={editedContent.contactPage.formLabels.subject}
                          onChange={(e) => updateNestedField('contactPage', ['formLabels', 'subject'], e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Message Label</Label>
                        <Input
                          value={editedContent.contactPage.formLabels.message}
                          onChange={(e) => updateNestedField('contactPage', ['formLabels', 'message'], e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Submit Button Text</Label>
                        <Input
                          value={editedContent.contactPage.formLabels.submit}
                          onChange={(e) => updateNestedField('contactPage', ['formLabels', 'submit'], e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Page */}
        <TabsContent value="achievementsPage">
          <Card>
            <CardHeader>
              <CardTitle>Achievements Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.achievementsPage && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editedContent.achievementsPage.title}
                        onChange={(e) => updateField('achievementsPage', 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title Highlight</Label>
                      <Input
                        value={editedContent.achievementsPage.titleHighlight}
                        onChange={(e) => updateField('achievementsPage', 'titleHighlight', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={editedContent.achievementsPage.subtitle}
                      onChange={(e) => updateField('achievementsPage', 'subtitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Filters (comma separated)</Label>
                    <Input
                      value={editedContent.achievementsPage.filters.join(', ')}
                      onChange={(e) => updateField('achievementsPage', 'filters', e.target.value.split(', '))}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Milestones ({editedContent.achievementsPage.milestones.length})</h4>
                    {editedContent.achievementsPage.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="border rounded-lg p-4 mb-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">Milestone #{index + 1}</h5>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newMilestones = editedContent.achievementsPage!.milestones.filter((_, i) => i !== index);
                              updateField('achievementsPage', 'milestones', newMilestones);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Title"
                            value={milestone.title}
                            onChange={(e) => {
                              const newMilestones = [...editedContent.achievementsPage!.milestones];
                              newMilestones[index] = { ...newMilestones[index], title: e.target.value };
                              updateField('achievementsPage', 'milestones', newMilestones);
                            }}
                          />
                          <Input
                            placeholder="Subtitle"
                            value={milestone.subtitle}
                            onChange={(e) => {
                              const newMilestones = [...editedContent.achievementsPage!.milestones];
                              newMilestones[index] = { ...newMilestones[index], subtitle: e.target.value };
                              updateField('achievementsPage', 'milestones', newMilestones);
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Year"
                            value={milestone.year}
                            onChange={(e) => {
                              const newMilestones = [...editedContent.achievementsPage!.milestones];
                              newMilestones[index] = { ...newMilestones[index], year: e.target.value };
                              updateField('achievementsPage', 'milestones', newMilestones);
                            }}
                          />
                          <Input
                            placeholder="Type"
                            value={milestone.type}
                            onChange={(e) => {
                              const newMilestones = [...editedContent.achievementsPage!.milestones];
                              newMilestones[index] = { ...newMilestones[index], type: e.target.value };
                              updateField('achievementsPage', 'milestones', newMilestones);
                            }}
                          />
                          <Input
                            placeholder="Organization"
                            value={milestone.organization}
                            onChange={(e) => {
                              const newMilestones = [...editedContent.achievementsPage!.milestones];
                              newMilestones[index] = { ...newMilestones[index], organization: e.target.value };
                              updateField('achievementsPage', 'milestones', newMilestones);
                            }}
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={milestone.description}
                          onChange={(e) => {
                            const newMilestones = [...editedContent.achievementsPage!.milestones];
                            newMilestones[index] = { ...newMilestones[index], description: e.target.value };
                            updateField('achievementsPage', 'milestones', newMilestones);
                          }}
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Page */}
        <TabsContent value="galleryPage">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedContent.galleryPage && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editedContent.galleryPage.title}
                        onChange={(e) => updateField('galleryPage', 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Title Highlight</Label>
                      <Input
                        value={editedContent.galleryPage.titleHighlight}
                        onChange={(e) => updateField('galleryPage', 'titleHighlight', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={editedContent.galleryPage.subtitle}
                      onChange={(e) => updateField('galleryPage', 'subtitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Filters (comma separated)</Label>
                    <Input
                      value={editedContent.galleryPage.filters.join(', ')}
                      onChange={(e) => updateField('galleryPage', 'filters', e.target.value.split(', '))}
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Gallery Items ({editedContent.galleryPage.items.length})</h4>
                    {editedContent.galleryPage.items.map((item, index) => (
                      <div key={item.id} className="border rounded-lg p-4 mb-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">Item #{index + 1}</h5>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newItems = editedContent.galleryPage!.items.filter((_, i) => i !== index);
                              updateField('galleryPage', 'items', newItems);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Title"
                            value={item.title}
                            onChange={(e) => {
                              const newItems = [...editedContent.galleryPage!.items];
                              newItems[index] = { ...newItems[index], title: e.target.value };
                              updateField('galleryPage', 'items', newItems);
                            }}
                          />
                          <Input
                            placeholder="Category"
                            value={item.category}
                            onChange={(e) => {
                              const newItems = [...editedContent.galleryPage!.items];
                              newItems[index] = { ...newItems[index], category: e.target.value };
                              updateField('galleryPage', 'items', newItems);
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Type (image/video/article)"
                            value={item.type}
                            onChange={(e) => {
                              const newItems = [...editedContent.galleryPage!.items];
                              newItems[index] = { ...newItems[index], type: e.target.value };
                              updateField('galleryPage', 'items', newItems);
                            }}
                          />
                          <Input
                            placeholder="Date"
                            value={item.date}
                            onChange={(e) => {
                              const newItems = [...editedContent.galleryPage!.items];
                              newItems[index] = { ...newItems[index], date: e.target.value };
                              updateField('galleryPage', 'items', newItems);
                            }}
                          />
                          <Input
                            placeholder="Location"
                            value={item.location}
                            onChange={(e) => {
                              const newItems = [...editedContent.galleryPage!.items];
                              newItems[index] = { ...newItems[index], location: e.target.value };
                              updateField('galleryPage', 'items', newItems);
                            }}
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...editedContent.galleryPage!.items];
                            newItems[index] = { ...newItems[index], description: e.target.value };
                            updateField('galleryPage', 'items', newItems);
                          }}
                          rows={2}
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.featured}
                            onChange={(e) => {
                              const newItems = [...editedContent.galleryPage!.items];
                              newItems[index] = { ...newItems[index], featured: e.target.checked };
                              updateField('galleryPage', 'items', newItems);
                            }}
                          />
                          <Label>Featured</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
