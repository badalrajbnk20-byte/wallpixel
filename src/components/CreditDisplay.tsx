import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Crown, Film, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const CreditDisplay = () => {
  const { user, isPremium, credits, earnCredit } = useAuth();
  const [watchingAd, setWatchingAd] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="bg-muted/50 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Login to generate wallpapers</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => navigate("/auth")}>
          Login
        </Button>
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-3 flex items-center gap-3">
        <Crown className="w-5 h-5 text-yellow-500" />
        <div>
          <p className="text-sm font-medium text-foreground">Premium Member</p>
          <p className="text-xs text-muted-foreground">Unlimited generations</p>
        </div>
      </div>
    );
  }

  const handleWatchAd = async () => {
    setWatchingAd(true);
    
    // Simulate watching an ad (3 seconds)
    // In production, integrate with actual rewarded video ad SDK
    toast.info("Loading reward video...", { duration: 1500 });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const success = await earnCredit();
    
    if (success) {
      toast.success("You earned 1 credit!", {
        description: "Thanks for watching the ad"
      });
    } else {
      toast.error("Failed to earn credit. Try again.");
    }
    
    setWatchingAd(false);
  };

  return (
    <div className="bg-muted/50 rounded-xl p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {credits?.credits || 0} Credits Left
          </span>
        </div>
        <span className="text-xs text-muted-foreground">Resets daily</span>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 text-xs"
          onClick={handleWatchAd}
          disabled={watchingAd}
        >
          {watchingAd ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Watching...
            </>
          ) : (
            <>
              <Film className="w-3 h-3 mr-1" />
              Watch Ad +1
            </>
          )}
        </Button>
        <Button
          size="sm"
          className="flex-1 text-xs bg-gradient-to-r from-yellow-500 to-orange-500"
          onClick={() => navigate("/premium")}
        >
          <Crown className="w-3 h-3 mr-1" />
          Go Premium
        </Button>
      </div>
    </div>
  );
};
