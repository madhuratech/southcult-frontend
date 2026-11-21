
import React from 'react';
import Hero from '../components/Label/hero';
import TraditionalVsSouthCult from '../components/Label/TraditionalVsSouthCult';
import TransparentRevenue from '../components/Label/TransparentRevenue';
import FAQ from '../components/Label/faq';
import SEO from "../components/seo";

function Label() {
  return (
    <>
      <SEO
        title="South Cult is an Artist Development Label and Music Distribution Label in India"
        description="Music release label and music release services from South Cult, helping independent creators in India release their music to a global audience."
        keywords="Artist Development Label, Music Distribution Label, Music Release Label, Music Release Services"
        slug="/artist-development-label"
      />

      <div>
        <Hero />
        <TraditionalVsSouthCult />
        <TransparentRevenue />
        <FAQ />
      </div>
    </>
  );
}

export default Label;
