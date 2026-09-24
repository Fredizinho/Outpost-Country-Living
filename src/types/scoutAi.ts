export interface GroundingSource {
  title?: string;
  uri: string;
  sourceType: 'maps' | 'web';
  snippet?: string;
}

export interface ScoutAiAnalysisRequest {
  prompt: string;
  district?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  region?: string;
  altitude?: string;
  selectedAmenities?: string[];
  contextType?: 'district' | 'parcel' | 'settlement' | 'general';
}

export interface ScoutAiAnalysisResponse {
  answer: string;
  model: string;
  groundedWithMaps: boolean;
  groundingSources: GroundingSource[];
  suggestedActions?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
