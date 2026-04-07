/**
 * AuthLayout — Global wrapper for all authentication screens (Rule RN7).
 * Handles SafeAreaView + KeyboardAvoidingView + ScrollView so individual
 * auth screens never duplicate container logic.
 */
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { verticalScale, horizontalScale } from '../../styles/scaling';

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Extra style for the outer SafeAreaView */
  containerStyle?: ViewStyle;
  /** Extra style for the ScrollView content container */
  contentStyle?: ViewStyle;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  containerStyle,
  contentStyle,
}) => {
  return (
    <LinearGradient
      colors={['#E0F2FE', '#FFFFFF']}
      style={styles.gradient}
    >
      <SafeAreaView style={[styles.safeArea, containerStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboard}
        >
          <ScrollView
            contentContainerStyle={[styles.scrollContent, contentStyle]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(40),
  },
});

export default AuthLayout;
