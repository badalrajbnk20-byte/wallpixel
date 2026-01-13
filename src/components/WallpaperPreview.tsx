import { Wallpaper } from "@/types/wallpaper";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, Share2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WallpaperPreviewProps {
  wallpaper: Wallpaper | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WallpaperPreview = ({ wallpaper, isOpen, onClose }: WallpaperPreviewProps) => {
  if (!wallpaper) return null;

  const trackDownload = async () => {
    try {
      await supabase.from('wallpaper_downloads').insert({
        wallpaper_id: wallpaper.id,
        wallpaper_title: wallpaper.title,
        category: wallpaper.category,
        is_ai_generated: false
      });
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  };

  const handleDownload = async () => {
    // Track the download
    await trackDownload();
    
    // Create a temporary link to download the image
    const link = document.createElement("a");
    link.href = wallpaper.imageUrl;
    link.download = `${wallpaper.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Wallpaper downloaded!", {
      description: "Go to Gallery → Select image → Set as wallpaper",
      duration: 5000,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this amazing wallpaper: ${wallpaper.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      toast.info("Sharing not supported", {
        description: "Copy the URL to share manually",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-full h-full p-0 bg-background/95 backdrop-blur-xl border-0">
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Image */}
          <div className="relative max-w-md w-full h-full flex items-center justify-center">
            <img
              src={wallpaper.imageUrl}
              alt={wallpaper.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-scale-in"
            />
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto bg-card/90 backdrop-blur-xl p-4 rounded-2xl border border-border shadow-card animate-slide-up">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground mb-1">{wallpaper.title}</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg">
                  {wallpaper.category}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {wallpaper.downloads.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-glow"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};