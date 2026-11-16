import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white">

            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col">

                {/* Hero Content */}
                <div className="flex flex-1 items-center justify-center px-6 pb-20 text-center">

                    <div className="max-w-6xl">
                        {/* Main heading */}
                        <h2 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-8xl lg:text-[90px]">
                            South India's Artists
                            <br />

                            <span className="text-white/70">
                                Through Creative Excellence
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="mx-auto font-clash mt-8 max-w-xl text-sm leading-7 text-white/55 md:text-base">
                            Developing artists through funding, production, protection, marketing, broadcasting, documentaries, podcasts, and concerts.
                        </p>


                        {/* CTA BUTTONS */}
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                            {/* LATEST EVENT BUTTON */}
                            <a
                                href="/event"
                                className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white bg-white px-5 py-3 font-clash text-sm font-medium text-black transition-all duration-500 hover:scale-[1.03] hover:bg-transparent hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                            >
                                {/* Live pulse */}
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40 group-hover:bg-white/40" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-black transition-colors group-hover:bg-white" />
                                </span>

                                <span className="font-semibold tracking-[0.18em] transition-colors group-hover:text-white">
                                    Live
                                </span>

                                <span className="h-4 w-px bg-black/20 transition-colors group-hover:bg-white/20" />

                                <span className="text-black/80 transition-colors group-hover:text-white/90">
                                    Our Upcoming Event
                                </span>

                                <span className="text-base transition-all group-hover:translate-x-1">
                                    ↗
                                </span>

                                {/* Shine effect */}
                                <span className="pointer-events-none absolute inset-y-0 -left-[80%] w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-black/10 to-transparent transition-all duration-700 group-hover:left-[130%]" />
                            </a>

                            {/* INSTAGRAM BUTTON */}
                            <a
                                href="https://www.instagram.com/south_cult_music"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow South Cult on Instagram"
                                className="group flex items-center gap-3 rounded-full border border-white/40 bg-transparent px-6 py-3 font-clash text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:text-black"
                            >
                                <FaInstagram
                                    size={18}
                                    className="transition-transform duration-300 group-hover:rotate-[-8deg]"
                                />

                                <span className="tracking-wide">
                                    Follow on Instagram
                                </span>

                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    ↗
                                </span>
                            </a>

                        </div>

                    </div>
                </div>



            </div>
        </section>
    );
}