import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageCircle, Send, Download, QrCode, Loader2 } from 'lucide-react';
import { useContactPageContent } from '@/hooks/useContent';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import SEO from '@/components/SEO';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { contactPage, loading } = useContactPageContent();
  const [sending, setSending] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const title = contactPage?.title ?? "Let's";
  const titleHighlight = contactPage?.titleHighlight ?? 'Connect';
  const subtitle = contactPage?.subtitle ?? "Whether you have a project in mind, a question, or just want to say hello — I'd love to hear from you.";
  const formLabels = contactPage?.formLabels ?? {
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    submit: 'Send Message'
  };

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    try {
      // Fetch SMTP settings from site-content.json
      const response = await fetch('/data/site-content.json');
      const siteContent = await response.json();
      const smtpSettings = siteContent?.smtp;

      if (!smtpSettings?.host || !smtpSettings?.email || !smtpSettings?.appPassword) {
        toast.error('Email service is not configured. Please contact the administrator.');
        return;
      }

      const { data: result, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: smtpSettings.email,
          subject: `Contact Form: ${data.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          `,
          text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`,
          smtp: {
            host: smtpSettings.host,
            port: smtpSettings.port || 587,
            email: smtpSettings.email,
            password: smtpSettings.appPassword,
            fromName: smtpSettings.fromName || 'Contact Form',
            secure: smtpSettings.secure || false,
          },
        },
      });

      if (error) throw error;

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      form.reset();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title="Contact"
        description="Get in touch with Sheikh Yeasin Ahsanullah Al-Galib for collaborations, projects, or inquiries about AI and software development."
        keywords="contact, get in touch, collaboration, AI projects, software development"
      />
      <div className="min-h-screen">
        <section className="py-20 bg-gradient-bg">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              {title} <span className="hero-text-gradient">{titleHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              {subtitle}
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{formLabels.name}</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{formLabels.email}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{formLabels.subject}</FormLabel>
                            <FormControl>
                              <Input placeholder="What's this about?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{formLabels.message}</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your message..." rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="btn-hero w-full" disabled={sending}>
                        {sending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            {formLabels.submit}
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="card-elevated">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-6">Direct Contact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="btn-ghost-glow h-20 flex-col"
                        asChild
                      >
                        <a href="mailto:syaagalib@gmail.com">
                          <Mail className="w-6 h-6 mb-2" />
                          Email
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="btn-ghost-glow h-20 flex-col"
                        asChild
                      >
                        <a href="https://wa.me/8801946303020" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-6 h-6 mb-2" />
                          WhatsApp
                        </a>
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