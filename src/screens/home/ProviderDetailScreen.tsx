import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  ScrollView, 
} from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { CustomButton, CustomText, MainLayout, CustomHeader, Skeleton } from '../../components/shared';
import { Star, MapPin, Clock, ShieldCheck } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { useGetQuery } from '../../hooks/useGetQuery';

type ProviderDetailRouteProp = RouteProp<HomeStackParamList, 'ProviderDetail'>;

const ProviderDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'ProviderDetail'>>();
  const route = useRoute<ProviderDetailRouteProp>();
  const { id } = route.params;
  const { loading, data: provider, getQuery } = useGetQuery<any>();

  useEffect(() => {
    getQuery({ url: `/providers/${id}` });
  }, [id, getQuery]);

  const renderSkeleton = () => (
    <>
      <View style={styles.imageHeader}>
        <Skeleton style={styles.headerImage} />
      </View>
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.titleContainer}>
            <Skeleton style={{ width: '70%', height: 24, marginBottom: 8 }} />
            <Skeleton style={{ width: '40%', height: 16 }} />
          </View>
          <Skeleton style={{ width: 60, height: 40, borderRadius: 20 }} />
        </View>
        <View style={styles.metaRow}>
          <Skeleton style={{ width: '30%', height: 16, marginRight: 20 }} />
          <Skeleton style={{ width: '30%', height: 16 }} />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Skeleton style={{ width: '20%', height: 18, marginBottom: 12 }} />
          <Skeleton style={{ width: '100%', height: 80 }} />
        </View>
      </View>
    </>
  );

  if (loading || !provider) {
    return (
      <MainLayout hideHeader>
        <CustomHeader 
          showBack 
          title="Loading..."
          onBack={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {renderSkeleton()}
        </ScrollView>
      </MainLayout>
    );
  }

  return (
    <MainLayout hideHeader>
      <CustomHeader 
        showBack 
        title="Provider Detail"
        onBack={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.imageHeader}>
          <Image 
            source={{ uri: provider.image }} 
            style={styles.headerImage} 
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <View style={styles.titleContainer}>
              <CustomText variant="h2" style={styles.providerName}>
                {provider.name}
              </CustomText>
              <CustomText variant="body1" color="#64748B" style={styles.providerCategory}>
                {provider.category}
              </CustomText>
            </View>
            <View style={styles.ratingBadge}>
              <Star size={moderateScale(16)} color="#FFFFFF" fill="#FFFFFF" />
              <CustomText variant="body1" weight="bold" color="#FFFFFF" style={styles.ratingText}>
                {provider.rating}
              </CustomText>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MapPin size={moderateScale(16)} color="#64748B" />
              <CustomText variant="body2" color="#64748B" style={styles.metaText}>
                {provider.location}
              </CustomText>
            </View>
            <View style={styles.metaItem}>
              <Clock size={moderateScale(16)} color="#64748B" />
              <CustomText variant="body2" color="#64748B" style={styles.metaText}>
                {provider.workingHours}
              </CustomText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <CustomText variant="sub1" weight="bold" style={styles.sectionTitle}>
              About
            </CustomText>
            <CustomText variant="body1" color="#475569" style={styles.aboutText}>
              {provider.about}
            </CustomText>
          </View>

          <View style={styles.perksRow}>
            <View style={styles.perkItem}>
              <View style={[styles.perkIcon, { backgroundColor: '#DBEAFE' }]}>
                <ShieldCheck size={moderateScale(24)} color="#3B82F6" />
              </View>
              <CustomText variant="caption" weight="semibold" color="#1E293B">
                Verified
              </CustomText>
            </View>
            <View style={styles.perkItem}>
              <View style={[styles.perkIcon, { backgroundColor: '#FEE2E2' }]}>
                <Star size={moderateScale(24)} color="#EF4444" />
              </View>
              <CustomText variant="caption" weight="semibold" color="#1E293B">
                Top Rated
              </CustomText>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton 
          title="Book Appointment" 
          onPress={() => navigation.navigate('Booking', { 
            id: provider.id, 
            providerName: provider.name,
            providerImage: provider.image 
          })} 
          style={styles.bookBtn}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  imageHeader: {
    height: verticalScale(350),
    width: '100%',
    backgroundColor: '#F1F5F9',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    marginTop: verticalScale(-30),
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(120),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  titleContainer: {
    flex: 1,
    marginRight: horizontalScale(10),
  },
  providerName: {
    marginBottom: verticalScale(4),
  },
  providerCategory: {
    marginTop: verticalScale(2),
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
  },
  ratingText: {
    marginLeft: horizontalScale(6),
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(24),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: horizontalScale(20),
  },
  metaText: {
    marginLeft: horizontalScale(6),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: verticalScale(24),
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    marginBottom: verticalScale(12),
  },
  aboutText: {
    lineHeight: verticalScale(24),
  },
  perksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(10),
  },
  perkItem: {
    alignItems: 'center',
  },
  perkIcon: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(4),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  bookBtn: {
    width: '100%',
  },
});




export default ProviderDetailScreen;
