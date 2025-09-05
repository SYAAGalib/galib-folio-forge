# Sheikh Yeasin Ahsanullah Al-Galib Portfolio

A modern, responsive portfolio website showcasing AI innovation, software engineering projects, and research work.

## 🚀 Features

### Pages Overview
1. **Home** - Hero section with featured projects, research, testimonials, and call-to-action
2. **Projects** - Filterable showcase of software projects and case studies  
3. **Research** - Academic publications and research work with detailed abstracts
4. **Achievements** - Timeline of awards, certifications, and milestones
5. **Gallery** - Visual media from events, awards, speaking engagements
6. **About** - Personal bio, skills grid, and 12-phase workflow
7. **Blog** - Insights on AI, technology, and innovation
8. **Contact** - Contact form with multiple communication channels
9. **Admin Panel** - Content management system (UI only, ready for backend)

### Design System
- **Color Scheme**: Indigo to Cyan gradient theme with HSL color system
- **Typography**: Inter font family with semantic heading hierarchy
- **Animations**: Fade-in, scale, float, and glow effects using Framer Motion
- **Components**: Shadcn/ui with custom variants for hero buttons and cards
- **Responsive**: Mobile-first design with breakpoint optimization

### Key Components
- **Navbar**: Sticky navigation with scroll effects
- **Footer**: Brand info, quick links, and social connections
- **FloatingMessageButton**: Expandable contact options
- **Cards**: Elevated cards with hover effects and gradients
- **Timeline**: Visual milestone representation
- **Lightbox**: Media gallery with zoom and navigation

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React icon set
- **Routing**: React Router v6
- **State**: React Query for data fetching
- **Animations**: CSS transitions and keyframes
- **Images**: Responsive images with lazy loading

## 📱 Responsive Design

- **Mobile**: Single column layouts, collapsible navigation
- **Tablet**: Two-column grids, optimized touch interactions  
- **Desktop**: Multi-column layouts, hover effects, advanced animations

## 🎨 Design Features

### Visual Elements
- **Gradient Backgrounds**: Animated gradient morphing
- **Glow Effects**: CSS-based glow borders and shadows
- **Parallax**: Subtle parallax effects on hero images
- **Cards**: Elevated cards with soft shadows and hover transforms
- **Badges**: Color-coded category and technology badges

### Animations
- **Scroll-triggered**: Content reveals on scroll
- **Staggered**: Sequential animation delays for lists
- **Hover States**: Interactive feedback on all clickable elements
- **Loading States**: Skeleton loading for better UX

## 🔗 Integration Ready

### Backend API Expectations
The frontend is designed to integrate with REST APIs for:

#### Content Management
```
GET /api/projects - Fetch all projects
POST /api/projects - Create new project
PUT /api/projects/:id - Update project
DELETE /api/projects/:id - Remove project
```

#### Contact Form
```
POST /api/contact - Submit contact form
GET /api/messages - Fetch messages (admin)
```

#### Blog System
```
GET /api/blog - Fetch blog posts
GET /api/blog/:slug - Get single post
POST /api/blog - Create new post (admin)
```

#### Media Management
```
GET /api/gallery - Fetch gallery items
POST /api/gallery - Upload new media
DELETE /api/gallery/:id - Remove media
```

### Data Models

#### Project Object
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  metrics: string[];
  links: {
    live?: string;
    github?: string;
  };
  featured: boolean;
  createdAt: string;
}
```

#### Research Object
```typescript
interface Research {
  id: string;
  title: string;
  abstract: string;
  image: string;
  category: string;
  tags: string[];
  publication: string;
  year: string;
  authors: string[];
  links: {
    paper?: string;
    code?: string;
    dataset?: string;
  };
  featured: boolean;
}
```

#### Achievement Object
```typescript
interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  type: 'Education' | 'Awards' | 'Certifications' | 'Leadership';
  description: string;
  organization: string;
  location: string;
  date: string;
  year: string;
  image: string;
  links: Record<string, string>;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env.local` file for environment variables:
```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_CONTACT_EMAIL=your.email@example.com
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The app is configured for static hosting and can be deployed to:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- Any static hosting service

## 🔧 Customization

### Colors
Update the design system in `src/index.css`:
```css
:root {
  --primary: 238 60% 60%;        /* Brand primary color */
  --secondary: 188 95% 68%;      /* Brand secondary color */
  --gradient-primary: linear-gradient(135deg, hsl(238 60% 60%), hsl(188 95% 68%));
}
```

### Typography
Modify font settings in `tailwind.config.ts`:
```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['Fira Code', 'monospace'],
}
```

### Content
Update content in respective page components:
- Personal info in `src/pages/Home.tsx`
- Projects in `src/pages/Projects.tsx`
- Research in `src/pages/Research.tsx`

## 📞 Support

For questions about implementation or customization:
- Review component documentation in `/src/components`
- Check design system tokens in `/src/index.css`
- Reference Tailwind configuration in `/tailwind.config.ts`

## 📄 License

This project is built for Sheikh Yeasin Ahsanullah Al-Galib's personal portfolio.

---

**Built with ❤️ in Bangladesh**