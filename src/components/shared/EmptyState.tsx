import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { Inbox } from 'lucide-react-native';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message = "No data available." }) => {
  return (
    <View style={styles.container}>
      <Inbox size={moderateScale(48)} color="#9CA3AF" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: horizontalScale(30),
    marginTop: verticalScale(50),
  },
  message: {
    fontSize: moderateScale(16),
    color: '#6B7280',
    marginTop: verticalScale(10),
    textAlign: 'center',
  },
});

export default EmptyState;
