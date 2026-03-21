// src/components/SEO/SEOHelmet.jsx
import { Helmet } from "react-helmet-async";
import { getSEOConfig, getOrganizationSchema } from "@/utils/seoConfig";

export function SEOHelmet({ page, customData = {} }) {
  const config = getSEOConfig(page);
  const finalConfig = { ...config, ...customData };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalConfig.title}</title>
      <meta name="description" content={finalConfig.description} />
      <meta name="keywords" content={finalConfig.keywords} />
      <link rel="canonical" href={finalConfig.canonical} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalConfig.canonical} />
      <meta property="og:title" content={finalConfig.ogTitle} />
      <meta property="og:description" content={finalConfig.ogDescription} />
      <meta property="og:image" content={finalConfig.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalConfig.ogImageAlt} />
      <meta property="og:site_name" content="Saveetha Amravati University" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalConfig.canonical} />
      <meta name="twitter:title" content={finalConfig.twitterTitle} />
      <meta
        name="twitter:description"
        content={finalConfig.twitterDescription}
      />
      <meta name="twitter:image" content={finalConfig.twitterImage} />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify(getOrganizationSchema(finalConfig))}
      </script>
    </Helmet>
  );
}

export default SEOHelmet;
