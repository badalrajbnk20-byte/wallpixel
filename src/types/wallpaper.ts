export interface Wallpaper {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  thumbnail: string;
  downloads: number;
}

export type Category = "All" | "Nature" | "Abstract" | "Dark" | "Minimal" | "Colorful";
