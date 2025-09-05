import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Rocket, Users, Award, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import heroPortrait from '@/assets/hero-portrait.jpg';

const About = () => {
  const skills = [
    { icon: Brain, label: 'AI/ML', description: 'TensorFlow, PyTorch, Hugging Face' },
    { icon: Code, label: 'Development', description: 'React, Python, Node.js, Rust' },
    { icon: Rocket, label: 'Cloud & DevOps', description: 'AWS, Docker, Kubernetes' },
    { icon: Users, label: 'Leadership', description: 'Team Management, Strategy' },
    { icon: Award, label: 'Research', description: 'Published Papers, Patents' },
    { icon: Globe, label: 'Languages', description: 'Bengali, English, Hindi' },
  ];

  const workflowPhases = [
    'Discovery & Research', 'Problem Definition', 'Solution Design', 'Prototyping',
    'Development', 'Testing & Validation', 'Deployment', 'Monitoring & Iteration',
    'Documentation', 'Knowledge Transfer', 'Continuous Improvement', 'Impact Assessment'
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    <span className="hero-text-gradient">Sheikh Yeasin</span>
                    <br />Ahsanullah Al‑Galib
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    AI Innovator • Software Engineer • Startup Founder
                  </p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm a passionate AI engineer and startup founder from Bangladesh, driven by creating 
                    intelligent solutions that bridge technology with real-world impact.
                  </p>
                  <p>
                    My journey combines deep technical expertise with entrepreneurial vision, 
                    always focusing on solutions that matter to people and communities.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="glow-border p-2">
                  <img
                    src={heroPortrait}
                    alt="Sheikh Yeasin Ahsanullah Al‑Galib"
                    className="w-80 h-80 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section className="py-20 bg-accent/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Core <span className="hero-text-gradient">Expertise</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Card key={skill.label} className="card-elevated p-6 text-center group">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{skill.label}</h3>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Timeline */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              My 12-Phase <span className="hero-text-gradient">Workflow</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowPhases.map((phase, index) => (
                <Card key={phase} className="card-elevated p-4 text-center">
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="text-sm font-medium">{phase}</h4>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Let's Build the Future <span className="hero-text-gradient">Together</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">View My Work</Button>
              <Button variant="outline" size="lg" className="btn-ghost-glow">Contact Me</Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;