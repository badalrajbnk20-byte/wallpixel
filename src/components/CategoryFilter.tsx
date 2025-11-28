import { Category } from "@/types/wallpaper";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={activeCategory === category ? "default" : "outline"}
          className={`whitespace-nowrap transition-all duration-300 ${
            activeCategory === category
              ? "bg-gradient-primary text-primary-foreground shadow-glow"
              : "bg-card hover:bg-muted border-border"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
