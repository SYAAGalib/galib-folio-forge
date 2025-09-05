import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageCircle, Send, Download, QrCode } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              Let's <span className="hero-text-gradient">Connect</span>
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Whether you have a project in mind, a question, or just want to say hello — I'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What's this about?" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message..." rows={5} />
                    </div>
                    <Button className="btn-hero w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="card-elevated">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-6">Direct Contact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="btn-ghost-glow h-20 flex-col">
                        <Mail className="w-6 h-6 mb-2" />
                        Email
                      </Button>
                      <Button variant="outline" className="btn-ghost-glow h-20 flex-col">
                        <MessageCircle className="w-6 h-6 mb-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-6">Digital Business Card</h3>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <Button variant="outline" className="btn-ghost-glow">
                        <Download className="w-4 h-4 mr-2" />
                        Download VCard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;