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
  canonical: 'https://yourdomain.com',
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
  const finalTitle = title ? `${title} | Nimesh Kulkarni` : defaultSEO.title;
  const finalDescription = description || defaultSEO.description;
  const finalKeywords = keywords || defaultSEO.keywords;
  const finalOgImage = ogImage || defaultSEO.ogImage;
  const finalOgType = ogType || defaultSEO.ogType;
  const finalCanonical = canonical || defaultSEO.canonical;

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
