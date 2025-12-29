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
    const { city } = await req.json();

    if (!city) {
      return new Response(JSON.stringify({ error: 'City name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const OPENWEATHER_API_KEY = Deno.env.get('OPENWEATHER_API_KEY');
    if (!OPENWEATHER_API_KEY) {
      console.error('OPENWEATHER_API_KEY is not configured');
      throw new Error('Weather service not configured');
    }

    console.log('Fetching weather for city:', city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenWeather API error:', response.status, errorText);
      
      if (response.status === 404) {
        return new Response(JSON.stringify({ error: 'City not found. Please try another city.' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    const weatherData = {
      city: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      cloudCover: data.clouds.all,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      // Calculate approximate sunlight hours
      sunlightHours: Math.round(((data.sys.sunset - data.sys.sunrise) / 3600) * 10) / 10,
    };

    console.log('Weather data:', weatherData);

    return new Response(JSON.stringify(weatherData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in get-weather function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to fetch weather' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
