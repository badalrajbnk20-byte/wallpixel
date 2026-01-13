import { useState, useMemo } from "react";
import { wallpapers } from "@/data/wallpapers";
import { WallpaperCard } from "@/components/WallpaperCard";
import { WallpaperPreview } from "@/components/WallpaperPreview";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { AIWallpaperGenerator } from "@/components/AIWallpaperGenerator";
import { AdBox } from "@/components/AdBox";
import { Category, Wallpaper } from "@/types/wallpaper";
import { ImageIcon } from "lucide-react";

const categories: Category[] = ["All", "Nature", "Abstract", "Dark", "Minimal", "Colorful"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter((wallpaper) => {
      const matchesCategory = selectedCategory === "All" || wallpaper.category === selectedCategory;
      const matchesSearch = wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           wallpaper.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <ImageIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  WallPixel
                </h1>
                <p className="text-sm text-muted-foreground">Premium Wallpapers</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-2">
              <a href="/about" className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="/contact" className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
              <a href="/privacy" className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            </nav>
          </div>
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Top Ad */}
        <div className="mb-6">
          <AdBox size="large" />
        </div>

        {/* AI Wallpaper Generator */}
        <AIWallpaperGenerator />

        {/* Mid Ad */}
        <div className="my-6">
          <AdBox size="medium" />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredWallpapers.length} wallpaper{filteredWallpapers.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Wallpaper Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredWallpapers.map((wallpaper, index) => (
            <>
              <WallpaperCard
                key={wallpaper.id}
                wallpaper={wallpaper}
                onClick={() => handleWallpaperClick(wallpaper)}
              />
              {/* Insert ad after every 8 wallpapers */}
              {(index + 1) % 8 === 0 && index !== filteredWallpapers.length - 1 && (
                <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
                  <AdBox size="medium" />
                </div>
              )}
            </>
          ))}
        </div>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBox size="large" />
        </div>

        {/* Empty State */}
        {filteredWallpapers.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No wallpapers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WallPixel. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="/about" className="hover:text-primary transition-colors">About</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Wallpaper Preview Modal */}
      <WallpaperPreview
        wallpaper={selectedWallpaper}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default Index;
