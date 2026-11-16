import React from "react";
import {
  ArrowUpRight,
  Check,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import DanceImage from "../../assets/dance.png";

const DanceCrew = () => {
  const styles = [
    "Hip-Hop",
    "Contemporary",
    "Freestyle",
    "Urban",
    "Fusion",
    "Folk",
  ];

  const whatsappNumber = "917904775772";

  const whatsappMessage = encodeURIComponent(
    "Hi South Cult, I'm interested in performing at your upcoming events. I would like to know more about the opportunity."
  );

  return (
    <section className="relative overflow-hidden bg-[#090909] py-16 font-clash text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">

          {/* =====================================================
              IMAGE
              Mobile: SECOND
              Desktop: FIRST
          ====================================================== */}
          <div className="order-2 relative min-h-[420px] overflow-hidden sm:min-h-[480px] lg:order-1 lg:min-h-[620px]">

            <img
              src={DanceImage}
              alt="Dance crew performing on stage"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
                transition-transform
                duration-[1200ms]
                hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          </div>


          {/* =====================================================
              OPPORTUNITY
              Mobile: FIRST
              Desktop: SECOND
          ====================================================== */}
          <div className="order-1 flex flex-col justify-between border border-white/10 bg-[#0d0d0d] p-7 sm:p-10 lg:order-2 lg:p-12">

            {/* Top */}
            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-red-600" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  Performer Opportunity
                </span>
              </div>

              <h2 className="mt-6 max-w-lg text-[clamp(3rem,5vw,5.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.03em]">
                Your crew.
                <br />
                <span className="text-red-600">
                  Your stage.
                </span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-6 text-white/45 sm:text-[15px] sm:leading-7">
                South Cult is inviting passionate dance crews and
                performers to be part of our upcoming live events.
                Showcase your talent, perform in front of a live
                audience, and become part of the South Cult community.
              </p>

            </div>


            {/* Who can apply */}
            <div className="mt-10 border-y border-white/10 py-7">

              <div className="mb-5 flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/40">
                  Who can apply?
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {styles.map((style) => (
                  <div
                    key={style}
                    className="flex items-center gap-2"
                  >
                    <Check
                      size={13}
                      strokeWidth={1.5}
                      className="text-red-600"
                    />

                    <span className="text-[14px] font-medium uppercase tracking-[0.15em] text-white/60">
                      {style}
                    </span>
                  </div>
                ))}
              </div>

            </div>


            {/* Bottom CTA */}
            <div className="mt-8">

              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                Ready to perform?
              </p>

              <div className="flex flex-wrap items-center gap-3">

                {/* Apply Button */}
                <a
                  href="/contact"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-5
                    bg-white
                    px-6
                    py-4
                    text-black
                    transition-all
                    duration-300
                    hover:bg-red-600
                    hover:text-white
                  "
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                    Apply to Perform
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 transition-transform duration-300 group-hover:rotate-45 group-hover:border-white/30">
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                    />
                  </span>
                </a>


                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    border
                    border-white/15
                    bg-white/[0.03]
                    px-5
                    py-4
                    text-white
                    transition-all
                    duration-300
                    hover:border-green-500/50
                    hover:bg-green-500/10
                  "
                >
                  <FaWhatsapp
                    size={24}
                    className="text-[#25D366] transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="text-left">
                    <span className="block text-[8px] uppercase tracking-[0.2em] text-white/35">
                      WhatsApp
                    </span>

                    <span className="block text-[12px] font-medium tracking-[0.08em] text-white/75">
                      +917904775772
                    </span>
                  </div>
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DanceCrew;