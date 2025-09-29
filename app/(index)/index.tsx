
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { IconSymbol } from '../../components/IconSymbol';
import { AQIGauge } from '../../components/AQIGauge';
import { mockAirQualityData } from '../../data/mockData';

export default function HomeScreen() {
  const currentAQI = mockAirQualityData[0].aqi;

  const features = [
    {
      id: 'dashboard',
      title: 'Air Quality Dashboard',
      description: 'Real-time monitoring and current conditions',
      icon: 'gauge.medium',
      color: colors.primary,
      route: '/dashboard'
    },
    {
      id: 'predictions',
      title: 'AI Predictions',
      description: 'LSTM & Random Forest forecasting',
      icon: 'chart.line.uptrend.xyaxis',
      color: colors.secondary,
      route: '/predictions'
    },
    {
      id: 'mitigation',
      title: 'Mitigation Strategies',
      description: 'Automated pollution control systems',
      icon: 'leaf',
      color: colors.success,
      route: '/mitigation'
    }
  ];

  return (
    <View style={commonStyles.wrapper}>
      <Stack.Screen 
        options={{ 
          title: 'SmogGuard AI',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>SmogGuard AI</Text>
            <Text style={styles.heroSubtitle}>
              Comprehensive AI-powered smog prediction and mitigation system
            </Text>
            
            {/* Current AQI Display */}
            <View style={styles.currentAQIContainer}>
              <Text style={styles.currentAQILabel}>Current Air Quality</Text>
              <AQIGauge aqi={currentAQI} size={120} />
            </View>
          </View>
        </View>

        {/* System Overview */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>System Architecture</Text>
          <View style={styles.architectureFlow}>
            <View style={styles.flowStep}>
              <IconSymbol name="sensor" size={32} color={colors.primary} />
              <Text style={styles.flowStepTitle}>Data Collection</Text>
              <Text style={styles.flowStepDesc}>IoT sensors & satellite data</Text>
            </View>
            <IconSymbol name="arrow.right" size={20} color={colors.grey} />
            <View style={styles.flowStep}>
              <IconSymbol name="brain" size={32} color={colors.secondary} />
              <Text style={styles.flowStepTitle}>AI Analysis</Text>
              <Text style={styles.flowStepDesc}>LSTM & Random Forest</Text>
            </View>
            <IconSymbol name="arrow.right" size={20} color={colors.grey} />
            <View style={styles.flowStep}>
              <IconSymbol name="gear" size={32} color={colors.success} />
              <Text style={styles.flowStepTitle}>Mitigation</Text>
              <Text style={styles.flowStepDesc}>Automated response</Text>
            </View>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>System Features</Text>
          {features.map((feature) => (
            <Pressable
              key={feature.id}
              style={styles.featureCard}
              onPress={() => router.push(feature.route as any)}
            >
              <View style={styles.featureHeader}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <IconSymbol name={feature.icon as any} size={24} color="white" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.grey} />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Technology Stack */}
        <View style={styles.techSection}>
          <Text style={styles.sectionTitle}>Technology Stack</Text>
          
          <View style={styles.techCategory}>
            <Text style={styles.techCategoryTitle}>Data Collection</Text>
            <Text style={styles.techItem}>• LSTM & Random Forest for time series smog & pollution prediction</Text>
          </View>
          
          <View style={styles.techCategory}>
            <Text style={styles.techCategoryTitle}>Algorithm Development</Text>
            <Text style={styles.techItem}>• Python - TensorFlow & Scikit-learn for robust analytics</Text>
          </View>
          
          <View style={styles.techCategory}>
            <Text style={styles.techCategoryTitle}>Mobile Application</Text>
            <Text style={styles.techItem}>• React Native framework for cross-platform development</Text>
          </View>
          
          <View style={styles.techCategory}>
            <Text style={styles.techCategoryTitle}>Security & Encryption</Text>
            <Text style={styles.techItem}>• AES-256 for secure transmission</Text>
            <Text style={styles.techItem}>• OAuth 2.0 authentication</Text>
          </View>
          
          <View style={styles.techCategory}>
            <Text style={styles.techCategoryTitle}>Cloud Service</Text>
            <Text style={styles.techItem}>• MongoDB, MySQL for data handling</Text>
            <Text style={styles.techItem}>• PHP RESTful API architecture</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <Pressable 
              style={[styles.quickActionButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/dashboard')}
            >
              <IconSymbol name="eye" size={20} color="white" />
              <Text style={styles.quickActionText}>View Dashboard</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.quickActionButton, { backgroundColor: colors.secondary }]}
              onPress={() => router.push('/predictions')}
            >
              <IconSymbol name="crystal.ball" size={20} color="white" />
              <Text style={styles.quickActionText}>Get Forecast</Text>
            </Pressable>
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
  heroSection: {
    padding: 20,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  currentAQIContainer: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  currentAQILabel: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 12,
  },
  overviewSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  architectureFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  flowStep: {
    alignItems: 'center',
    flex: 1,
  },
  flowStepTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  flowStepDesc: {
    fontSize: 10,
    color: colors.grey,
    marginTop: 4,
    textAlign: 'center',
  },
  featuresSection: {
    paddingHorizontal: 20,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.grey,
  },
  techSection: {
    padding: 20,
    backgroundColor: colors.backgroundAlt,
    margin: 20,
    borderRadius: 12,
  },
  techCategory: {
    marginBottom: 16,
  },
  techCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  techItem: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
    marginBottom: 4,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
