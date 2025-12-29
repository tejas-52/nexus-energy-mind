import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      panelCount, 
      panelCapacityWatts, 
      panelEfficiency, 
      panelTilt, 
      panelOrientation,
      location,
      temperature,
      sunlightHours,
      cloudCover,
      month
    } = await req.json();

    console.log('Received prediction request:', { 
      panelCount, panelCapacityWatts, panelEfficiency, panelTilt, 
      panelOrientation, location, temperature, sunlightHours, cloudCover, month 
    });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('AI service not configured');
    }

    const systemPrompt = `You are an expert solar energy prediction AI trained on Indian solar irradiance data and weather patterns. 
Your task is to predict daily and monthly solar energy generation based on the provided parameters.

Consider these factors for accurate prediction:
1. Panel specifications: count, capacity (watts), efficiency (%), tilt angle, orientation
2. Location-specific solar irradiance data for India (different cities have different solar potential)
3. Temperature coefficient: solar panels typically lose 0.3-0.5% efficiency per degree above 25°C
4. Cloud cover impact: reduces output proportionally
5. Seasonal variations in India (monsoon, winter, summer)
6. Indian cities solar potential (Rajasthan highest ~6 kWh/m²/day, Northeast lowest ~4 kWh/m²/day)

Always respond with a valid JSON object containing:
{
  "dailyGeneration": number (in kWh),
  "monthlyGeneration": number (in kWh),
  "yearlyEstimate": number (in kWh),
  "monthlySavings": number (in INR, assuming ₹8/kWh),
  "yearlySavings": number (in INR),
  "efficiency": number (actual efficiency %),
  "peakHours": string (best generation hours),
  "recommendations": string[] (3-4 tips to optimize),
  "carbonOffset": number (kg CO₂ saved monthly, 0.82 kg per kWh),
  "confidence": number (0-100%)
}`;

    const userPrompt = `Predict solar energy generation for the following setup in India:

Location: ${location || 'Delhi, India'}
Panel Count: ${panelCount || 10} panels
Panel Capacity: ${panelCapacityWatts || 400} watts each
Panel Efficiency: ${panelEfficiency || 20}%
Panel Tilt: ${panelTilt || 28}° (latitude tilt)
Panel Orientation: ${panelOrientation || 180}° (South-facing)
Average Temperature: ${temperature || 32}°C
Average Sunlight Hours: ${sunlightHours || 5.5} hours/day
Cloud Cover: ${cloudCover || 20}%
Month: ${month || 'Average'}

Calculate realistic energy predictions considering Indian weather patterns and electricity rates.`;

    console.log('Calling AI gateway for prediction...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add funds to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log('AI response received:', content);

    // Parse the JSON from the response
    let prediction;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      prediction = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return a calculated fallback
      const systemCapacity = (panelCount || 10) * (panelCapacityWatts || 400) / 1000; // kW
      const dailyGen = systemCapacity * (sunlightHours || 5.5) * ((panelEfficiency || 20) / 100) * (1 - (cloudCover || 20) / 100);
      
      prediction = {
        dailyGeneration: Math.round(dailyGen * 100) / 100,
        monthlyGeneration: Math.round(dailyGen * 30 * 100) / 100,
        yearlyEstimate: Math.round(dailyGen * 365 * 100) / 100,
        monthlySavings: Math.round(dailyGen * 30 * 8),
        yearlySavings: Math.round(dailyGen * 365 * 8),
        efficiency: panelEfficiency || 20,
        peakHours: "10:00 AM - 3:00 PM",
        recommendations: [
          "Ensure panels are cleaned regularly to maintain efficiency",
          "Consider adding a solar tracker for 15-25% more generation",
          "Monitor inverter performance monthly"
        ],
        carbonOffset: Math.round(dailyGen * 30 * 0.82),
        confidence: 75
      };
    }

    console.log('Returning prediction:', prediction);

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in predict-energy function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Prediction failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
