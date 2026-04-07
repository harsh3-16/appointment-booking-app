import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { moderateScale } from '../../styles/scaling';

/**
 * CustomText — Premium typography component.
 * Supports Outfit for headings/titles and Inter for body text.
 */

export type TextVariant = 'h1' | 'h2' | 'h3' | 'sub1' | 'sub2' | 'body1' | 'body2' | 'caption' | 'label';
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  weight?: FontWeight;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'body1',
  weight = 'regular',
  color = '#1E293B',
  align = 'left',
  style,
  ...props
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return { fontSize: moderateScale(28), lineHeight: moderateScale(36), fontFamily: 'Outfit-Bold' };
      case 'h2':
        return { fontSize: moderateScale(22), lineHeight: moderateScale(28), fontFamily: 'Outfit-Bold' };
      case 'h3':
        return { fontSize: moderateScale(18), lineHeight: moderateScale(24), fontFamily: 'Outfit-SemiBold' };
      case 'sub1':
        return { fontSize: moderateScale(16), lineHeight: moderateScale(22), fontFamily: 'Outfit-Medium' };
      case 'sub2':
        return { fontSize: moderateScale(14), lineHeight: moderateScale(20), fontFamily: 'Outfit-Medium' };
      case 'body1':
        return { fontSize: moderateScale(15), lineHeight: moderateScale(22), fontFamily: 'Inter-Regular' };
      case 'body2':
        return { fontSize: moderateScale(13), lineHeight: moderateScale(18), fontFamily: 'Inter-Regular' };
      case 'caption':
        return { fontSize: moderateScale(11), lineHeight: moderateScale(16), fontFamily: 'Inter-Regular' };
      case 'label':
        return { fontSize: moderateScale(13), lineHeight: moderateScale(18), fontFamily: 'Inter-Medium' };
      default:
        return {};
    }
  };


  const getFontFamily = () => {
    const isHeading = ['h1', 'h2', 'h3', 'sub1', 'sub2'].includes(variant);
    const prefix = isHeading ? 'Outfit' : 'Inter';
    
    switch (weight) {
      case 'bold': return `${prefix}-Bold`;
      case 'semibold': return `${prefix}-SemiBold`;
      case 'medium': return `${prefix}-Medium`;
      default: return `${prefix}-Regular`;
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        { color, textAlign: align, fontFamily: getFontFamily() },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
