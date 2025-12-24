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
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default AdminContent;
