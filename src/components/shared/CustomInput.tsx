import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { Eye, EyeOff } from 'lucide-react-native';
import CustomText from './CustomText';

/**
 * CustomInput — Premium input component.
 * Supports icons, labels, error states, and obscure-text toggle.
 */

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  icon,
  secureTextEntry,
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const inputRef = React.useRef<TextInput>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CustomText
          variant="label"
          weight="semibold"
          color="#334155"
          style={styles.label}
        >
          {label}
        </CustomText>
      )}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor="#94A3B8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.eyeIcon}
          >
            {isPasswordVisible ? (
              <EyeOff size={moderateScale(20)} color="#64748B" />
            ) : (
              <Eye size={moderateScale(20)} color="#64748B" />
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(20),
  },
  label: {
    marginBottom: verticalScale(8),
    marginLeft: horizontalScale(4),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(56),
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: moderateScale(12),
    paddingHorizontal: horizontalScale(16),
  },
  inputWrapperFocused: {
    borderColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  iconContainer: {
    marginRight: horizontalScale(12),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: moderateScale(16),
    color: '#1E293B',
    fontFamily: 'Inter-Regular',
  },
  eyeIcon: {
    marginLeft: horizontalScale(12),
  },
  errorText: {
    color: '#EF4444',
    fontSize: moderateScale(12),
    marginTop: verticalScale(6),
    marginLeft: horizontalScale(4),
    fontFamily: 'Inter-Regular',
  },
});

export default CustomInput;
