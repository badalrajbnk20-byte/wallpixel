import { Wallpaper } from "@/types/wallpaper";

import nature1 from "@/assets/wallpapers/nature-1.jpg";
import nature2 from "@/assets/wallpapers/nature-2.jpg";
import abstract1 from "@/assets/wallpapers/abstract-1.jpg";
import abstract2 from "@/assets/wallpapers/abstract-2.jpg";
import dark1 from "@/assets/wallpapers/dark-1.jpg";
import dark2 from "@/assets/wallpapers/dark-2.jpg";
import minimal1 from "@/assets/wallpapers/minimal-1.jpg";
import minimal2 from "@/assets/wallpapers/minimal-2.jpg";
import colorful1 from "@/assets/wallpapers/colorful-1.jpg";
import colorful2 from "@/assets/wallpapers/colorful-2.jpg";

export const wallpapers: Wallpaper[] = [
  {
    id: "1",
    title: "Mountain Sunset",
    category: "Nature",
    imageUrl: nature1,
    thumbnail: nature1,
    downloads: 1543,
  },
  {
    id: "2",
    title: "Tropical Paradise",
    category: "Nature",
    imageUrl: nature2,
    thumbnail: nature2,
    downloads: 2187,
  },
  {
    id: "3",
    title: "Liquid Flow",
    category: "Abstract",
    imageUrl: abstract1,
    thumbnail: abstract1,
    downloads: 3421,
  },
  {
    id: "4",
    title: "Neon Geometry",
    category: "Abstract",
    imageUrl: abstract2,
    thumbnail: abstract2,
    downloads: 2856,
  },
  {
    id: "5",
    title: "Pure Minimalism",
    category: "Dark",
    imageUrl: dark1,
    thumbnail: dark1,
    downloads: 4123,
  },
  {
    id: "6",
    title: "Cosmic Nebula",
    category: "Dark",
    imageUrl: dark2,
    thumbnail: dark2,
    downloads: 3987,
  },
  {
    id: "7",
    title: "Soft Gradient",
    category: "Minimal",
    imageUrl: minimal1,
    thumbnail: minimal1,
    downloads: 2341,
  },
  {
    id: "8",
    title: "Pastel Shapes",
    category: "Minimal",
    imageUrl: minimal2,
    thumbnail: minimal2,
    downloads: 1876,
  },
  {
    id: "9",
    title: "Paint Splash",
    category: "Colorful",
    imageUrl: colorful1,
    thumbnail: colorful1,
    downloads: 3654,
  },
  {
    id: "10",
    title: "Neon City",
    category: "Colorful",
    imageUrl: colorful2,
    thumbnail: colorful2,
    downloads: 4532,
  },
];
