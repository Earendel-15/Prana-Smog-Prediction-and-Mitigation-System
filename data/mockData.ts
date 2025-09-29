
import { AirQualityData, SmogPrediction, MitigationStrategy, AlertLevel } from '../types/SmogTypes';

export const mockAirQualityData: AirQualityData[] = [
  {
    id: '1',
    timestamp: new Date(),
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      name: 'New York City'
    },
    aqi: 85,
    pm25: 25.5,
    pm10: 45.2,
    no2: 32.1,
    so2: 8.5,
    co: 1.2,
    o3: 78.3,
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    windDirection: 180
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000),
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      name: 'New York City'
    },
    aqi: 92,
    pm25: 28.1,
    pm10: 48.7,
    no2: 35.4,
    so2: 9.2,
    co: 1.4,
    o3: 82.1,
    temperature: 21,
    humidity: 68,
    windSpeed: 8,
    windDirection: 165
  }
];

export const mockPredictions: SmogPrediction[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() + 3600000),
    location: 'New York City',
    predictedAQI: 78,
    confidence: 87,
    timeRange: '1h',
    factors: ['Wind direction change', 'Reduced traffic'],
    recommendations: ['Good time for outdoor activities', 'Windows can be opened']
  },
  {
    id: '2',
    timestamp: new Date(Date.now() + 21600000),
    location: 'New York City',
    predictedAQI: 95,
    confidence: 82,
    timeRange: '6h',
    factors: ['Rush hour traffic', 'Temperature inversion'],
    recommendations: ['Limit outdoor exercise', 'Use air purifiers indoors']
  },
  {
    id: '3',
    timestamp: new Date(Date.now() + 86400000),
    location: 'New York City',
    predictedAQI: 65,
    confidence: 75,
    timeRange: '24h',
    factors: ['Rain expected', 'Weekend reduced traffic'],
    recommendations: ['Excellent air quality expected', 'Perfect for outdoor activities']
  }
];

export const mockMitigationStrategies: MitigationStrategy[] = [
  {
    id: '1',
    title: 'Dynamic Traffic Management',
    description: 'Implement AI-controlled traffic lights and route optimization to reduce vehicle emissions during peak pollution hours.',
    category: 'traffic',
    effectiveness: 85,
    implementationTime: '2-4 hours',
    cost: 'low',
    impact: 'Reduces AQI by 15-25 points',
    icon: '🚦'
  },
  {
    id: '2',
    title: 'Industrial Emission Control',
    description: 'Temporary reduction of industrial activities and implementation of enhanced filtration systems.',
    category: 'industrial',
    effectiveness: 92,
    implementationTime: '1-2 hours',
    cost: 'high',
    impact: 'Reduces AQI by 30-45 points',
    icon: '🏭'
  },
  {
    id: '3',
    title: 'Public Transport Incentives',
    description: 'Free public transportation and bike-sharing programs to reduce private vehicle usage.',
    category: 'traffic',
    effectiveness: 70,
    implementationTime: '30 minutes',
    cost: 'medium',
    impact: 'Reduces AQI by 10-20 points',
    icon: '🚌'
  },
  {
    id: '4',
    title: 'Emergency Air Purification',
    description: 'Deploy mobile air purification units in high-density areas and public spaces.',
    category: 'emergency',
    effectiveness: 65,
    implementationTime: '1-3 hours',
    cost: 'high',
    impact: 'Localized AQI reduction of 20-35 points',
    icon: '💨'
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
