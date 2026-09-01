const fs = require('fs');

async function buildGeoData() {
  const urlC = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson";
  const urlL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_lakes.geojson";
  const urlD = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson";

  console.log("Fetching GeoJSON boundaries from Natural Earth...");
  const [resC, resL, resD] = await Promise.all([fetch(urlC), fetch(urlL), fetch(urlD)]);
  const countries = await resC.json();
  const lakes = await resL.json();
  const districts = await resD.json();

  const malawiCountry = countries.features.find(f => f.properties.ISO_A3 === "MWI" || f.properties.NAME === "Malawi");
  const lakeMalawi = lakes.features.find(f => f.properties.name && f.properties.name.includes("Malawi"));
  const lakeChilwa = lakes.features.find(f => f.properties.name && f.properties.name.includes("Chilwa"));

  const malawiDistricts = districts.features.filter(f => f.properties.adm0_a3 === "MWI" || f.properties.admin === "Malawi");

  const NORTHERN_NAMES = ["Chitipa", "Karonga", "Rumphi", "Mzimba", "Nkhata Bay", "Likoma"];
  const CENTRAL_NAMES = ["Kasungu", "Ntchisi", "Dowa", "Mchinji", "Lilongwe", "Salima", "Nkhotakota", "Dedza", "Ntcheu"];

  function simplifyRing(ring, minDist = 0.03) {
    if (!ring || ring.length === 0) return [];
    const res = [ring[0]];
    let last = ring[0];
    for (let i = 1; i < ring.length; i++) {
      const pt = ring[i];
      const dx = pt[0] - last[0];
      const dy = pt[1] - last[1];
      if (Math.sqrt(dx * dx + dy * dy) >= minDist || i === ring.length - 1) {
        res.push([Number(pt[0].toFixed(4)), Number(pt[1].toFixed(4))]);
        last = pt;
      }
    }
    return res;
  }

  function simplifyGeometry(geom, minDist = 0.03) {
    if (geom.type === "Polygon") {
      return {
        type: "Polygon",
        coordinates: geom.coordinates.map(r => simplifyRing(r, minDist))
      };
    } else if (geom.type === "MultiPolygon") {
      return {
        type: "MultiPolygon",
        coordinates: geom.coordinates.map(poly => poly.map(r => simplifyRing(r, minDist)))
      };
    }
    return geom;
  }

  const countryGeom = simplifyGeometry(malawiCountry.geometry, 0.035);
  const lakeMalawiGeom = simplifyGeometry(lakeMalawi.geometry, 0.025);
  const lakeChilwaGeom = lakeChilwa ? simplifyGeometry(lakeChilwa.geometry, 0.025) : null;

  const northernGeoms = [];
  const centralGeoms = [];
  const southernGeoms = [];

  malawiDistricts.forEach(d => {
    const name = d.properties.name;
    const simplified = simplifyGeometry(d.geometry, 0.035);
    if (NORTHERN_NAMES.includes(name)) northernGeoms.push({ name, geometry: simplified });
    else if (CENTRAL_NAMES.includes(name)) centralGeoms.push({ name, geometry: simplified });
    else southernGeoms.push({ name, geometry: simplified });
  });

  const fileContent = `// Public Domain / Natural Earth 10m simplified geographic boundary data for Malawi
export interface GeoPoint {
  lng: number;
  lat: number;
}

export type RingCoords = [number, number][]; // [lng, lat]
export type PolygonCoords = RingCoords[];
export type MultiPolygonCoords = PolygonCoords[];

export interface GeoFeatureGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: PolygonCoords | MultiPolygonCoords;
}

export const MAP_BOUNDS = {
  minLng: 32.40,
  maxLng: 36.10,
  minLat: -17.25,
  maxLat: -9.20,
};

/**
 * Projects a geographic lat/lng coordinate to SVG viewBox coordinates
 * using an equirectangular projection tuned for Malawi (centered ~13.25° S).
 */
export function projectGeoToSvg(
  lat: number,
  lng: number,
  viewBoxWidth: number = 320,
  viewBoxHeight: number = 550,
  padding: number = 22
): { x: number; y: number } {
  const midLatRad = (-13.25 * Math.PI) / 180;
  const cosMidLat = Math.cos(midLatRad); // ~0.97337

  const usableWidth = viewBoxWidth - padding * 2;
  const usableHeight = viewBoxHeight - padding * 2;

  const geoWidth = (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng) * cosMidLat;
  const geoHeight = MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat;

  const scale = Math.min(usableWidth / geoWidth, usableHeight / geoHeight);

  const xOffset = padding + (usableWidth - geoWidth * scale) / 2;
  const yOffset = padding + (usableHeight - geoHeight * scale) / 2;

  const x = xOffset + (lng - MAP_BOUNDS.minLng) * cosMidLat * scale;
  const y = yOffset + (MAP_BOUNDS.maxLat - lat) * scale;

  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

/**
 * Converts a GeoJSON Polygon or MultiPolygon geometry into an SVG path "d" string
 */
export function geoGeometryToSvgPath(
  geom: GeoFeatureGeometry,
  viewBoxWidth: number = 320,
  viewBoxHeight: number = 550,
  padding: number = 22
): string {
  const convertRing = (ring: RingCoords) => {
    return ring
      .map((pt, idx) => {
        const { x, y } = projectGeoToSvg(pt[1], pt[0], viewBoxWidth, viewBoxHeight, padding);
        return \`\${idx === 0 ? 'M' : 'L'} \${x} \${y}\`;
      })
      .join(' ') + ' Z';
  };

  if (geom.type === 'Polygon') {
    return (geom.coordinates as PolygonCoords).map(convertRing).join(' ');
  } else if (geom.type === 'MultiPolygon') {
    return (geom.coordinates as MultiPolygonCoords)
      .map((poly) => poly.map(convertRing).join(' '))
      .join(' ');
  }
  return '';
}

export const MALAWI_COUNTRY_GEOMETRY: GeoFeatureGeometry = ${JSON.stringify(countryGeom, null, 2)};

export const LAKE_MALAWI_GEOMETRY: GeoFeatureGeometry = ${JSON.stringify(lakeMalawiGeom, null, 2)};

${lakeChilwaGeom ? `export const LAKE_CHILWA_GEOMETRY: GeoFeatureGeometry = ${JSON.stringify(lakeChilwaGeom, null, 2)};` : ''}

export const NORTHERN_REGION_GEOMETRIES: GeoFeatureGeometry[] = ${JSON.stringify(northernGeoms.map(g => g.geometry), null, 2)};

export const CENTRAL_REGION_GEOMETRIES: GeoFeatureGeometry[] = ${JSON.stringify(centralGeoms.map(g => g.geometry), null, 2)};

export const SOUTHERN_REGION_GEOMETRIES: GeoFeatureGeometry[] = ${JSON.stringify(southernGeoms.map(g => g.geometry), null, 2)};

export const MALAWI_RIVERS = [
  {
    name: 'Shire River',
    points: [
      { lat: -14.47, lng: 35.26 },
      { lat: -15.06, lng: 35.23 },
      { lat: -15.80, lng: 34.80 },
      { lat: -16.03, lng: 34.80 },
      { lat: -16.50, lng: 35.05 },
      { lat: -16.92, lng: 35.26 }
    ]
  },
  {
    name: 'Bua River',
    points: [
      { lat: -13.20, lng: 33.20 },
      { lat: -13.00, lng: 33.50 },
      { lat: -12.80, lng: 34.10 },
      { lat: -12.75, lng: 34.28 }
    ]
  },
  {
    name: 'Linthipe River',
    points: [
      { lat: -14.40, lng: 34.00 },
      { lat: -14.15, lng: 34.30 },
      { lat: -13.90, lng: 34.60 }
    ]
  },
  {
    name: 'South Rukuru River',
    points: [
      { lat: -12.20, lng: 33.70 },
      { lat: -11.50, lng: 33.50 },
      { lat: -10.75, lng: 34.18 }
    ]
  }
];

export const MALAWI_MOUNTAIN_PEAKS = [
  { name: 'Nyika Plateau', lat: -10.55, lng: 33.80 },
  { name: 'Viphya Range', lat: -11.85, lng: 33.85 },
  { name: 'Kasungu Hill', lat: -13.03, lng: 33.48 },
  { name: 'Dedza Mountain', lat: -14.37, lng: 34.33 },
  { name: 'Zomba Plateau', lat: -15.35, lng: 35.30 },
  { name: 'Mulanje Massif', lat: -15.95, lng: 35.58 }
];
`;

  fs.writeFileSync('src/data/malawiGeoData.ts', fileContent);
  console.log('Successfully wrote src/data/malawiGeoData.ts');
}

buildGeoData();
