import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const AIWallpaperGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your wallpaper");
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-wallpaper', {
        body: { prompt: prompt.trim() }
      });

      if (error) {
        console.error('Function error:', error);
        if (error.message?.includes('429')) {
          toast.error("Rate limit reached. Please wait and try again.", {
            description: "Too many requests in a short time"
          });
        } else if (error.message?.includes('402')) {
          toast.error("AI credits exhausted", {
            description: "Please add credits to continue generating"
          });
        } else {
          toast.error("Failed to generate wallpaper", {
            description: "Please try again"
          });
        }
        return;
      }

      if (!data?.imageUrl) {
        toast.error("No image received from AI");
        return;
      }

      setGeneratedImage(data.imageUrl);
      setShowPreview(true);
      toast.success("Wallpaper generated!", {
        description: "Your custom wallpaper is ready"
      });

    } catch (error) {
      console.error('Generation error:', error);
      toast.error("An error occurred", {
        description: "Please try again later"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    // Create a temporary link to download the base64 image
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-wallpaper-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Wallpaper downloaded!");
  };

  return (
    <>
      <div className="bg-gradient-card backdrop-blur-sm rounded-2xl p-6 border border-border shadow-card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">AI Wallpaper Generator</h2>
            <p className="text-sm text-muted-foreground">Create your own custom wallpaper</p>
          </div>
        </div>

        <Textarea
          placeholder="Describe your dream wallpaper... (e.g., 'Futuristic city at night with neon lights', 'Peaceful mountain lake at sunrise', 'Abstract geometric patterns in blue and gold')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] mb-4 bg-background border-border rounded-xl resize-none focus:ring-2 focus:ring-primary"
          disabled={isGenerating}
        />

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-glow transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Wallpaper
            </>
          )}
        </Button>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-full w-full h-full p-0 bg-background/95 backdrop-blur-xl border-0">
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            {/* Image */}
            <div className="relative max-w-md w-full h-full flex items-center justify-center">
              {generatedImage && (
                <img
                  src={generatedImage}
                  alt="Generated wallpaper"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-scale-in"
                />
              )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto bg-card/90 backdrop-blur-xl p-4 rounded-2xl border border-border shadow-card">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-foreground mb-1">AI Generated Wallpaper</h2>
                <p className="text-sm text-muted-foreground">Created with AI</p>
              </div>

              <Button
                onClick={handleDownload}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-glow"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Wallpaper
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
