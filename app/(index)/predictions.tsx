
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { PredictionChart } from '../../components/PredictionChart';
import { mockPredictions, getAQIColor, getAQILevel, alertLevels } from '../../data/mockData';
import { IconSymbol } from '../../components/IconSymbol';
import { SmogPrediction } from '../../types/SmogTypes';

export default function Predictions() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '48h' | '72h'>('24h');
  const [selectedPrediction, setSelectedPrediction] = useState<SmogPrediction | null>(null);

  const timeRanges = [
    { key: '24h', label: '24 Hours' },
    { key: '48h', label: '48 Hours' },
    { key: '72h', label: '72 Hours' },
  ];

  const filteredPredictions = mockPredictions.filter(p => {
    const hoursFromNow = (new Date(p.timestamp).getTime() - Date.now()) / (1000 * 60 * 60);
    switch (selectedTimeRange) {
      case '24h': return hoursFromNow <= 24;
      case '48h': return hoursFromNow <= 48;
      case '72h': return hoursFromNow <= 72;
      default: return true;
    }
  });

  return (
    <View style={commonStyles.wrapper}>
      <Stack.Screen 
        options={{ 
          title: 'AI Predictions',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Smog Prediction Analysis</Text>
          <Text style={styles.subtitle}>
            AI-powered forecasting using LSTM & Random Forest algorithms
          </Text>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          <Text style={styles.sectionTitle}>Forecast Period</Text>
          <View style={styles.timeRangeButtons}>
            {timeRanges.map((range) => (
              <Pressable
                key={range.key}
                style={[
                  styles.timeRangeButton,
                  selectedTimeRange === range.key && styles.timeRangeButtonActive
                ]}
                onPress={() => setSelectedTimeRange(range.key as any)}
              >
                <Text style={[
                  styles.timeRangeButtonText,
                  selectedTimeRange === range.key && styles.timeRangeButtonTextActive
                ]}>
                  {range.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Prediction Chart */}
        <PredictionChart predictions={filteredPredictions} />

        {/* AI Model Info */}
        <View style={styles.modelInfoContainer}>
          <Text style={styles.sectionTitle}>AI Model Performance</Text>
          <View style={styles.modelStats}>
            <View style={styles.modelStat}>
              <Text style={styles.modelStatValue}>94.2%</Text>
              <Text style={styles.modelStatLabel}>Accuracy</Text>
            </View>
            <View style={styles.modelStat}>
              <Text style={styles.modelStatValue}>87.5%</Text>
              <Text style={styles.modelStatLabel}>Confidence</Text>
            </View>
            <View style={styles.modelStat}>
              <Text style={styles.modelStatValue}>±12</Text>
              <Text style={styles.modelStatLabel}>AQI Error</Text>
            </View>
          </View>
        </View>

        {/* Detailed Predictions */}
        <View style={styles.detailedPredictions}>
          <Text style={styles.sectionTitle}>Detailed Forecasts</Text>
          {filteredPredictions.map((prediction) => {
            const level = getAQILevel(prediction.predictedAQI);
            const color = getAQIColor(prediction.predictedAQI);
            const alertInfo = alertLevels[level];
            
            return (
              <Pressable
                key={prediction.id}
                style={styles.predictionCard}
                onPress={() => setSelectedPrediction(prediction)}
              >
                <View style={styles.predictionHeader}>
                  <View style={styles.predictionTime}>
                    <Text style={styles.predictionTimeText}>
                      {new Date(prediction.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Text>
                    <Text style={styles.predictionDateText}>
                      {new Date(prediction.timestamp).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  <View style={styles.predictionAQI}>
                    <Text style={[styles.predictionAQIValue, { color }]}>
                      {prediction.predictedAQI}
                    </Text>
                    <Text style={styles.predictionAQILabel}>AQI</Text>
                  </View>
                  
                  <View style={styles.predictionConfidence}>
                    <Text style={styles.confidenceValue}>{prediction.confidence}%</Text>
                    <Text style={styles.confidenceLabel}>Confidence</Text>
                  </View>
                </View>
                
                <View style={[styles.predictionStatus, { backgroundColor: color }]}>
                  <Text style={styles.predictionStatusText}>
                    {alertInfo.description}
                  </Text>
                </View>
                
                <View style={styles.predictionFactors}>
                  <Text style={styles.factorsTitle}>Key Factors:</Text>
                  {prediction.factors.map((factor, index) => (
                    <Text key={index} style={styles.factorText}>• {factor}</Text>
                  ))}
                </View>
                
                <View style={styles.predictionRecommendations}>
                  <Text style={styles.recommendationsTitle}>Recommendations:</Text>
                  {prediction.recommendations.map((rec, index) => (
                    <Text key={index} style={styles.recommendationText}>• {rec}</Text>
                  ))}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Algorithm Details */}
        <View style={styles.algorithmContainer}>
          <Text style={styles.sectionTitle}>Prediction Technology</Text>
          <View style={styles.algorithmCard}>
            <View style={styles.algorithmHeader}>
              <IconSymbol name="brain" size={24} color={colors.primary} />
              <Text style={styles.algorithmTitle}>LSTM Neural Network</Text>
            </View>
            <Text style={styles.algorithmDescription}>
              Long Short-Term Memory networks analyze time series patterns in pollution data, 
              weather conditions, and traffic patterns to predict future air quality levels.
            </Text>
          </View>
          
          <View style={styles.algorithmCard}>
            <View style={styles.algorithmHeader}>
              <IconSymbol name="tree" size={24} color={colors.success} />
              <Text style={styles.algorithmTitle}>Random Forest</Text>
            </View>
            <Text style={styles.algorithmDescription}>
              Ensemble learning method that combines multiple decision trees to improve 
              prediction accuracy and handle complex environmental factor interactions.
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
  },
  timeRangeContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  timeRangeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
  },
  timeRangeButtonActive: {
    backgroundColor: colors.primary,
  },
  timeRangeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  timeRangeButtonTextActive: {
    color: 'white',
  },
  modelInfoContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  modelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modelStat: {
    alignItems: 'center',
  },
  modelStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  modelStatLabel: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 4,
  },
  detailedPredictions: {
    paddingHorizontal: 16,
  },
  predictionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionTime: {
    flex: 1,
  },
  predictionTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  predictionDateText: {
    fontSize: 12,
    color: colors.grey,
  },
  predictionAQI: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  predictionAQIValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  predictionAQILabel: {
    fontSize: 12,
    color: colors.grey,
  },
  predictionConfidence: {
    alignItems: 'center',
  },
  confidenceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  confidenceLabel: {
    fontSize: 12,
    color: colors.grey,
  },
  predictionStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  predictionStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  predictionFactors: {
    marginBottom: 12,
  },
  factorsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  factorText: {
    fontSize: 12,
    color: colors.grey,
    marginLeft: 8,
  },
  predictionRecommendations: {
    marginBottom: 8,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 12,
    color: colors.grey,
    marginLeft: 8,
  },
  algorithmContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  algorithmCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  algorithmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  algorithmTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  algorithmDescription: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
  },
});
