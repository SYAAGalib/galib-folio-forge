import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

const nameVariations = [
  'Sheikh Yeasin Ahsanullah Al-Galib',
  'Sheikh Yeasin Ahsanullah Al Galib',
  'SK. Yeasin Ahsanullah Al-Galib',
  'SK Yeasin Ahsanullah Al Galib',
  'Yeasin Ahsanullah Al-Galib',
  'Yeasin Al-Galib',
  'Yeasin Galib',
  'Al-Galib',
  'Galib',
  'Ghalib',
  'SYAAGalib',
  'SYAAG',
  'syaagalib',
];

const professionalKeywords = [
  'AI Engineer',
  'Machine Learning Engineer',
  'Artificial Intelligence Expert',
  'Software Engineer',
  'Startup Founder',
  'Bengali NLP',
  'Bangla NLP',
  'Natural Language Processing',
  'Deep Learning',
  'TensorFlow',
  'PyTorch',
  'Computer Vision',
  'Data Scientist',
  'Full Stack Developer',
  'React Developer',
  'Python Developer',
  'AI Researcher',
  'Tech Entrepreneur',
  'Bangladesh AI',
  'Bangladeshi Developer',
  'AI Innovator',
  'ML Expert',
  'Hugging Face',
  'LLM Developer',
  'Large Language Models',
];

const defaultMeta = {
  siteName: 'Sheikh Yeasin Ahsanullah Al-Galib',
  title: 'Sheikh Yeasin Ahsanullah Al-Galib | AI Engineer & Startup Founder',
  description: 'Sheikh Yeasin Ahsanullah Al-Galib (SYAAGalib) - AI Innovator, Machine Learning Engineer & Startup Founder from Bangladesh. Expert in Bengali NLP, Deep Learning, TensorFlow, PyTorch, and innovative AI solutions.',
  image: 'https://lovable.dev/opengraph-image-p98pqg.png',
  twitterHandle: '@syaagalib',
  author: 'Sheikh Yeasin Ahsanullah Al-Galib',
  baseKeywords: [...nameVariations, ...professionalKeywords].join(', '),
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sheikh Yeasin Ahsanullah Al-Galib',
  alternateName: nameVariations,
  description: 'AI Engineer, Machine Learning Expert & Startup Founder from Bangladesh specializing in Bengali NLP and innovative AI solutions.',
  url: 'https://syaagalib.com',
  image: defaultMeta.image,
  sameAs: [
    'https://twitter.com/syaagalib',
    'https://github.com/syaagalib',
    'https://linkedin.com/in/syaagalib',
  ],
  jobTitle: ['AI Engineer', 'Machine Learning Engineer', 'Startup Founder', 'Software Engineer'],
  worksFor: {
    '@type': 'Organization',
    name: 'Self-Employed',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Bengali NLP',
    'Computer Vision',
    'TensorFlow',
    'PyTorch',
    'Python',
    'React',
    'Full Stack Development',
  ],
  nationality: {
    '@type': 'Country',
    name: 'Bangladesh',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: defaultMeta.siteName,
  alternateName: ['SYAAGalib', 'SYAAG', 'Galib Portfolio'],
  url: 'https://syaagalib.com',
  description: defaultMeta.description,
  author: {
    '@type': 'Person',
    name: 'Sheikh Yeasin Ahsanullah Al-Galib',
  },
};

const SEO = ({
  title,
  description = defaultMeta.description,
  keywords,
  image = defaultMeta.image,
  url,
  type = 'website',
  author = defaultMeta.author,
  publishedTime,
  modifiedTime,
  noIndex = false,
}: SEOProps) => {
  const pageTitle = title 
    ? `${title} | ${defaultMeta.siteName}` 
    : defaultMeta.title;
  
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const allKeywords = keywords 
    ? `${keywords}, ${defaultMeta.baseKeywords}` 
    : defaultMeta.baseKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      
      {/* Article-specific OG tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="apple-mobile-web-app-title" content="SYAAGalib" />
      <meta name="application-name" content="Sheikh Yeasin Ahsanullah Al-Galib Portfolio" />

      {/* Structured Data - Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>

      {/* Structured Data - Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
