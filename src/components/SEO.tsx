import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

const defaultSEO = {
  title: 'Nimesh Kulkarni | DevOps Engineer',
  description: 'DevOps Engineer specializing in CI/CD, Docker, AWS, Kubernetes, Jenkins, and infrastructure automation. View my portfolio and experience.',
  keywords: 'DevOps, CI/CD, Docker, AWS, Kubernetes, Jenkins, Git, Linux, Infrastructure as Code, IaC, Cloud Infrastructure, Automation, Deployment, Containerization, Microservices',
  ogImage: '/og-image.jpg',
  ogType: 'website',
  canonical: 'https://nimesh-kulkarni.vercel.app',
};

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType,
  canonical,
  noindex = false,
}: SEOProps) => {
  const baseUrl = 'https://nimesh-kulkarni.vercel.app';
  const finalTitle = title ? `${title} | Nimesh Kulkarni` : defaultSEO.title;
  const finalDescription = description || defaultSEO.description;
  const finalKeywords = keywords || defaultSEO.keywords;
  
  // Ensure image URL is absolute for WhatsApp/Social Media
  let finalOgImage = ogImage || defaultSEO.ogImage;
  if (finalOgImage.startsWith('/')) {
    finalOgImage = `${baseUrl}${finalOgImage}`;
  }
  
  const finalOgType = ogType || defaultSEO.ogType;
  
  // Ensure canonical is absolute
  let finalCanonical = canonical || defaultSEO.canonical;
  if (!finalCanonical || finalCanonical === 'https://nimesh-kulkarni.vercel.app') {
    finalCanonical = typeof window !== 'undefined' ? window.location.href : baseUrl;
  }

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:type" content={finalOgType} />
      <meta property="og:url" content={finalCanonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      <link rel="canonical" href={finalCanonical} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;
