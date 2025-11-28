import { Wallpaper } from "@/types/wallpaper";
import { Download } from "lucide-react";
import { useState } from "react";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onClick: () => void;
}

export const WallpaperCard = ({ wallpaper, onClick }: WallpaperCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-glow animate-fade-in"
    >
      <div className="aspect-[9/16] relative overflow-hidden">
        <img
          src={wallpaper.thumbnail}
          alt={wallpaper.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
          } group-hover:scale-110`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">{wallpaper.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Download className="w-3 h-3" />
                {wallpaper.downloads.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
