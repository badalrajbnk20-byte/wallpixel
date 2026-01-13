-- Create table to track wallpaper downloads
CREATE TABLE public.wallpaper_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallpaper_id TEXT NOT NULL,
  wallpaper_title TEXT NOT NULL,
  category TEXT,
  is_ai_generated BOOLEAN DEFAULT false,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow all inserts for tracking)
ALTER TABLE public.wallpaper_downloads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert download records (public tracking)
CREATE POLICY "Anyone can record downloads"
ON public.wallpaper_downloads
FOR INSERT
WITH CHECK (true);

-- Allow reading download stats (for analytics)
CREATE POLICY "Anyone can view download stats"
ON public.wallpaper_downloads
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_wallpaper_downloads_wallpaper_id ON public.wallpaper_downloads(wallpaper_id);
CREATE INDEX idx_wallpaper_downloads_downloaded_at ON public.wallpaper_downloads(downloaded_at);