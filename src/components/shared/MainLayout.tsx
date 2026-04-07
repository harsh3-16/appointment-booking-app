/**
 * MainLayout — Global wrapper for all authenticated app screens (Rule RN7).
 * Handles SafeAreaView + optional header slot + scrollable / non-scrollable body.
 * Import from this file instead of duplicating SafeAreaView logic across screens.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { ChevronLeft } from 'lucide-react-native';
import CustomText from './CustomText';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  headerContent?: React.ReactNode;
  hideHeader?: boolean;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  headerRight?: React.ReactNode;
  gradientColors?: string[];
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  onBack,
  headerContent,
  hideHeader = false,
  backgroundColor = 'transparent',
  containerStyle,
  headerStyle,
  titleStyle,
  headerRight,
  gradientColors = ['#E0F2FE', '#FFFFFF'],
}) => {
  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        style={styles.gradient}
      >
        <SafeAreaView style={[styles.mainContainer, { backgroundColor }, containerStyle]}>
          {!hideHeader && (
            <View style={[styles.header, headerStyle]}>
              {headerContent ?? (
                <>
                  <View style={styles.headerLeft}>
                    {showBackButton && (
                      <TouchableOpacity
                        onPress={onBack}
                        style={styles.backButton}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                      >
                        <ChevronLeft size={moderateScale(22)} color="#1E293B" />
                      </TouchableOpacity>
                    )}
                    {title ? (
                      <CustomText variant="h3" weight="bold" style={[styles.title, titleStyle]}>
                        {title}
                      </CustomText>
                    ) : null}
                  </View>
                  {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
                </>
              )}
            </View>
          )}
          <View style={styles.body}>
            {children}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    height: verticalScale(64),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(241, 245, 249, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: horizontalScale(12),
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(12),
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
  },
  title: {
    color: '#1E293B',
  },

  headerRight: {
    alignItems: 'flex-end',
  },
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

export default MainLayout;
