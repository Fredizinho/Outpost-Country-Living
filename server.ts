import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Real-Time Malawi Regional Weather Endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const lat = req.query.lat ? parseFloat(req.query.lat as string) : -14.38;
    const lng = req.query.lng ? parseFloat(req.query.lng as string) : 34.33;
    const districtKey = (req.query.key as string) || 'dedza';
    const districtName = (req.query.name as string) || 'Dedza Highlands';
    const region = (req.query.region as string) || 'Central';
    const altitude = (req.query.altitude as string) || '1,600m';

    // Fetch Open-Meteo satellite weather API
    const omRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,precipitation_probability_max,uv_index_max&timezone=Africa%2FBlantyre`
    );

    if (!omRes.ok) {
      throw new Error(`Open-Meteo API returned status ${omRes.status}`);
    }

    const omData = await omRes.json();

    const getWeatherDescription = (code: number) => {
      if (code === 0) return { label: 'Clear Sky & Sun', icon: 'sun' };
      if (code === 1) return { label: 'Mainly Clear', icon: 'sun' };
      if (code === 2) return { label: 'Partly Cloudy', icon: 'cloud-sun' };
      if (code === 3) return { label: 'Overcast & Cloudy', icon: 'cloud' };
      if (code === 45 || code === 48) return { label: 'Highland Fog & Mist', icon: 'fog' };
      if (code >= 51 && code <= 55) return { label: 'Light Drizzle (Chiperoni)', icon: 'drizzle' };
      if (code >= 61 && code <= 65) return { label: 'Moderate Rain Showers', icon: 'rain' };
      if (code >= 80 && code <= 82) return { label: 'Heavy Rain Showers', icon: 'rain-heavy' };
      if (code >= 95 && code <= 99) return { label: 'Thunderstorms & Rain', icon: 'lightning' };
      return { label: 'Scattered Clouds', icon: 'cloud-sun' };
    };

    const currentW = getWeatherDescription(omData.current.weather_code);
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dailyFormatted = (omData.daily?.time || []).slice(0, 5).map((tStr: string, idx: number) => {
      const dDate = new Date(tStr);
      const dayName = idx === 0 ? 'Today' : days[dDate.getUTCDay()];
      const dDesc = getWeatherDescription(omData.daily.weather_code[idx]);
      return {
        date: tStr,
        dayOfWeek: dayName,
        weatherCode: omData.daily.weather_code[idx],
        weatherLabel: dDesc.label,
        weatherIcon: dDesc.icon,
        tempMaxC: Math.round(omData.daily.temperature_2m_max[idx]),
        tempMinC: Math.round(omData.daily.temperature_2m_min[idx]),
        precipSumMm: Math.round((omData.daily.precipitation_sum[idx] || 0) * 10) / 10,
        precipProbMax: omData.daily.precipitation_probability_max ? omData.daily.precipitation_probability_max[idx] : (omData.daily.precipitation_sum[idx] > 2 ? 80 : 20),
        uvIndexMax: omData.daily.uv_index_max ? Math.round(omData.daily.uv_index_max[idx]) : 8
      };
    });

    let advice = `Current atmospheric conditions in ${districtName} are stable. Good opportunity for land clearing, compost pitting, and ridge preparation.`;
    if (omData.current.precipitation > 1 || omData.daily.precipitation_sum[0] > 5) {
      advice = `Rainfall detected in ${districtName}. Check contour ridges and drainage channels to prevent topsoil erosion. Avoid heavy machinery on wet clay.`;
    } else if (omData.current.temperature_2m > 30) {
      advice = `High heat in ${districtName}. Priority on deep mulching to conserve root zone soil moisture and protect young fruit saplings.`;
    } else if (omData.current.relative_humidity_2m > 85) {
      advice = `High moisture/Chiperoni weather in ${districtName}. Monitor Irish potatoes, tomatoes, and beans for late blight fungal signs.`;
    }

    return res.json({
      districtKey,
      districtName,
      region,
      lat,
      lng,
      altitude,
      current: {
        tempC: Math.round(omData.current.temperature_2m),
        feelsLikeC: Math.round(omData.current.apparent_temperature),
        humidity: omData.current.relative_humidity_2m,
        windSpeedKmH: Math.round(omData.current.wind_speed_10m),
        windDirectionDeg: omData.current.wind_direction_10m,
        precipitationMm: omData.current.precipitation || 0,
        surfacePressureHpa: Math.round(omData.current.surface_pressure),
        weatherCode: omData.current.weather_code,
        weatherLabel: currentW.label,
        weatherIcon: currentW.icon,
        isDay: omData.current.is_day === 1
      },
      daily: dailyFormatted,
      agriculturalAdvice: advice,
      scoutingScore: omData.current.precipitation > 10 ? 4 : omData.current.temperature_2m > 34 ? 5 : 9,
      lastUpdated: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error: any) {
    console.error('Error fetching Malawi weather:', error);
    return res.status(500).json({ error: 'Failed to retrieve real-time weather data' });
  }
});

// AI Homestead Advisor Endpoint
app.post('/api/advisor', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAIClient();
    
    if (ai) {
      try {
        const systemInstruction = `You are the Outpost Living AI Sanctuary Advisor.
