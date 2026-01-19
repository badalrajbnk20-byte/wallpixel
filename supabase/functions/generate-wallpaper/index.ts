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
    
    // Add quality modifiers for wallpaper
    enhancedPrompt += `, ultra high quality ${aspectRatio} wallpaper, 8k resolution, stunning colors, professional photography, beautiful composition`;

    // Use Lovable AI with Gemini for HIGH QUALITY image generation
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating with Lovable AI Gemini:', enhancedPrompt);

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: `Generate a beautiful ${width}x${height} wallpaper: ${enhancedPrompt}`
          }
        ],
        modalities: ['image', 'text']
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate wallpaper. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    console.log('AI Response received');

    // Extract image from response
    const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error('No image in response:', JSON.stringify(aiData));
      return new Response(
        JSON.stringify({ error: 'No image generated. Please try a different prompt.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Wallpaper generated successfully with Gemini!');

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