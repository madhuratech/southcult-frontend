
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "../../assets/southcult.png";
import CultLoader from "../../assets/loaders/cultloader.mp4";
import MobileLoader from "../../assets/loaders/mobileloader.mp4";

export default function PageLoader() {
  const location = useLocation();

  const firstVisitRef = useRef(null);
  const previousPathRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // FIRST VISIT LOADER
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    if (firstVisitRef.current === null) {
      const hasVisited = sessionStorage.getItem("southcult-visited");

      firstVisitRef.current = !hasVisited;

      if (!hasVisited) {
        sessionStorage.setItem("southcult-visited", "true");
      }
    }

    const isFirstVisit = firstVisitRef.current;

    setIsLoading(true);
    setShowVideo(isFirstVisit);

    if (!isFirstVisit) {
      timerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timerRef.current);
  }, []);

  // PAGE NAVIGATION LOADER
  useEffect(() => {
    if (previousPathRef.current === null) {
      previousPathRef.current = location.pathname;
      return;
    }

    if (previousPathRef.current !== location.pathname) {
      previousPathRef.current = location.pathname;

      clearTimeout(timerRef.current);

      setShowVideo(false);
      setIsLoading(true);

      timerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  // VIDEO PLAYBACK
  useEffect(() => {
    if (!showVideo || !videoRef.current) return;

    const video = videoRef.current;

    video.muted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn("Loader autoplay failed:", error);
        setIsLoading(false);
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, [showVideo, isMobile]);

  const handleVideoEnd = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    console.error("Loader video failed to load.");
    setIsLoading(false);
  };

  return (
    <>
      <style>{`
        @keyframes logoZoom {
          from {
            transform: scale(0.8);
          }
          to {
            transform: scale(1.4);
          }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]
          transition-opacity duration-500 ease-linear
          ${
            isLoading
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
      >
        {showVideo ? (
          <video
            ref={videoRef}
            key={isMobile ? "mobile-loader" : "desktop-loader"}
            src={isMobile ? MobileLoader : CultLoader}
            autoPlay
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            className={`absolute inset-0 h-full w-full ${
              isMobile ? "object-contain" : "object-cover"
            }`}
          />
        ) : (
          <>
            {/* TOP SHUTTER */}
            <div
              className={`absolute top-0 left-0 h-1/2 w-full bg-[#050505]
                transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]
                ${isLoading ? "translate-y-0" : "-translate-y-full"}`}
            />

            {/* BOTTOM SHUTTER */}
            <div
              className={`absolute bottom-0 left-0 h-1/2 w-full bg-[#050505]
                transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]
                ${isLoading ? "translate-y-0" : "translate-y-full"}`}
            />

            {/* LOGO ZOOM */}
            <div className="relative z-10 overflow-visible">
              <img
                src={Logo}
                alt="South Cult"
                className="w-32 md:w-40"
                style={{
                  animation: isLoading
                    ? "logoZoom 1s linear forwards"
                    : "none",
                  opacity: isLoading ? 1 : 0,
                  transition: "opacity 250ms ease",
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
