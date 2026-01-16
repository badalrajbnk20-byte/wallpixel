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
    const { prompt, aspectRatio = "9:16", inputImage } = await req.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid prompt provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating wallpaper with prompt:', prompt, 'aspectRatio:', aspectRatio, 'hasInputImage:', !!inputImage);

    // Get orientation description based on aspect ratio
    const orientationMap: Record<string, string> = {
      "9:16": "VERTICAL/PORTRAIT orientation (tall, like a phone screen)",
      "3:4": "PORTRAIT orientation (slightly tall, like a tablet)",
      "16:9": "HORIZONTAL/LANDSCAPE orientation (wide, like a desktop monitor)",
    };
    const orientationDesc = orientationMap[aspectRatio] || orientationMap["9:16"];

    // Build the message content
    let messageContent: any;

    if (inputImage) {
      // Image-to-image: Transform uploaded photo
      const enhancedPrompt = `Transform this image into a beautiful wallpaper with ${aspectRatio} aspect ratio (${orientationDesc}).

User's request: "${prompt}"

Requirements:
- Apply the transformation while maintaining the essence of the original image
- Make it suitable as a ${aspectRatio === "9:16" ? "mobile phone" : aspectRatio === "3:4" ? "tablet" : "desktop"} wallpaper
- NO text, words, or watermarks
- High quality, vibrant result
- Professional quality output`;

      messageContent = [
        { type: "text", text: enhancedPrompt },
        { type: "image_url", image_url: { url: inputImage } }
      ];
    } else {
      // Text-to-image: Generate new wallpaper
      const enhancedPrompt = `Generate a ${aspectRatio} aspect ratio wallpaper (${orientationDesc}) based on: "${prompt}".

Requirements:
- MUST be ${orientationDesc}
- NO text, words, letters, numbers or watermarks
- High quality, vibrant colors
- Beautiful composition for ${aspectRatio === "9:16" ? "phone" : aspectRatio === "3:4" ? "tablet" : "desktop"} home screen
- Professional quality image`;

      messageContent = enhancedPrompt;
    }

    // Call Lovable AI Gateway with image generation model
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-pro-image-preview',
        messages: [
          {
            role: 'user',
            content: messageContent
          }
        ],
        modalities: ['image', 'text'],
        image_generation_config: {
          aspect_ratio: aspectRatio
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate wallpaper' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the generated image from the response
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error('No image URL in response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'No image generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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