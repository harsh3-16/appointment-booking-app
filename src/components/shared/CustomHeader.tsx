import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import CustomText from './CustomText';

/**
 * CustomHeader — Premium standardized header.
 * Supports back navigation, custom title, and optional right component.
 */

interface CustomHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightComponent,
  backgroundColor = '#FFFFFF',
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            activeOpacity={0.7}
          >
            <ChevronLeft size={moderateScale(22)} color="#1E293B" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        {title && (
          <CustomText
            variant="h3"
            weight="bold"
            align="center"
            numberOfLines={1}
            style={styles.titleText}
          >
            {title}
          </CustomText>
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(64),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(24),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  leftContainer: {
    width: horizontalScale(44),
    justifyContent: 'center',
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(12),
    backgroundColor: '#F8FAFC',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  titleText: {
    color: '#1E293B',
  },
  rightContainer: {
    width: horizontalScale(44),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});


export default CustomHeader;
