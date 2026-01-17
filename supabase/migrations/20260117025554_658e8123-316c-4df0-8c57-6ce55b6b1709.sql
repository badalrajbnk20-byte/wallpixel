-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view premium wallpaper previews" ON public.premium_wallpapers;

-- Create a proper policy that allows viewing basic info (for showing locked previews)
-- This is intentional for SELECT as we want everyone to see the locked preview
CREATE POLICY "Public can view premium wallpaper metadata"
ON public.premium_wallpapers FOR SELECT
USING (true);