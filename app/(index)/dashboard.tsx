
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { AQIGauge } from '../../components/AQIGauge';
import { PredictionChart } from '../../components/PredictionChart';
import { mockAirQualityData, mockPredictions, getAQILevel, alertLevels } from '../../data/mockData';
import { IconSymbol } from '../../components/IconSymbol';

export default function Dashboard() {
  const [currentData, setCurrentData] = useState(mockAirQualityData[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    console.log('Refreshing air quality data...');
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newAQI = Math.floor(Math.random() * 200) + 20;
      setCurrentData({
        ...currentData,
        aqi: newAQI,
        pm25: Math.random() * 50 + 10,
        timestamp: new Date(),
      });
      setIsRefreshing(false);
    }, 1500);
  };

  const level = getAQILevel(currentData.aqi);
  const alertInfo = alertLevels[level];

  return (
    <View style={commonStyles.wrapper}>
      <Stack.Screen 
        options={{ 
          title: 'Air Quality Dashboard',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <IconSymbol name="location" size={20} color={colors.grey} />
            <Text style={styles.locationText}>{currentData.location.name}</Text>
          </View>
          <Pressable 
            style={[styles.refreshButton, isRefreshing && styles.refreshingButton]} 
            onPress={refreshData}
            disabled={isRefreshing}
          >
            <IconSymbol 
              name="arrow.clockwise" 
              size={20} 
              color={isRefreshing ? colors.grey : colors.primary} 
            />
          </Pressable>
        </View>

        {/* Main AQI Display */}
        <View style={styles.mainDisplay}>
          <AQIGauge aqi={currentData.aqi} size={200} />
          <View style={styles.alertContainer}>
            <View style={[styles.alertBadge, { backgroundColor: alertInfo.color }]}>
              <Text style={styles.alertText}>{alertInfo.description}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentData.pm25.toFixed(1)}</Text>
            <Text style={styles.statLabel}>PM2.5</Text>
            <Text style={styles.statUnit}>μg/m³</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentData.pm10.toFixed(1)}</Text>
            <Text style={styles.statLabel}>PM10</Text>
            <Text style={styles.statUnit}>μg/m³</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentData.no2.toFixed(1)}</Text>
            <Text style={styles.statLabel}>NO₂</Text>
            <Text style={styles.statUnit}>ppb</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentData.o3.toFixed(1)}</Text>
            <Text style={styles.statLabel}>O₃</Text>
            <Text style={styles.statUnit}>ppb</Text>
          </View>
        </View>

        {/* Predictions Chart */}
        <PredictionChart predictions={mockPredictions} />

        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Health Recommendations</Text>
          {alertInfo.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <IconSymbol name="checkmark.circle" size={16} color={colors.success} />
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable 
            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
            onPress={() => router.push('/predictions')}
          >
            <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color="white" />
            <Text style={styles.actionButtonText}>View Predictions</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/mitigation')}
          >
            <IconSymbol name="leaf" size={24} color="white" />
            <Text style={styles.actionButtonText}>Mitigation Strategies</Text>
          </Pressable>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <IconSymbol name="map" size={48} color={colors.grey} />
          <Text style={styles.mapPlaceholderText}>
            Interactive Map View
          </Text>
          <Text style={styles.mapNote}>
            Note: react-native-maps is not supported in Natively. 
            In a production app, this would show real-time air quality data on an interactive map.
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
  },
  refreshingButton: {
    opacity: 0.6,
  },
  mainDisplay: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  alertContainer: {
    marginTop: 16,
  },
  alertBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  alertText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    minWidth: 70,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 4,
  },
  statUnit: {
    fontSize: 10,
    color: colors.grey,
  },
  recommendationsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  mapPlaceholder: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 32,
    margin: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  mapNote: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 16,
  },
});
