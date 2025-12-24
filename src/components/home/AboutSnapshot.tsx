import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  Code, 
  Rocket, 
  Users, 
  Award, 
  Globe 
} from 'lucide-react';

const AboutSnapshot = () => {
  const skills = [
    { icon: Brain, label: 'AI/ML', description: 'Deep Learning & LLMs' },
    { icon: Code, label: 'Full Stack', description: 'React, Python, Node.js' },
    { icon: Rocket, label: 'Innovation', description: 'Product Development' },
    { icon: Users, label: 'Leadership', description: 'Team Management' },
    { icon: Award, label: 'Research', description: 'Published Papers' },
    { icon: Globe, label: 'Impact', description: 'Global Solutions' },
  ];

  return (
    <section id="about" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Bio */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About <span className="hero-text-gradient">Me</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate AI engineer and startup founder from Bangladesh, driven by the 
                  vision of creating intelligent solutions that bridge technology with real-world impact.
                </p>
                <p>
                  From founding AIELTS and winning the UIHP National Award to leading Intelleeo as 
                  Chairman, I've dedicated my career to pushing the boundaries of what's possible 
                  with AI and machine learning.
                </p>
                <p>
                  My journey combines deep technical expertise with entrepreneurial vision, 
                  always focusing on solutions that matter to people and communities.
                </p>
              </div>
            </div>
            
            <Button className="btn-hero">
              Read My Full Story
            </Button>
          </div>

          {/* Right Side - Skills Grid */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-semibold mb-6 text-center">Core Expertise</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Card
                    key={skill.label}
                    className="card-elevated p-4 text-center group hover:bg-gradient-primary-soft transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{skill.label}</h4>
                        <p className="text-xs text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;