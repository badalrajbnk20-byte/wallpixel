import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, aspectRatio = "9:16" } = await req.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid prompt provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating wallpaper with prompt:', prompt, 'aspectRatio:', aspectRatio);

    // Calculate dimensions based on aspect ratio
    let width: number, height: number;
    switch (aspectRatio) {
      case "9:16": // Mobile
        width = 720;
        height = 1280;
        break;
      case "3:4": // Tablet
        width = 960;
        height = 1280;
        break;
      case "16:9": // Desktop
        width = 1920;
        height = 1080;
        break;
      default:
        width = 720;
        height = 1280;
    }

    // Check if user wants their name/text on wallpaper
    const wantsText = /\b(naam|name|text|likhna|likho|लिखो|नाम)\b/i.test(prompt);
    const wants3D = /\b(3d|3-d|three\s*d|थ्री\s*डी)\b/i.test(prompt);
    
    let enhancedPrompt = prompt;
    
    // Add style instructions
    if (wants3D) {
      enhancedPrompt += ", stunning 3D style with depth, shadows, lighting effects, dimensional appearance";
    }
    
    if (wantsText) {
      enhancedPrompt += ", artistic text typography as main focus, beautiful lettering design";
    } else {
      enhancedPrompt += ", no text no words no letters no watermarks";
    }
    
    // Add quality modifiers
    enhancedPrompt += ", ultra high quality, 8k, detailed, vibrant colors, beautiful wallpaper, professional photography";

    // Use Pollinations.ai - FREE, no API key needed!
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${Date.now()}`;

    console.log('Fetching from Pollinations:', pollinationsUrl);

    // Fetch the image to verify it works
    const imageResponse = await fetch(pollinationsUrl);
    
    if (!imageResponse.ok) {
      console.error('Pollinations error:', imageResponse.status);
      return new Response(
        JSON.stringify({ error: 'Failed to generate wallpaper. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert image to base64
    const imageBlob = await imageResponse.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);
    const imageUrl = `data:image/jpeg;base64,${base64}`;

    console.log('Wallpaper generated successfully!');

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating wallpaper:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});