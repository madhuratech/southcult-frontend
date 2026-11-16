
import React from "react";
import { ArrowUpRight, CircleHelp } from "lucide-react";

import Marabu from "../../assets/artist/marabu.png";
import barath from "../../assets/artist/ymc.webp";
import ev from "../../assets/artist/ev.png";

const artists = [
    {
        id: 1,
        name: "Marabu Kavi",
        role: "Independent Artist",
        image: Marabu,
        spotify: "https://open.spotify.com/artist/4ZI5kjqs53SfxggERnkycx",
        status: "active",
    },
    {
        id: 2,
        name: "YMC Barath",
        role: "Independent Artist",
        image: barath,
        spotify: "https://open.spotify.com/artist/1nCqcjvnRspRyd81QZa8Sr",
        status: "active",
    },
    {
        id: 3,
        name: "EV",
        role: "Independent Artist",
        image: ev,
        spotify: "https://open.spotify.com/artist/0NVQbptRGqD8jdbkFprkqb?si=69AK_yR-QaOXXunu2ZkFhA",
        status: "active",
    },
];

export default function OurArtists() {
    return (
        <>
            {/* Heading */}
            <section className="sticky top-0 h-[300px] sm:h-[360px] bg-[#050505] flex items-center z-0 overflow-hidden">
                <div className="w-full max-w-7xl mx-auto px-6">
                    <div className="text-left">
                        <h1 className="text-[52px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-black uppercase leading-[0.95] sm:leading-[0.82] text-[#f4f4f4]">
                            OUR
                        </h1>

                        <h1 className="text-[52px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-black uppercase leading-[0.95] sm:leading-[0.82] mt-1 sm:mt-2 text-[#be0707]">
                            ARTISTS
                        </h1>
                    </div>
                </div>
            </section>

            {/* Dynamic Artist Section */}
            <section className="relative z-10 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {artists.map((artist) => (
                            <a
                                key={artist.id}
                                href={artist.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-[28px] bg-zinc-900 border border-white/10"
                            >
                                {/* Artist Image */}
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    loading="lazy"
                                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                {/* Artist Details */}
                                <div className="absolute bottom-6 left-6 right-6">

                                    <p className="text-white text-xs uppercase tracking-[0.3em] mb-2">
                                        {artist.role}
                                    </p>

                                    <h3 className="text-3xl font-medium font-clash text-white">
                                        {artist.name}
                                    </h3>

                                    <div className="mt-4 flex items-center gap-2 text-white text-sm">
                                        <CircleHelp size={16} />
                                        <span>Spotify</span>
                                        <ArrowUpRight
                                            size={15}
                                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                        />
                                    </div>
                                </div>
                            </a>
                        ))}

                    

                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <p className="text-white uppercase tracking-[0.35em] text-sm mb-3">
                            SouthCult
                        </p>

                        <h2 className="text-4xl md:text-5xl font-clash text-white">
                            Be the Next Name We Amplify
                        </h2>
                    </div>

                </div>
            </section>
        </>
    );
}
