import { useEffect, useRef } from "react";

interface AdBoxProps {
  className?: string;
}

export const AdBox = ({ className = "" }: AdBoxProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !adContainerRef.current) return;

    // Create the Adsterra native banner script
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = "https://pl28477227.effectivegatecpm.com/e038811b45f5e533076d79eec18e2f92/invoke.js";
    
    adContainerRef.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      if (adContainerRef.current && script.parentNode === adContainerRef.current) {
        adContainerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={className}>
      <div id="container-e038811b45f5e533076d79eec18e2f92" ref={adContainerRef}></div>
    </div>
  );
};
