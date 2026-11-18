
import React, { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import eventImage from "../../assets/artist/vedan.png"
import CultNight from "../../assets/cultnight.svg";
import VickyImage from "../../assets/artist/vicky2.png";
import Records from "../../assets/artist/crecords.png";
import MobileRecords from "../../assets/artist/mobilerecords.png";
import evnmarabu from "../../assets/artist/evnmarabu.png";
import dacalty from "../../assets/artist/dacalty.png";
import puff from "../../assets/artist/puff.png";
import asal from "../../assets/artist/asal.png";
import mobileAsal from "../../assets/artist/mobileasal.png";
import mobilepuff from "../../assets/artist/mobilepuff.png";
import TA from "../../assets/artist/TA.png";
import fault from "../../assets/artist/fault.png";
import aadhithan from "../../assets/artist/aadhithan.png";


const NewYearEventHero = () => {


  const backgroundImages = [eventImage, asal, VickyImage, Records, evnmarabu, dacalty, puff, TA, fault, aadhithan];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const slideshow = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(slideshow);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    const targetDate = new Date(
      "2026-12-19T00:00:00+05:30"
    ).getTime();

    const updateCountdown = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070707] text-white font-clash">

      {/* BACKGROUND SLIDESHOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {backgroundImages.map((image, index) => (
          <React.Fragment key={index}>
            {/* BACKGROUND IMAGE */}
        <picture
  className={`
    absolute inset-0
    h-full w-full
    transition-opacity duration-[1500ms] ease-in-out
    ${currentImage === index ? "opacity-100" : "opacity-0"}
  `}
>
  {/* Mobile image for ASAL */}
  {index === 1 && (
    <source
      media="(max-width: 639px)"
      srcSet={mobileAsal}
    />
  )}

  {/* Mobile image for CRECORDS */}
  {index === 3 && (
    <source
      media="(max-width: 639px)"
      srcSet={MobileRecords}
    />
  )}

  {/* Mobile image for PUFF */}
  {index === 6 && (
    <source
      media="(max-width: 639px)"
      srcSet={mobilepuff}
    />
  )}

  <img
    src={image}
    alt="Cult Night event background"
    className="
      absolute inset-0
      h-full w-full
      object-cover
      object-[75%_center]
      sm:object-[70%_center]
      lg:object-center
    "
  />
</picture>
            {/* VICKY NAME - COMPACT RESPONSIVE */}
            {index === 2 && (
              <div
                className={`
      absolute z-[10]
     right-[3%] top-[18%]
sm:right-[4%] sm:top-[7%]
lg:right-[5%] lg:top-[9%]
      flex w-auto flex-col items-center
      text-center whitespace-nowrap
      transition-opacity duration-[1500ms] ease-in-out
      ${currentImage === 2 ? "opacity-100" : "opacity-0"}
    `}
              >
                {/* VANGAL PULLA */}
                <span
                  className="
        font-logo font-normal text-white
        text-[clamp(1.15rem,3.2vw,3.2rem)]
        leading-none
        tracking-[-0.06em]
      "
                >
                  Vangal pulla
                </span>

                {/* VICKY */}
                <span
                  className="
        mt-1 sm:mt-2
        font-logo font-bold uppercase text-white
        text-[clamp(1rem,2.4vw,2.5rem)]
        leading-none
        tracking-[0.35em]
        pl-[0.35em]
      "
                >
                  VICKY
                </span>
              </div>
            )}
          </React.Fragment>
        ))}

        {/* LEFT DARK OVERLAY */}
        <div className="
    absolute inset-0
    bg-gradient-to-r
    from-black/85
    via-black/45
    to-black/5
    sm:from-black/65
    sm:via-black/35
    sm:to-transparent
  " />

        {/* BOTTOM FADE */}
        <div className="
    absolute inset-0
    bg-gradient-to-t
    from-black/50
    via-transparent
    to-black/15
  " />

      </div>
      {/* HERO CONTENT */}
      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] items-center px-5 pb-32 pt-20 sm:px-8 lg:px-12 xl:px-16">

        <div className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-8">

          {/* EVENT DETAILS */}
          <div className="order-1 lg:order-2 lg:col-span-5 lg:flex lg:justify-end">

            <div className="w-full max-w-[470px] border-l border-white/20 pl-7 sm:pl-10 lg:pl-12">

              {/* EVENT */}
              <div className="mb-8">

                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  Event
                </span>

                <img
                  src={CultNight}
                  alt="Cult Night"
                  className="h-auto w-48 object-contain sm:w-56 "
                />

              </div>

              {/* DATE */}
              <div className="border-y border-white/15 py-7">

                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  Save the date
                </span>

                <div className="flex items-end gap-5">

                  <span className="font-logo text-[clamp(7rem,13vw,12rem)] font-medium leading-[0.72] tracking-[-0.08em]">
                    19
                  </span>

                  <div className="pb-2">

                    <div className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.05em]">
                      DEC
                    </div>

                    <div className="mt-2 text-xl font-medium tracking-[0.08em] text-white/55">
                      2026
                    </div>

                  </div>

                </div>

                {/* DAY */}
                <div className="mt-7 flex items-center gap-3 text-white/55">

                  <CalendarDays
                    size={16}
                    strokeWidth={1.5}
                    className="text-white"
                  />

                  <span className="text-[14px] font-medium uppercase tracking-[0.2em]">
                    Saturday
                  </span>

                </div>

              </div>

              {/* LOCATION */}
              <div className="mt-7">

                <div className="mb-3 flex items-center gap-2 text-white/40">

                  <MapPin
                    size={14}
                    strokeWidth={1.5}
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                    Location
                  </span>

                </div>

                <p className="text-sm font-light tracking-[0.12em] text-white/80">
                  Rathinam Technical Campus, Pollachi Road, Eachanari, Coimbatore.
                </p>

              </div>

              {/* COUNTDOWN */}
              <div className="
  mt-8
  w-full max-w-[320px]
  relative overflow-hidden
  rounded-xl border border-orange-400/25
  bg-black/60 backdrop-blur-lg
  px-5 py-4 sm:px-6 sm:py-5
  shadow-[0_0_25px_rgba(249,115,22,0.12)]
">

                {/* WHITE ACCENT */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-white" />

                {/* LABEL */}
                <div className="mb-3 flex items-center gap-2">

                  <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white">
                    Event Countdown
                  </span>
                </div>

                <div className="flex items-center justify-center gap-5">

                  {/* DAYS */}
                  <div className="text-center">
                    <div className="font-logo text-5xl sm:text-6xl font-semibold leading-none tracking-[-0.07em] text-white tabular-nums">
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <span className="mt-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-white/50">
                      Days
                    </span>
                  </div>

                  {/* DIVIDER */}
                  <div className="h-10 w-px bg-orange-400/40" />

                  {/* HOURS */}
                  <div className="text-center">
                    <div className="font-logo text-5xl sm:text-6xl font-semibold leading-none tracking-[-0.07em] text-white tabular-nums">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <span className="mt-2 block text-[8px] font-semibold uppercase tracking-[0.25em] text-white/50">
                      Hours
                    </span>
                  </div>

                </div>



              </div>
            </div>
          </div>

        </div>
      </main>



    </section>
  );
};

export default NewYearEventHero;
