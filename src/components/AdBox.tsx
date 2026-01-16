import { useEffect, useRef } from "react";

interface AdBoxProps {
  className?: string;
}

export const AdBox = ({ className = "" }: AdBoxProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !adContainerRef.current) return;

    // Set atOptions globally
    (window as any).atOptions = {
      'key': 'a0068f90758c6ae508a7b7f5db504dac',
      'format': 'iframe',
      'height': 60,
      'width': 468,
      'params': {}
    };

    // Create the Adsterra banner script
    const script = document.createElement("script");
    script.src = "https://annoyancedisparity.com/a0068f90758c6ae508a7b7f5db504dac/invoke.js";
    
    adContainerRef.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      if (adContainerRef.current && script.parentNode === adContainerRef.current) {
        adContainerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`${className} flex justify-center`} ref={adContainerRef}></div>
  );
};
