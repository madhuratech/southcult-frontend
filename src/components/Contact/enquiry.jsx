
import {
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa";

const ContactEnquiry = () => {
  return (
    <>
      {/* CONTACT & ENQUIRY */}
      <section className="relative overflow-hidden bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-white/60" />

                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Get in Touch
                </p>
              </div>

              <h2 className="font-clash text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Let's start a{" "}
                <span className="text-white/40">
                  conversation.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/45 md:pb-1">
              Have an event, collaboration, or creative idea in mind?
              We'd love to hear from you.
            </p>
          </div>

          {/* CONTACT CARDS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* ADDRESS */}
            <div className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-7 lg:p-8">

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <MapPin size={21} />
                </div>

                <span className="text-xs tracking-widest text-white/25">
                  01
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Find Us
                </p>

                <h3 className="mt-2 font-clash text-2xl">
                  Our Address
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/50">
                  R.S. Puram, Coimbatore,
                  <br />
                  Tamil Nadu, India
                </p>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href="https://maps.app.goo.gl/G2P3okStsoc4q3hk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  Get Directions

                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>

            {/* ENQUIRIES */}
            <div className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-7 lg:p-8">

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <Phone size={21} />
                </div>

                <span className="text-xs tracking-widest text-white/25">
                  02
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Let's Talk
                </p>

                <h3 className="mt-2 font-clash text-2xl">
                  General Enquiries
                </h3>

                <a
                  href="tel:+917904775772"
                  className="mt-4 inline-block text-xl font-medium tracking-tight transition-colors hover:text-white/60 lg:text-2xl"
                >
                  +91 7904775772
                </a>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Events, partnerships &amp; collaborations.
                </p>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href="tel:+917904775772"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  Call Us

                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>

            {/* INSTAGRAM */}
            <div className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 sm:p-7 lg:p-8">

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <FaInstagram size={21} />
                </div>

                <span className="text-xs tracking-widest text-white/25">
                  03
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Follow Along
                </p>

                <h3 className="mt-2 font-clash text-2xl">
                  Join Our Community
                </h3>

                <a
                  href="https://www.instagram.com/south_cult_music"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xl font-medium transition-colors hover:text-white/60"
                >
                  @southcult
                </a>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Discover our events, performances &amp; latest updates.
                </p>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href="https://www.instagram.com/south_cult_music"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SouthCult on Instagram"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  Follow Us

                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactEnquiry;
