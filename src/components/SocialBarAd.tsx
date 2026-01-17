import { useEffect, useRef } from "react";

export const SocialBarAd = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    // Create the Adsterra social bar script
    const script = document.createElement("script");
    script.src = "https://annoyancedisparity.com/4f/23/a5/4f23a5f434bc3b2f6dacf9cb717764a6.js";
    
    document.body.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      if (script.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Social bar renders itself, no container needed
  return null;
};
