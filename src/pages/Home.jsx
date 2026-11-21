
import React from 'react';

import Hero from '../components/Home/hero';
import About from '../components/Home/about';
import LatestRelease from '../components/Home/LatestRelease';
import StreamingPartners from '../components/Home/StreamingPartners';
import FeaturedArtists from '../components/Home/FeaturedArtists';
import WhatWeCreate from '../components/Home/WhatWeCreate';
import Collab from '../components/Home/Collab';
import UpcomingRelease from '../components/Home/UpcomingRelease';
import SEO from "../components/seo";

function Home() {
    return (
        <>
            <SEO
                title="Music Production Company and Music Production Studio in India | SouthCult"
                description="South Cult is a music production company and studio in India, helping music creators produce and launch their music worldwide."
                keywords="Music Production Company, Music Production Studio"
             
            />

            <div>
                <Hero />
                <About />
                <WhatWeCreate />
                <LatestRelease />
                <StreamingPartners />
                <FeaturedArtists />
                <UpcomingRelease />
                <Collab />
            </div>
        </>
    );
}

export default Home;
