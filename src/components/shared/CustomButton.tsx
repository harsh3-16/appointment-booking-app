import React, { useRef } from 'react';
import { 
  TouchableOpacity, 
  Animated,
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  StyleProp,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import CustomText from './CustomText';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  noGradient?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
  noGradient = true, // Default to true as the user requested removing gradients from buttons
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => (
    loading ? (
      <ActivityIndicator color={variant === 'outline' ? '#3B82F6' : '#FFFFFF'} />
    ) : (
      <CustomText
        variant="body1"
        weight="bold"
        color={variant === 'outline' ? '#3B82F6' : '#FFFFFF'}
        style={textStyle}
      >
        {title}
      </CustomText>
    )
  );

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'danger':
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading}
        activeOpacity={1}
        style={styles.touchable}
      >
        {variant === 'primary' && !disabled && !noGradient ? (
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.button, styles.primaryGradient, loading && styles.disabled]}
          >
            {renderContent()}
          </LinearGradient>
        ) : (
          <View style={[styles.button, getButtonStyle(), (disabled || loading) && styles.disabled]}>
            {renderContent()}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  button: {
    height: verticalScale(54),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(12),
    flexDirection: 'row',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primary: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
  },
  primaryGradient: {
    // Background color handled by LinearGradient
  },
  secondary: {
    backgroundColor: '#1E293B',
    shadowColor: '#1E293B',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    shadowOpacity: 0,
    elevation: 0,
  },
  danger: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default CustomButton;

