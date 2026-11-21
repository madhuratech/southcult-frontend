
import React from 'react';
import CollaborationHero from '../components/Collab/hero';
import WhoWeCollaborate from '../components/Collab/WhoWeCollaborat';
import SEO from '../components/seo';


function Collab() {
  return (
    <>
      <SEO
        title="Music Collaboration Platform and Music Production Collaboration in India | South Cult"
        description="Independent artist collaboration and concert collaboration with South Cult in India, a platform where music creators team up and launch their music worldwide."
        keywords="Music Collaboration Platform, Music Production Collaboration, Concert Collaboration, Independent Artist Collaboration"
        slug="/independent-artist-collaboration"
      />

      <div>
        <CollaborationHero />
        <WhoWeCollaborate />
      </div>
    </>
  );
}

export default Collab;
