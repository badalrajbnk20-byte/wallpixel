import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft, 
  Crown, 
  Check, 
  Loader2,
  Sparkles,
  ImageIcon,
  Ban
} from "lucide-react";

const Premium = () => {
  const navigate = useNavigate();
  const { isPremium, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
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
                <h1 className="text-xl font-bold text-foreground">Premium</h1>
                <p className="text-xs text-muted-foreground">Exclusive Features</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        {isPremium ? (
          /* Already Premium */
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">You're Premium!</h2>
            <p className="text-muted-foreground mb-6">
              Enjoy unlimited wallpapers and ad-free experience
            </p>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-orange-500"
              onClick={() => navigate("/premium-wallpapers")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              View Premium Wallpapers
            </Button>
          </div>
        ) : (
          <>
            {/* Premium Benefits */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Premium Benefits</h2>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>Unlimited AI wallpaper generation</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>50+ exclusive premium wallpapers</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Ban className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>No ads - clean experience</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <ImageIcon className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span>Early access to new features</span>
                </li>
              </ul>

              <p className="text-center text-muted-foreground text-sm">
                AI wallpaper generation is now free and unlimited for everyone!
              </p>
            </div>

            <Button
              className="w-full"
              onClick={() => navigate("/premium-wallpapers")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Premium Wallpapers
            </Button>
          </>
        )}
      </main>
    </div>
  );
};

export default Premium;
