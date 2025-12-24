import { Card } from '@/components/ui/card';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Award, Users, Briefcase, Star } from 'lucide-react';

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Briefcase, value: 50, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 10000, suffix: '+', label: 'Users Impacted' },
  { icon: Award, value: 15, suffix: '+', label: 'Awards Won' },
  { icon: Star, value: 4.9, suffix: '', label: 'Average Rating' },
];

const StatsSection = () => {
  return (
    <section id="stats" className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="card-elevated p-6 text-center group hover:bg-primary/5 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold hero-text-gradient">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2000 + index * 200}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
