
import { AirQualityData, SmogPrediction, MitigationStrategy, AlertLevel } from '../types/SmogTypes';

export const mockAirQualityData: AirQualityData[] = [
  {
    id: '1',
    timestamp: new Date(),
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: 'Delhi'
    },
    aqi: 185,
    pm25: 95.5,
    pm10: 145.2,
    no2: 62.1,
    so2: 18.5,
    co: 2.8,
    o3: 45.3,
    temperature: 28,
    humidity: 45,
    windSpeed: 6,
    windDirection: 270
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000),
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      name: 'Delhi'
    },
    aqi: 198,
    pm25: 108.1,
    pm10: 158.7,
    no2: 68.4,
    so2: 22.2,
    co: 3.1,
    o3: 42.1,
    temperature: 29,
    humidity: 42,
    windSpeed: 4,
    windDirection: 285
  }
];

export const mockPredictions: SmogPrediction[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() + 3600000),
    location: 'Delhi',
    predictedAQI: 165,
    confidence: 87,
    timeRange: '1h',
    factors: ['Wind speed increase', 'Temperature drop expected'],
    recommendations: ['Avoid outdoor activities', 'Keep windows closed', 'Use air purifiers']
  },
  {
    id: '2',
    timestamp: new Date(Date.now() + 21600000),
    location: 'Delhi',
    predictedAQI: 220,
    confidence: 82,
    timeRange: '6h',
    factors: ['Evening traffic surge', 'Crop burning nearby', 'Low wind conditions'],
    recommendations: ['Stay indoors', 'Wear N95 masks if going out', 'Avoid all outdoor exercise']
  },
  {
    id: '3',
    timestamp: new Date(Date.now() + 86400000),
    location: 'Delhi',
    predictedAQI: 145,
    confidence: 75,
    timeRange: '24h',
    factors: ['Rain expected tomorrow', 'Wind direction change'],
    recommendations: ['Air quality may improve', 'Still limit outdoor exposure', 'Monitor updates']
  }
];

export const mockMitigationStrategies: MitigationStrategy[] = [
  {
    id: '1',
    title: 'Odd-Even Vehicle Scheme',
    description: 'Implement alternate day vehicle restrictions based on license plate numbers to reduce vehicular emissions.',
    category: 'traffic',
    effectiveness: 85,
    implementationTime: '2-4 hours',
    cost: 'low',
    impact: 'Reduces AQI by 15-25 points',
    icon: '🚗'
  },
  {
    id: '2',
    title: 'Industrial Shutdown Protocol',
    description: 'Temporary shutdown of non-essential industries and enhanced emission controls for essential operations.',
    category: 'industrial',
    effectiveness: 92,
    implementationTime: '1-2 hours',
    cost: 'high',
    impact: 'Reduces AQI by 30-45 points',
    icon: '🏭'
  },
  {
    id: '3',
    title: 'Metro & Bus Frequency Boost',
    description: 'Increase Delhi Metro and DTC bus frequency with free rides to encourage public transport usage.',
    category: 'traffic',
    effectiveness: 70,
    implementationTime: '30 minutes',
    cost: 'medium',
    impact: 'Reduces AQI by 10-20 points',
    icon: '🚇'
  },
  {
    id: '4',
    title: 'Anti-Smog Gun Deployment',
    description: 'Deploy water cannons and anti-smog guns at construction sites and major intersections.',
    category: 'emergency',
    effectiveness: 65,
    implementationTime: '1-3 hours',
    cost: 'high',
    impact: 'Localized AQI reduction of 20-35 points',
    icon: '💨'
  },
  {
    id: '5',
    title: 'Construction Activity Ban',
    description: 'Halt all non-essential construction and demolition activities during severe pollution episodes.',
    category: 'industrial',
    effectiveness: 78,
    implementationTime: '1 hour',
    cost: 'medium',
    impact: 'Reduces AQI by 12-28 points',
    icon: '🚧'
  },
  {
    id: '6',
    title: 'Crop Burning Alert System',
    description: 'Coordinate with neighboring states to monitor and reduce crop burning activities affecting Delhi air quality.',
    category: 'regional',
    effectiveness: 88,
    implementationTime: '4-6 hours',
    cost: 'high',
    impact: 'Reduces AQI by 25-40 points during burning season',
    icon: '🌾'
  }
];

export const alertLevels: Record<string, AlertLevel> = {
  good: {
    level: 'good',
    color: '#4CAF50',
    description: 'Air quality is satisfactory',
    recommendations: ['Enjoy outdoor activities', 'Open windows for fresh air']
  },
  moderate: {
    level: 'moderate',
    color: '#FFEB3B',
    description: 'Air quality is acceptable',
    recommendations: ['Sensitive individuals should limit prolonged outdoor exertion']
  },
  unhealthy_sensitive: {
    level: 'unhealthy_sensitive',
    color: '#FF9800',
    description: 'Unhealthy for sensitive groups',
    recommendations: ['Children and adults with respiratory disease should limit outdoor exertion']
  },
  unhealthy: {
    level: 'unhealthy',
    color: '#F44336',
    description: 'Unhealthy for everyone',
    recommendations: ['Everyone should limit outdoor exertion', 'Use air purifiers indoors']
  },
  very_unhealthy: {
    level: 'very_unhealthy',
    color: '#9C27B0',
    description: 'Very unhealthy',
    recommendations: ['Avoid outdoor activities', 'Stay indoors with air purification']
  },
  hazardous: {
    level: 'hazardous',
    color: '#795548',
    description: 'Hazardous',
    recommendations: ['Emergency conditions - avoid all outdoor activities', 'Seek immediate shelter']
  }
};

export const getAQILevel = (aqi: number): string => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy_sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'very_unhealthy';
  return 'hazardous';
};

export const getAQIColor = (aqi: number): string => {
  const level = getAQILevel(aqi);
  return alertLevels[level].color;
};
