import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Download, Loader2, X, Smartphone, Tablet, Monitor, Upload, Image } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type WallpaperSize = "mobile" | "tablet" | "desktop";

const sizeOptions = [
  { id: "mobile" as WallpaperSize, label: "Mobile", icon: Smartphone, ratio: "9:16" },
  { id: "tablet" as WallpaperSize, label: "Tablet", icon: Tablet, ratio: "3:4" },
  { id: "desktop" as WallpaperSize, label: "Desktop", icon: Monitor, ratio: "16:9" },
];

export const AIWallpaperGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSize, setSelectedSize] = useState<WallpaperSize>("mobile");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      toast.success("Photo uploaded!", {
        description: "Now describe how you want to transform it"
      });
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your wallpaper");
      return;
    }

    setIsGenerating(true);
    
    try {
      const aspectRatio = sizeOptions.find(s => s.id === selectedSize)?.ratio || "9:16";
      
      const { data, error } = await supabase.functions.invoke('generate-wallpaper', {
        body: { 
          prompt: prompt.trim(),
          aspectRatio,
          inputImage: uploadedImage
        }
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

  const trackAIDownload = async () => {
    try {
      await supabase.from('wallpaper_downloads').insert({
        wallpaper_id: `ai-${Date.now()}`,
        wallpaper_title: prompt.slice(0, 50),
        category: 'AI Generated',
        is_ai_generated: true
      });
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    await trackAIDownload();

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-wallpaper-${selectedSize}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Wallpaper downloaded!", {
      description: "Go to Gallery → Select image → Set as wallpaper",
      duration: 5000,
    });
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

        {/* Size Selection */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Select Size:</p>
          <div className="flex gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                disabled={isGenerating}
                className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                  selectedSize === size.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:border-primary/50 text-muted-foreground"
                }`}
              >
                <size.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{size.label}</span>
                <span className="text-[10px] opacity-70">{size.ratio}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Upload Your Photo (Optional):</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
            disabled={isGenerating}
          />
          
          {uploadedImage ? (
            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-border">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="w-full h-full object-cover"
              />
              <button
                onClick={removeUploadedImage}
                className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                <span className="text-xs text-foreground">Photo uploaded ✓</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isGenerating}
              className="w-full h-24 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload photo</span>
            </button>
          )}
        </div>

        <Textarea
          placeholder={uploadedImage 
            ? "Describe how to transform your photo... (e.g., 'Make it look like a painting', 'Add sunset colors', 'Convert to anime style')"
            : "Describe your dream wallpaper... (e.g., 'Futuristic city at night with neon lights', 'Peaceful mountain lake at sunrise')"
          }
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
              {uploadedImage ? <Image className="w-5 h-5 mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
              {uploadedImage ? "Transform Photo" : "Generate Wallpaper"}
            </>
          )}
        </Button>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-full w-full h-full p-0 bg-background/95 backdrop-blur-xl border-0">
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            {/* Close Button */}
            <Button
              onClick={() => setShowPreview(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-card/80 backdrop-blur-sm hover:bg-card"
            >
              <X className="w-6 h-6" />
            </Button>

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
                <p className="text-sm text-muted-foreground">
                  {sizeOptions.find(s => s.id === selectedSize)?.label} ({sizeOptions.find(s => s.id === selectedSize)?.ratio})
                </p>
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