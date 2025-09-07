import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Save,
  Globe,
  Palette,
  Shield,
  Bell,
  Mail,
  Upload,
  Key,
  Eye,
  EyeOff,
  ExternalLink,
  Trash2
} from 'lucide-react';

const AdminSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Site Settings
    siteTitle: 'Syaagalib - AI Researcher & Developer',
    siteTagline: 'Innovative AI Solutions & Research',
    siteDescription: 'Personal portfolio showcasing AI research, machine learning projects, and innovative technology solutions.',
    siteUrl: 'https://syaagalib.dev',
    
    // SEO Settings
    keywords: 'AI, Machine Learning, Research, Developer, Portfolio',
    ogImage: '/og-image.jpg',
    
    // Contact Settings
    email: 'syaagalib@gmail.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    
    // Social Media
    linkedin: 'https://linkedin.com/in/syaagalib',
    github: 'https://github.com/syaagalib',
    twitter: 'https://twitter.com/syaagalib',
    
    // Appearance
    theme: 'light',
    primaryColor: '#2563eb',
    accentColor: '#7c3aed',
    
    // Notifications
    emailNotifications: true,
    newMessageAlerts: true,
    weeklyReports: true,
    
    // Privacy
    analyticsEnabled: true,
    showContactForm: true,
    showSocialLinks: true,
  });

  const handleSave = () => {
    console.log('Saving settings...', settings);
    // Here you would save to your backend/JSON file
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your site configuration and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteTagline">Site Tagline</Label>
                  <Input
                    id="siteTagline"
                    value={settings.siteTagline}
                    onChange={(e) => setSettings({...settings, siteTagline: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={settings.location}
                  onChange={(e) => setSettings({...settings, location: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries({
                linkedin: 'LinkedIn',
                github: 'GitHub', 
                twitter: 'Twitter'
              }).map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{label}</Label>
                  <div className="flex gap-2">
                    <Input
                      id={key}
                      value={settings[key as keyof typeof settings] as string}
                      onChange={(e) => setSettings({...settings, [key]: e.target.value})}
                    />
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Meta Keywords</Label>
                <Input
                  id="keywords"
                  value={settings.keywords}
                  onChange={(e) => setSettings({...settings, keywords: e.target.value})}
                  placeholder="Separate keywords with commas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ogImage">Open Graph Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="ogImage"
                    value={settings.ogImage}
                    onChange={(e) => setSettings({...settings, ogImage: e.target.value})}
                  />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="font-medium">SEO Preview</h4>
                <div className="space-y-1">
                  <div className="text-blue-600 text-lg font-medium">{settings.siteTitle}</div>
                  <div className="text-green-700 text-sm">{settings.siteUrl}</div>
                  <div className="text-sm text-muted-foreground">{settings.siteDescription}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme & Colors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-2">
                  <Button 
                    variant={settings.theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setSettings({...settings, theme: 'light'})}
                  >
                    Light
                  </Button>
                  <Button 
                    variant={settings.theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setSettings({...settings, theme: 'dark'})}
                  >
                    Dark
                  </Button>
                  <Button 
                    variant={settings.theme === 'auto' ? 'default' : 'outline'}
                    onClick={() => setSettings({...settings, theme: 'auto'})}
                  >
                    Auto
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.accentColor}
                      onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Message Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified of new contact form submissions</p>
                </div>
                <Switch
                  checked={settings.newMessageAlerts}
                  onCheckedChange={(checked) => setSettings({...settings, newMessageAlerts: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly analytics reports</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => setSettings({...settings, weeklyReports: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>
                    <Key className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Badge variant="outline">Not Enabled</Badge>
                </div>
                <Button variant="outline" className="mt-4">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics Tracking</Label>
                  <p className="text-sm text-muted-foreground">Enable visitor analytics and tracking</p>
                </div>
                <Switch
                  checked={settings.analyticsEnabled}
                  onCheckedChange={(checked) => setSettings({...settings, analyticsEnabled: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Contact Form</Label>
                  <p className="text-sm text-muted-foreground">Show contact form on the website</p>
                </div>
                <Switch
                  checked={settings.showContactForm}
                  onCheckedChange={(checked) => setSettings({...settings, showContactForm: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Social Media Links</Label>
                  <p className="text-sm text-muted-foreground">Display social media links in footer</p>
                </div>
                <Switch
                  checked={settings.showSocialLinks}
                  onCheckedChange={(checked) => setSettings({...settings, showSocialLinks: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-600 mb-2">Reset All Settings</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This will reset all settings to their default values. This action cannot be undone.
                </p>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  Reset Settings
                </Button>
              </div>
              <div className="p-4 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-600 mb-2">Clear All Data</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This will permanently delete all content, messages, and analytics data.
                </p>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;