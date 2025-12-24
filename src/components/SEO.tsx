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
}

const defaultMeta = {
  siteName: 'Sheikh Yeasin Ahsanullah Al-Galib',
  title: 'Sheikh Yeasin Ahsanullah Al-Galib | AI Engineer & Startup Founder',
  description: 'AI Innovator, Software Engineer & Startup Founder specializing in Machine Learning, Bengali NLP, and innovative technology solutions.',
  image: 'https://lovable.dev/opengraph-image-p98pqg.png',
  twitterHandle: '@syaagalib',
  author: 'Sheikh Yeasin Ahsanullah Al-Galib',
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
}: SEOProps) => {
  const pageTitle = title 
    ? `${title} | ${defaultMeta.siteName}` 
    : defaultMeta.title;
  
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
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

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
