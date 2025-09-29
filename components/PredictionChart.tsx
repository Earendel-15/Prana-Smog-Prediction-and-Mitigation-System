
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/commonStyles';
import { SmogPrediction } from '../types/SmogTypes';
import { getAQIColor } from '../data/mockData';

interface PredictionChartProps {
  predictions: SmogPrediction[];
}

export const PredictionChart: React.FC<PredictionChartProps> = ({ predictions }) => {
  const maxAQI = Math.max(...predictions.map(p => p.predictedAQI));
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>24-Hour Prediction</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartContainer}>
        <View style={styles.chart}>
          {predictions.map((prediction, index) => {
            const height = (prediction.predictedAQI / maxAQI) * 120;
            const color = getAQIColor(prediction.predictedAQI);
            
            return (
              <View key={prediction.id} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height, 
                        backgroundColor: color,
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.aqiText}>{prediction.predictedAQI}</Text>
                <Text style={styles.timeText}>
                  {new Date(prediction.timestamp).getHours()}:00
                </Text>
                <View style={styles.confidenceContainer}>
                  <Text style={styles.confidenceText}>{prediction.confidence}%</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  chartContainer: {
    maxHeight: 200,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    minWidth: 50,
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 24,
    borderRadius: 4,
    minHeight: 8,
  },
  aqiText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  timeText: {
    fontSize: 10,
    color: colors.grey,
    marginTop: 4,
  },
  confidenceContainer: {
    marginTop: 4,
  },
  confidenceText: {
    fontSize: 9,
    color: colors.grey,
  },
});