You specialize in helping families relocate from cities to self-sustaining country homesteads and sanctuaries in Malawi and Southern/East Africa.
Your knowledge covers:
- Land scouting, soil evaluation (red latosols, dambos, alluvial soils), water security (gravity-fed springs, boreholes, rainwater harvesting) across Malawi districts (Dedza, Mzimba, Mulanje, Zomba, Lilongwe, Mzuzu, Thyolo, etc.).
- Seasonal agricultural calendars (Rainy season planting Nov-Mar, Harvest Apr-Jun, Cold dry season Jul-Aug, Hot dry season Sep-Oct).
- Off-grid energy systems (Solar PV arrays, LiFePO4 batteries, micro-hydro).
- Inspired homestead counsel, community building, and practical skills (broadforking, seed saving, solar dehydration, bio-sand water filters).

Provide encouraging, practical, well-formatted markdown responses with actionable steps and local context.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
          ]
        });

        const reply = response.text || "I recommend evaluating local water access and soil structure before establishing permanent beds.";
        return res.json({ reply });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to regional knowledge engine:', geminiError?.message || geminiError);
        // Fall through to the intelligent fallback knowledge engine below
      }
    }

    // Intelligent fallback knowledge engine when GEMINI_API_KEY is not configured or unavailable
    const lower = message.toLowerCase();
    let reply = "I am your Outpost Living Advisor. Here is guidance based on regional sanctuary principles:\n\n";

    if (lower.includes('water') || lower.includes('well') || lower.includes('borehole') || lower.includes('rain')) {
      reply += "### 💧 Water Security in Malawi\n" +
        "- **Perennial Streams & Springs**: Priority #1 when scouting land in districts like Dedza, Mulanje, or Zomba. Look for year-round gravity flow.\n" +
        "- **Borehole Depth**: In central plateaus (Lilongwe, Kasungu), water tables average 25-40m. Solar submerged pumps (DC 24V/48V) are ideal.\n" +
        "- **Rain Catchment**: A 100sqm iron roof in Malawi can catch over 80,000 liters during the Nov-Mar rainy season. Install 5,000L tanks with leaf strainers.";
    } else if (lower.includes('soil') || lower.includes('crop') || lower.includes('maize') || lower.includes('potato') || lower.includes('farm') || lower.includes('plant')) {
      reply += "### 🌱 Soil & Crop Management in Malawi\n" +
        "- **Highland Zones (Dedza, Mzimba, Zomba)**: Cool climate ideal for Irish potatoes (*Mbatata zizungu*), beans (*Nyemba*), macadamia, and stone fruits.\n" +
        "- **Soil Building**: Heavy red *Katondo* latosols benefit immensely from deep mulching with vetiver grass, compost, and biochar without inverting subsoil.\n" +
        "- **Intercropping**: Plant maize (*Chimanga*) together with nitrogen-fixing beans (*Chimbamba*) and pumpkin ground cover (*Nkhwani*) to lock in soil moisture.";
    } else if (lower.includes('solar') || lower.includes('power') || lower.includes('battery') || lower.includes('electricity')) {
      reply += "### ☀️ Off-Grid Solar Power in Malawi\n" +
        "- **Sunlight Potential**: Malawi averages 7.5 to 9 peak sun hours daily, ranking among the world's best solar resources.\n" +
        "- **Recommended Setup**: 1.5kW to 3kW Solar Array paired with a 24V or 48V 100Ah LiFePO4 battery bank and a 3kVA Pure Sine Wave Inverter.\n" +
        "- **Priority Loads**: DC submersible borehole pump, efficient DC chest freezer, LED security lighting, and seed dehydration fans.";
    } else if (lower.includes('land') || lower.includes('district') || lower.includes('dedza') || lower.includes('mzimba') || lower.includes('mulanje') || lower.includes('zomba')) {
      reply += "### 📍 Regional Land Scouting in Malawi\n" +
        "- **Dedza & Ntcheu**: Cool climate, 1,400m - 1,800m altitude, high rainfall, rich volcanic-origin loam. Prime for seed production and potatoes.\n" +
        "- **Mzimba & Viphya**: High plateau with deep soils, vast space for timber agroforestry, livestock, and grains.\n" +
        "- **Mulanje & Thyolo**: High precipitation, deep red clay-loam, excellent for perennial gravity water, fruit orchards, and tea/coffee agroforestry.";
    } else if (lower.includes('law') || lower.includes('customary') || lower.includes('chief') || lower.includes('mfumu') || lower.includes('title')) {
      reply += "### 📜 Customary Land Protocols in Malawi\n" +
        "1. **Village Headman (*Mfumu ya Mudzi*)**: Present customary introduction (*Chikhalidwe*) and define boundaries (*Malire*).\n" +
        "2. **Group Village Headman (GVH) & Traditional Authority (TA)**: Validate that the parcel has no existing family disputes.\n" +
        "3. **Village Land Committee (VLC)**: Register the land under the Customary Land Act of 2016 for Customary Estate Certificate conversion.";
    } else {
      reply += "### 🌿 Country Exodus Principles\n" +
        "1. **Secure Land & Perennial Water**: Establish gravity water or borehole before building heavy structures.\n" +
        "2. **Store Essential Grains & Seeds**: Maintain at least 12 months of staple food and heirloom seeds (*Chimanga cha Makolo*).\n" +
        "3. **Learn Practical Hand Skills**: Broadforking, seed saving, solar food drying (*Mfutso*), and compressed earth block masonry.";
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error('AI Advisor Error:', error);
    res.status(500).json({ error: 'Failed to generate advice. Please try again.' });
  }
});

