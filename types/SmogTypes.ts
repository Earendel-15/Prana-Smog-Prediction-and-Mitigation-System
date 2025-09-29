
export interface AirQualityData {
  id: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  aqi: number; // Air Quality Index (0-500)
  pm25: number; // PM2.5 concentration
  pm10: number; // PM10 concentration
  no2: number; // Nitrogen dioxide
  so2: number; // Sulfur dioxide
  co: number; // Carbon monoxide
  o3: number; // Ozone
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
}

export interface SmogPrediction {
  id: string;
  timestamp: Date;
  location: string;
  predictedAQI: number;
  confidence: number; // 0-100%
  timeRange: '1h' | '6h' | '12h' | '24h' | '48h' | '72h';
  factors: string[];
  recommendations: string[];
}

export interface MitigationStrategy {
  id: string;
  title: string;
  description: string;
  category: 'traffic' | 'industrial' | 'residential' | 'emergency';
  effectiveness: number; // 0-100%
  implementationTime: string;
  cost: 'low' | 'medium' | 'high';
  impact: string;
  icon: string;
}

export interface AlertLevel {
  level: 'good' | 'moderate' | 'unhealthy_sensitive' | 'unhealthy' | 'very_unhealthy' | 'hazardous';
  color: string;
  description: string;
  recommendations: string[];
}

export type AQILevel = 'good' | 'moderate' | 'unhealthy_sensitive' | 'unhealthy' | 'very_unhealthy' | 'hazardous';
