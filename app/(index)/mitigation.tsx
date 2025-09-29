
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { MitigationCard } from '../../components/MitigationCard';
import { mockMitigationStrategies } from '../../data/mockData';
import { IconSymbol } from '../../components/IconSymbol';
import { MitigationStrategy } from '../../types/SmogTypes';

export default function Mitigation() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [implementedStrategies, setImplementedStrategies] = useState<string[]>([]);

  const categories = [
    { key: 'all', label: 'All Strategies', icon: 'list.bullet' },
    { key: 'traffic', label: 'Traffic', icon: 'car' },
    { key: 'industrial', label: 'Industrial', icon: 'building.2' },
    { key: 'residential', label: 'Residential', icon: 'house' },
    { key: 'emergency', label: 'Emergency', icon: 'exclamationmark.triangle' },
  ];

  const filteredStrategies = selectedCategory === 'all' 
    ? mockMitigationStrategies 
    : mockMitigationStrategies.filter(s => s.category === selectedCategory);

  const handleImplementStrategy = (strategy: MitigationStrategy) => {
    console.log('Implementing strategy:', strategy.title);
    Alert.alert(
      'Implement Strategy',
      `Are you sure you want to implement "${strategy.title}"?\n\nThis will take ${strategy.implementationTime} and has a ${strategy.cost} cost.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Implement', 
          onPress: () => {
            setImplementedStrategies(prev => [...prev, strategy.id]);
            Alert.alert(
              'Strategy Implemented',
              `${strategy.title} has been successfully implemented. Expected impact: ${strategy.impact}`,
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const totalEffectiveness = implementedStrategies.reduce((total, strategyId) => {
    const strategy = mockMitigationStrategies.find(s => s.id === strategyId);
    return total + (strategy?.effectiveness || 0);
  }, 0);

  return (
    <View style={commonStyles.wrapper}>
      <Stack.Screen 
        options={{ 
          title: 'Mitigation Strategies',
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
          <Text style={styles.title}>Air Quality Mitigation</Text>
          <Text style={styles.subtitle}>
            Automated strategies to reduce smog and improve air quality
          </Text>
        </View>

        {/* Implementation Status */}
        {implementedStrategies.length > 0 && (
          <View style={styles.statusContainer}>
            <View style={styles.statusHeader}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
              <Text style={styles.statusTitle}>Active Strategies</Text>
            </View>
            <Text style={styles.statusText}>
              {implementedStrategies.length} strategies implemented
            </Text>
            <Text style={styles.statusEffectiveness}>
              Combined effectiveness: {Math.min(totalEffectiveness, 100)}%
            </Text>
            <View style={styles.effectivenessBar}>
              <View 
                style={[
                  styles.effectivenessFill, 
                  { 
                    width: `${Math.min(totalEffectiveness, 100)}%`,
                    backgroundColor: colors.success 
                  }
                ]} 
              />
            </View>
          </View>
        )}

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Filter by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <Pressable
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <IconSymbol 
                  name={category.icon as any} 
                  size={20} 
                  color={selectedCategory === category.key ? 'white' : colors.text} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.key && styles.categoryButtonTextActive
                ]}>
                  {category.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Strategies List */}
        <View style={styles.strategiesContainer}>
          <Text style={styles.sectionTitle}>
            Available Strategies ({filteredStrategies.length})
          </Text>
          {filteredStrategies.map((strategy) => (
            <View key={strategy.id} style={styles.strategyWrapper}>
              <MitigationCard 
                strategy={strategy} 
                onPress={() => handleImplementStrategy(strategy)}
              />
              {implementedStrategies.includes(strategy.id) && (
                <View style={styles.implementedBadge}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.implementedText}>Implemented</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* System Architecture */}
        <View style={styles.architectureContainer}>
          <Text style={styles.sectionTitle}>System Architecture</Text>
          
          <View style={styles.architectureCard}>
            <View style={styles.architectureHeader}>
              <IconSymbol name="cloud" size={24} color={colors.secondary} />
              <Text style={styles.architectureTitle}>Cloud Platform</Text>
            </View>
            <Text style={styles.architectureDescription}>
              Secure cloud infrastructure with MongoDB and MySQL for data handling, 
              PHP RESTful APIs, and AES-256 encryption for secure transmission.
            </Text>
          </View>

          <View style={styles.architectureCard}>
            <View style={styles.architectureHeader}>
              <IconSymbol name="brain" size={24} color={colors.primary} />
              <Text style={styles.architectureTitle}>AI Analytics</Text>
            </View>
            <Text style={styles.architectureDescription}>
              Python-based TensorFlow & Scikit-learn algorithms for robust analytics, 
              real-time decision making, and automated mitigation deployment.
            </Text>
          </View>

          <View style={styles.architectureCard}>
            <View style={styles.architectureHeader}>
              <IconSymbol name="shield.checkered" size={24} color={colors.warning} />
              <Text style={styles.architectureTitle}>Security & Auth</Text>
            </View>
            <Text style={styles.architectureDescription}>
              OAuth 2.0 authentication, encrypted data transmission, and secure 
              API endpoints ensure data privacy and system integrity.
            </Text>
          </View>
        </View>

        {/* Emergency Actions */}
        <View style={styles.emergencyContainer}>
          <Text style={styles.sectionTitle}>Emergency Response</Text>
          <Pressable 
            style={styles.emergencyButton}
            onPress={() => {
              Alert.alert(
                'Emergency Protocol',
                'This would activate all emergency mitigation strategies simultaneously. Continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Activate', 
                    style: 'destructive',
                    onPress: () => {
                      console.log('Emergency protocol activated');
                      Alert.alert('Emergency Protocol Activated', 'All emergency strategies have been deployed.');
                    }
                  }
                ]
              );
            }}
          >
            <IconSymbol name="exclamationmark.triangle.fill" size={24} color="white" />
            <Text style={styles.emergencyButtonText}>Activate Emergency Protocol</Text>
          </Pressable>
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
  statusContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  statusText: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
  statusEffectiveness: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  effectivenessBar: {
    height: 6,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  effectivenessFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    marginRight: 8,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  strategiesContainer: {
    paddingHorizontal: 8,
  },
  strategyWrapper: {
    position: 'relative',
  },
  implementedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    zIndex: 1,
  },
  implementedText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  architectureContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  architectureCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  architectureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  architectureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  architectureDescription: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
  },
  emergencyContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
