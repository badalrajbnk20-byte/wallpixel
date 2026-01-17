import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WallpaperPreview } from "@/components/WallpaperPreview";
import { Wallpaper } from "@/types/wallpaper";
import { 
  ArrowLeft, 
  Crown, 
  Lock,
  Loader2,
  Download
} from "lucide-react";

interface PremiumWallpaper {
  id: string;
  title: string;
  image_url: string;
  category: string;
}

const PremiumWallpapers = () => {
  const navigate = useNavigate();
  const { user, isPremium, loading: authLoading } = useAuth();
  const [wallpapers, setWallpapers] = useState<PremiumWallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchWallpapers = async () => {
      const { data, error } = await supabase
        .from('premium_wallpapers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching wallpapers:', error);
        toast.error("Failed to load wallpapers");
      } else {
        setWallpapers(data || []);
      }
      setLoading(false);
    };

    fetchWallpapers();
  }, []);

  const handleWallpaperClick = (wallpaper: PremiumWallpaper) => {
    if (!isPremium) {
      toast.error("This is a premium wallpaper", {
        description: "Upgrade to premium to access this wallpaper",
        action: {
          label: "Go Premium",
          onClick: () => navigate("/premium")
        }
      });
      return;
    }

    setSelectedWallpaper({
      id: wallpaper.id,
      title: wallpaper.title,
      imageUrl: wallpaper.image_url,
      thumbnail: wallpaper.image_url,
      category: wallpaper.category as any,
      downloads: 0
    });
    setIsPreviewOpen(true);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Premium Wallpapers</h1>
                  <p className="text-xs text-muted-foreground">{wallpapers.length} exclusive wallpapers</p>
                </div>
              </div>
            </div>

            {!isPremium && (
              <Button
                className="bg-gradient-to-r from-yellow-500 to-orange-500"
                size="sm"
                onClick={() => navigate("/premium")}
              >
                <Crown className="w-4 h-4 mr-2" />
                Unlock All
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {wallpapers.length === 0 ? (
          <div className="text-center py-16">
            <Crown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium wallpapers coming soon!</h3>
            <p className="text-muted-foreground">
              We're adding exclusive wallpapers. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className="relative group rounded-xl overflow-hidden border border-border cursor-pointer"
                onClick={() => handleWallpaperClick(wallpaper)}
              >
                <img
                  src={wallpaper.image_url}
                  alt={wallpaper.title}
                  className={`w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105 ${
                    !isPremium ? 'blur-sm' : ''
                  }`}
                  loading="lazy"
                />
                
                {/* Lock overlay for non-premium */}
                {!isPremium && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                      <p className="text-white text-xs font-medium">Premium Only</p>
                    </div>
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white text-sm font-medium truncate">{wallpaper.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Crown className="w-3 h-3 text-yellow-500" />
                    <span className="text-yellow-500 text-xs">Premium</span>
                  </div>
                </div>

                {/* Hover overlay for premium users */}
                {isPremium && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Preview Modal */}
      <WallpaperPreview
        wallpaper={selectedWallpaper}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default PremiumWallpapers;
