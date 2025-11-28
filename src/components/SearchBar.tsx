import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder="Search wallpapers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 h-12 bg-card border-border rounded-xl focus:ring-2 focus:ring-primary transition-all"
      />
    </div>
  );
};
