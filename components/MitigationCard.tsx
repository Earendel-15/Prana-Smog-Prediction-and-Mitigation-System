
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../styles/commonStyles';
import { MitigationStrategy } from '../types/SmogTypes';

interface MitigationCardProps {
  strategy: MitigationStrategy;
  onPress?: () => void;
}

export const MitigationCard: React.FC<MitigationCardProps> = ({ strategy, onPress }) => {
  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return colors.success;
      case 'medium': return colors.warning;
      case 'high': return colors.danger;
      default: return colors.grey;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'traffic': return '#2196F3';
      case 'industrial': return '#FF9800';
      case 'residential': return '#4CAF50';
      case 'emergency': return '#F44336';
      default: return colors.grey;
    }
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{strategy.icon}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{strategy.title}</Text>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getCategoryColor(strategy.category) }]}>
              <Text style={styles.badgeText}>{strategy.category}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: getCostColor(strategy.cost) }]}>
              <Text style={styles.badgeText}>{strategy.cost} cost</Text>
            </View>
          </View>
        </View>
      </View>
      
      <Text style={styles.description}>{strategy.description}</Text>
      
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Effectiveness</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${strategy.effectiveness}%`,
                  backgroundColor: colors.success 
                }
              ]} 
            />
          </View>
          <Text style={styles.metricValue}>{strategy.effectiveness}%</Text>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Implementation</Text>
            <Text style={styles.infoValue}>{strategy.implementationTime}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Impact</Text>
            <Text style={styles.infoValue}>{strategy.impact}</Text>
          </View>
        </View>
      </View>
    </Pressable>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
    marginBottom: 16,
  },
  metrics: {
    gap: 12,
  },
  metric: {
    gap: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.grey,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.grey,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
});
