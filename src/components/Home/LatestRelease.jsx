
import { ArrowUpRight, Play, Music2 } from "lucide-react";
import { useEffect, useRef } from "react";

export default function LatestRelease() {
    const spotifyRefs = useRef([]);

    useEffect(() => {
        let timeout;

        const handleScroll = () => {
            spotifyRefs.current.forEach((iframe) => {
                if (iframe) {
                    iframe.style.pointerEvents = "none";
                }
            });

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                spotifyRefs.current.forEach((iframe) => {
                    if (iframe) {
                        iframe.style.pointerEvents = "auto";
                    }
                });
            }, 150);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    const releases = [
        {
            name: "STAYING",
            secondName: "DOWN",
            category: "Debut Single",
            description:
                "The first chapter of SouthCult's creative journey, bringing together original music, authentic storytelling, and artistic expression to inspire audiences and celebrate independent talent.",
            spotifyId: "7v1tMD4WPsGlqNJzZkADVr",
            spotifyUrl:
                "https://open.spotify.com/track/7v1tMD4WPsGlqNJzZkADVr",
            embedUrl:
                "https://open.spotify.com/embed/track/7v1tMD4WPsGlqNJzZkADVr?utm_source=generator",
        },
        {
            name: "ACHAKU",
            secondName: "ACHAKU",
            category: "Latest Single",
            description:
                "Experience Achaku Achaku, the latest musical release from SouthCult. Stream the track now and discover the sound of independent South Indian music.",
            spotifyId: "2IgppdzGZnKBJF6e75qt1b",
            spotifyUrl:
                "https://open.spotify.com/track/2IgppdzGZnKBJF6e75qt1b",
            embedUrl:
                "https://open.spotify.com/embed/track/2IgppdzGZnKBJF6e75qt1b?utm_source=generator",
        },
    ];

    return (
        <>
            {/* SECTION 1 : STICKY HEADING */}
            <section className="sticky top-0 h-[300px] sm:h-[360px] bg-[#050505] -mt-px flex items-center justify-end z-0 overflow-hidden">

                <div className="w-full max-w-7xl mx-auto px-6">
                    <div className="text-right">

                        <h1 className="text-[52px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-black uppercase leading-[0.95] sm:leading-[0.82] text-[#be0707]">
                            LATEST
                        </h1>

                        <h1 className="text-[52px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-black uppercase leading-[0.95] sm:leading-[0.82] mt-1 sm:mt-2 text-[#f4f4f4]">
                            RELEASE
                        </h1>

                    </div>
                </div>
            </section>

            {/* SECTION 2 : RELEASE CONTENT */}
            <section className="relative z-10 bg-[#050505]">

                <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">

                    {/* SECTION INTRO */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">

                        <div>
                          

                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-clash font-black leading-[0.95] text-white">
                                OUR LATEST
                            </h2>

                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-clash font-black leading-[0.95] text-zinc-600">
                                SOUNDS.
                            </h2>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                            Discover the sounds of SouthCult. From our debut
                            single to our latest releases, experience our
                            music and creative journey.
                        </p>

                    </div>

                    {/* RELEASE CARDS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {releases.map((release, index) => (

                            <div
                                key={release.spotifyId}
                                className="group relative rounded-[28px] overflow-hidden border border-white/10 bg-[#0b0b0b] hover: transition-all duration-500"
                            >

                                {/* CARD CONTENT */}
                                <div className="p-6 sm:p-8">

                                    {/* CATEGORY */}
                                    <div className="flex items-center justify-between mb-8">

                                        <div className="flex items-center gap-3">

                                            <div className="w-11 h-11 rounded-full bg-[#be0707]/10 flex items-center justify-center">
                                                <Music2
                                                    size={21}
                                                    className="text-[#be0707]"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-white uppercase tracking-wider">
                                                    Spotify
                                                </p>

                                                <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">
                                                    Music Release
                                                </p>
                                            </div>

                                        </div>

                                        <span className="text-[10px] uppercase tracking-widest text-[#be0707] border border-[#be0707]/30 rounded-full px-3 py-2">
                                            {release.category}
                                        </span>

                                    </div>

                                    {/* SONG TITLE */}
                                    <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black leading-[0.9] text-white">
                                        {release.name}
                                    </h3>

                                    <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clash font-black leading-[0.9] text-zinc-600 mt-2">
                                        {release.secondName}
                                    </h3>

                                    {/* DESCRIPTION */}
                                    <p className="text-sm text-zinc-400 leading-relaxed mt-6 max-w-lg min-h-[72px]">
                                        {release.description}
                                    </p>

                                </div>

                                {/* SPOTIFY EMBED */}
                                <div className="px-4 sm:px-6 pb-5">

                                    <div
                                        className="rounded-2xl overflow-hidden border border-white/10 bg-black"
                                        onMouseEnter={() =>
                                            window.dispatchEvent(
                                                new Event("cursor-hide")
                                            )
                                        }
                                        onMouseLeave={() =>
                                            window.dispatchEvent(
                                                new Event("cursor-show")
                                            )
                                        }
                                    >

                                        <iframe
                                            ref={(element) => {
                                                spotifyRefs.current[index] = element;
                                            }}
                                            src={release.embedUrl}
                                            width="100%"
                                            height="352"
                                            frameBorder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                            title={`${release.name} ${release.secondName} - Spotify`}
                                            className="block w-full"
                                        />

                                    </div>

                                </div>

                                {/* LISTEN BUTTON */}
                                <div className="px-6 sm:px-8 pb-8">

                                    <a
                                        href={release.spotifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-full text-sm font-semibold hover:bg-[#be0707] hover:text-white transition-all duration-300"
                                    >
                                        <Play
                                            size={17}
                                            fill="currentColor"
                                        />

                                        Listen on Spotify

                                        <ArrowUpRight size={17} />
                                    </a>

                                </div>

                            </div>

                        ))}

                    </div>


                </div>
            </section>
        </>
    );
}
