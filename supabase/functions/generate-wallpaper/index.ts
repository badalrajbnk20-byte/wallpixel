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

    // Extract name/text from prompt if user wants it on wallpaper
    const nameMatch = prompt.match(/(?:naam|name|text|नाम)\s*[:\-]?\s*['"]?([A-Za-z\s\u0900-\u097F]+?)['"]?\s*(?:ka|ki|ke|का|की|के|wallpaper|banao|bana|बनाओ|likho|लिखो|$)/i);
    const wantsText = nameMatch || /\b(naam|name|text|likhna|likho|लिखो|नाम)\b/i.test(prompt);
    const wants3D = /\b(3d|3-d|three\s*d|थ्री\s*डी)\b/i.test(prompt);

    let enhancedPrompt = '';
    
    if (wantsText && nameMatch && nameMatch[1]) {
      // User wants specific text - be VERY explicit about exact spelling
      const exactName = nameMatch[1].trim();
      enhancedPrompt = `Create a stunning wallpaper with the text "${exactName}" written EXACTLY as shown in quotes. ` +
        `The text must be spelled EXACTLY as: ${exactName.split('').join('-')}. ` +
        `Style: elegant 3D golden metallic typography, dramatic lighting, ` +
        `beautiful decorative background with leaves and rich colors. ` +
        `CRITICAL: Write ONLY "${exactName}" - no other text, no variations, no extra letters.`;
    } else if (wantsText) {
      // Generic text request
      enhancedPrompt = prompt + ", artistic text typography as main focus, beautiful lettering design, SPELL TEXT EXACTLY AS GIVEN";
    } else {
      // No text wanted
      enhancedPrompt = prompt + ", no text no words no letters no watermarks";
    }

    // Add style instructions
    if (wants3D && !nameMatch) {
      enhancedPrompt += ", stunning 3D style with depth, shadows, lighting effects, dimensional appearance";
    }

    // Add quality modifiers for wallpaper
    enhancedPrompt += `, ultra high quality ${aspectRatio} wallpaper, sharp details, stunning colors, professional composition`;

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    // Helper: free fallback (no credits)
    const generateWithPollinations = async (reason: string) => {
      const encodedPrompt = encodeURIComponent(enhancedPrompt);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${Date.now()}`;

      console.log('Falling back to Pollinations:', reason);
      const imgResp = await fetch(pollinationsUrl);
      if (!imgResp.ok) {
        console.error('Pollinations error:', imgResp.status);
        throw new Error('Free generator failed');
      }

      return {
        imageUrl: pollinationsUrl,
        warning: `Free mode used (${reason}). Quality vary kar sakti hai.`,
      };
    };

    // If Gemini API key missing, use free fallback
    if (!GEMINI_API_KEY) {
      console.log('GEMINI_API_KEY not found, using free fallback');
      const fallback = await generateWithPollinations('Gemini API key not configured');
      return new Response(JSON.stringify(fallback), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating with Google Gemini API:', enhancedPrompt);

    // Use Google Gemini API directly with user's API key
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a beautiful ${width}x${height} wallpaper image: ${enhancedPrompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);

      // If API key invalid or quota exceeded, use free fallback
      if (geminiResponse.status === 403 || geminiResponse.status === 429) {
        const fallback = await generateWithPollinations('Gemini quota exceeded or invalid key');
        return new Response(JSON.stringify(fallback), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ error: 'Failed to generate wallpaper. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response received');

    // Extract image from Gemini response
    const parts = geminiData.candidates?.[0]?.content?.parts || [];
    let imageData: string | null = null;

    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith('image/')) {
        imageData = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageData) {
      console.error('No image in Gemini response:', JSON.stringify(geminiData));
      // Fallback to Pollinations if no image generated
      const fallback = await generateWithPollinations('Gemini did not return image');
      return new Response(JSON.stringify(fallback), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Wallpaper generated successfully with Gemini!');

    return new Response(JSON.stringify({ imageUrl: imageData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating wallpaper:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});