// Dedicated AI Map Scout with Google Maps Grounding
app.post('/api/scout-ai', async (req, res) => {
  try {
    const { 
      prompt, 
      district, 
      coordinates, 
      region, 
      altitude, 
      selectedAmenities, 
      activeLayers,
      mapBounds,
      zoomLevel,
      contextType = 'general',
      layerInsightsMode = false
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getAIClient();
    let lat = coordinates?.latitude ?? -14.38;
    let lng = coordinates?.longitude ?? 34.33;

    // Build context-aware prompt
    const locationContext = district 
      ? `Location Context: ${district}${region ? ` (${region} Region)` : ''}, Malawi. Coordinates: Lat ${lat}, Lng ${lng}.${altitude ? ` Altitude: ${altitude}.` : ''}`
      : `Location Context: Malawi countrywide (view center Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}, zoom level ${zoomLevel ?? 'standard'}).`;

    const amenitiesContext = selectedAmenities && selectedAmenities.length > 0
      ? `Active District Agricultural Crops: ${selectedAmenities.join(', ')}.`
      : '';

    // Active Map Layers Analysis
    let activeLayersContext = '';
    if (activeLayers && typeof activeLayers === 'object') {
      const activeList = Object.entries(activeLayers)
        .filter(([_, active]) => Boolean(active))
        .map(([name]) => {
          switch (name) {
            case 'waterSources': return '💧 Perennial Rivers & Streams (Catchments & Hydrology)';
            case 'arableLand': return '🌱 Arable Land & Katondo Red Loam (Soil Pedology)';
            case 'communitySettlements': return '⛪ Adventist Churches, Sanitariums & Rural Settlements';
            case 'rainfallIsohyets': return '🌧️ Rainfall Isohyets & Precipitation Gradients';
            case 'soilPedology': return '🧪 Soil pH & Pedology Classification';
            case 'elevationTiers': return '⛰️ Elevation Tiers & Thermal Belts';
            case 'catchmentBasins': return '🌊 Major Catchment Drainage Basins';
            case 'riftEscarpments': return '⚠️ Rift Valley Escarpments & Slope Terraces';
            case 'customaryBoundaries': return '📜 Customary T/A Boundaries (Malire & Tribal Land Tenure)';
            case 'districtBoundaries': return '🏛️ District Administrative Boundaries';
            default: return name;
          }
        });

      if (activeList.length > 0) {
        activeLayersContext = `\nActive Selected Map Layers:\n${activeList.map(l => `- ${l}`).join('\n')}\n`;
      }
    }

    const boundsContext = mapBounds
      ? `Current Map Bounds: North ${mapBounds.north?.toFixed(3)}, South ${mapBounds.south?.toFixed(3)}, East ${mapBounds.east?.toFixed(3)}, West ${mapBounds.west?.toFixed(3)}.`
      : '';

    const systemPrompt = `You are the Outpost Living AI Geospatial Scout & Country Living Agronomist for Malawi.
You specialize in geospatial analysis for country living, Seventh-day Adventist outpost sanctuary scouting, permaculture design, perennial water security, road accessibility, and community hubs in Malawi.

${locationContext}
${boundsContext}
${amenitiesContext}
${activeLayersContext}

When answering:
1. Provide accurate geographic, microclimatic, agricultural, and infrastructural guidance for the selected area and visible map layers in Malawi.
2. If layer insights were requested, explicitly address each ACTIVE map layer:
   - For Water: specify perennial river intake, borehole aquifer depths (15m-60m), gravity water feed feasibility, and seasonal wetland buffer zones.
   - For Arable Soil: analyze deep Katondo red loam vs. dambo wetland edge cultivation, pH (5.8-6.5), organic amendments, and orchard suitability.
   - For Community & Settlements: evaluate proximity to Adventist churches/missions, rural community self-reliance networks, and peaceful distance from urban vice.
   - For Elevation & Escarpments: assess frost-free thermal belts (1,200m - 1,600m), slope terracing, and flood safety.
   - For Customary Malire: explain Customary Land Act procedures (Chief/T.A. allocation, Village Land Committee consent, District Land Registry conversion).
3. If referencing specific towns, clinics, markets, churches, rivers, mountains, or bomas, mention their real local context.
4. Structure the response clearly with markdown headers (###, ####), concise bullet points, and practical "Country Living Homestead Recommendations".`;

    const fullPrompt = `${systemPrompt}\n\nUser Query: ${prompt}`;

    if (ai) {
      try {
        // Use gemini-3.8-flash with Google Maps grounding tool
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            tools: [{ googleMaps: {} }],
            toolConfig: {
              retrievalConfig: {
                latLng: {
                  latitude: lat,
                  longitude: lng,
                }
              }
            }
          }
        });

        const answer = response.text || 'No response generated from AI Scout.';

        // Extract grounding chunks from response
        const groundingSources: Array<{
          title?: string;
          uri: string;
          sourceType: 'maps' | 'web';
          snippet?: string;
        }> = [];

        const candidate = response.candidates?.[0];
        const groundingChunks = candidate?.groundingMetadata?.groundingChunks;

        if (Array.isArray(groundingChunks)) {
          for (const chunk of groundingChunks) {
            // Check Google Maps grounding
            if ((chunk as any).maps) {
              const mapsData = (chunk as any).maps;
              if (mapsData.uri) {
                groundingSources.push({
                  title: mapsData.title || 'Google Maps Location',
                  uri: mapsData.uri,
                  sourceType: 'maps',
                  snippet: mapsData.placeAnswerSources?.reviewSnippets?.[0] || undefined
                });
              }
            } else if ((chunk as any).web) {
              const webData = (chunk as any).web;
              if (webData.uri) {
                groundingSources.push({
                  title: webData.title || 'Web Grounding Reference',
                  uri: webData.uri,
                  sourceType: 'web'
                });
              }
            }
          }
        }

        // Suggested follow-up map queries
        const suggestedActions = [
          `Inspect perennial water sources around ${district || 'this area'}`,
          `Analyze soil fertility & arable slope suitability`,
          `Check nearest Adventist church & health facility hubs`,
          `Examine all-weather road access & market bomas`
        ];

        return res.json({
          answer,
          model: 'gemini-3.8-flash',
          groundedWithMaps: true,
          groundingSources,
          suggestedActions,
          coordinates: { latitude: lat, longitude: lng }
        });
      } catch (geminiError: any) {
        console.warn('Gemini Maps Grounding failed or was blocked, falling back to regional knowledge:', geminiError?.message || geminiError);
        // Fallback to text generation if maps grounding fails or fallback synthesis
      }
    }

    // Fallback response with structured local geospatial intelligence
    const targetDistrict = district || 'Dedza Highlands';
    const fallbackAnswer = `### 🛰️ Geospatial Scout Analysis for ${targetDistrict}
    
**Location Coordinates**: Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)} ${altitude ? `• Altitude: ${altitude}` : ''}

#### 💧 Water Security & Hydrology
- **Catchment Basin**: Located within the Lake Malawi / Shire River drainage network.
- **Living Streams**: Perennial spring and gravity-fed potential is highest above 1,300m ASL.
- **Borehole Aquifer**: Typical drilling depth ranges between 30m to 50m in plateau areas; water quality is predominantly sweet with low mineral hardness.

#### 🌱 Soil & Agronomic Potential
- **Soil Classification**: Deep *Katondo* red clay-loam soils with slightly acidic to neutral pH (6.0–6.5), rich in iron and aluminium oxides.
- **Crop Suitability**: Optimal for Irish potatoes (*Solanum tuberosum*), legumes (soya, common beans), heirloom maize, brassicas, macadamia, and stone fruit orchards.
- **Microclimate**: Cool night temperatures reduce pest pressure and promote root crop sweetness.

#### ⛪ Community & Outpost Infrastructure
- **Adventist Presence**: Proximity to established SDA congregations, health clinics, and rural mission centers.
- **Market Corridors**: Feeder roads link agricultural produce to regional trading centers along main arterial highways.

*Tip: For live satellite verification, toggle the Satellite Aerial layer on the Scout Map dock.*`;

    return res.json({
      answer: fallbackAnswer,
      model: 'regional-fallback-scout',
      groundedWithMaps: false,
      groundingSources: [
        {
          title: `Google Maps: ${targetDistrict}, Malawi`,
          uri: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
          sourceType: 'maps'
        }
      ],
      suggestedActions: [
        `Inspect perennial water sources around ${targetDistrict}`,
        `Analyze soil fertility & arable slope suitability`,
        `Check nearest Adventist church & health facility hubs`
      ],
      coordinates: { latitude: lat, longitude: lng }
    });
  } catch (error: any) {
    console.error('Scout AI Error:', error);
    return res.status(500).json({ error: 'Failed to complete Scout AI geospatial analysis' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Outpost Living server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
