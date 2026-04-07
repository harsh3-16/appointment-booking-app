import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Star, MapPin, ChevronRight } from 'lucide-react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import CustomText from './CustomText';

interface ProviderCardProps {
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  name,
  category,
  rating,
  location,
  image,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <CustomText variant="h3" weight="bold" numberOfLines={1} style={styles.name}>
            {name}
          </CustomText>
          <View style={styles.ratingBadge}>
            <Star size={moderateScale(12)} color="#F59E0B" fill="#F59E0B" />
            <CustomText variant="caption" weight="bold" style={styles.ratingText}>
              {rating}
            </CustomText>
          </View>
        </View>
        
        <CustomText variant="body2" color="#64748B" style={styles.category}>
          {category}
        </CustomText>

        <View style={styles.footer}>
          <View style={styles.locationRow}>
            <MapPin size={moderateScale(14)} color="#94A3B8" />
            <CustomText variant="caption" color="#64748B" style={styles.locationText}>
              {location}
            </CustomText>
          </View>
          <View style={styles.arrowBtn}>
            <ChevronRight size={moderateScale(18)} color="#3B82F6" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    padding: moderateScale(12),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(16),
    backgroundColor: '#F8FAFC',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(10),
  },
  ratingText: {
    marginLeft: horizontalScale(4),
    color: '#D97706',
  },
  infoContainer: {
    flex: 1,
    marginLeft: horizontalScale(16),
    justifyContent: 'space-between',
    paddingVertical: verticalScale(2),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  category: {
    marginTop: verticalScale(2),
    marginBottom: verticalScale(6),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    marginLeft: horizontalScale(4),
  },
  arrowBtn: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(10),
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProviderCard;
