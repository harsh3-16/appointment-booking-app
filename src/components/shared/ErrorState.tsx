import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import CustomButton from './CustomButton';
import { AlertCircle } from 'lucide-react-native';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "No internet connection. Please check network and retry.", 
  onRetry 
}) => {
  return (
    <View style={styles.container}>
      <AlertCircle size={moderateScale(48)} color="#EF4444" />
      <Text style={styles.title}>Error Occurred</Text>
      <Text style={styles.message}>{message}</Text>
      <CustomButton 
        title="Retry" 
        onPress={onRetry} 
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: horizontalScale(30),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
    color: '#1F2937',
  },
  message: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: '#4B5563',
    marginBottom: verticalScale(20),
    lineHeight: verticalScale(20),
  },
  button: {
    width: '100%',
  },
});

export default ErrorState;
