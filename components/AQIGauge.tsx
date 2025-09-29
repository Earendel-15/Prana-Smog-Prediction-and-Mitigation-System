
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import { getAQIColor, getAQILevel, alertLevels } from '../data/mockData';

interface AQIGaugeProps {
  aqi: number;
  size?: number;
}

export const AQIGauge: React.FC<AQIGaugeProps> = ({ aqi, size = 150 }) => {
  const level = getAQILevel(aqi);
  const color = getAQIColor(aqi);
  const percentage = Math.min(aqi / 300, 1); // Cap at 300 for visual purposes
  
  const circumference = 2 * Math.PI * (size / 2 - 10);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.gaugeContainer}>
        {/* Background circle */}
        <View 
          style={[
            styles.backgroundCircle, 
            { 
              width: size - 20, 
              height: size - 20, 
              borderRadius: (size - 20) / 2,
              borderColor: colors.backgroundAlt,
            }
          ]} 
        />
        
        {/* Progress circle */}
        <View 
          style={[
            styles.progressCircle, 
            { 
              width: size - 20, 
              height: size - 20, 
              borderRadius: (size - 20) / 2,
              borderColor: color,
              borderWidth: 8,
              transform: [{ rotate: '-90deg' }]
            }
          ]} 
        />
        
        {/* Center content */}
        <View style={styles.centerContent}>
          <Text style={[styles.aqiValue, { color }]}>{aqi}</Text>
          <Text style={styles.aqiLabel}>AQI</Text>
          <Text style={[styles.levelText, { color }]}>
            {alertLevels[level].description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    borderWidth: 8,
  },
  progressCircle: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  aqiValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  aqiLabel: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});
