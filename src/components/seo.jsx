import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, slug }) => {
  const canonicalUrl = `https://southcult.com${slug}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="South Cult" />
    </Helmet>
  );
};

export default SEO;