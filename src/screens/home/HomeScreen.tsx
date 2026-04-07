import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { 
  Skeleton, 
  MainLayout, 
  CustomText, 
  CustomInput, 
  PullToRefreshLayout, 
  ProviderCard 
} from '../../components/shared';
import { Search, MapPin, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store';
import { useGetQuery } from '../../hooks/useGetQuery';

interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
}

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Explore'>>();
  const { user } = useAppSelector((state) => state.auth);

  const { loading, data: providers, getQuery } = useGetQuery<Provider[]>();

  useEffect(() => {
    getQuery({ url: '/providers' });
  }, [getQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Explicitly reset loaders to trigger skeletons per Rule S4
    await getQuery({ url: '/providers', params: { _t: Date.now() } });
    setRefreshing(false);
  };

  const renderSkeleton = () => (
    <View style={styles.skeletonCard}>
      <Skeleton style={styles.skeletonImage} />
      <View style={styles.skeletonInfo}>
        <Skeleton style={styles.skeletonTitle} />
        <Skeleton style={styles.skeletonCategory} />
        <View style={styles.skeletonFooter}>
          <Skeleton style={styles.skeletonRating} />
          <Skeleton style={styles.skeletonLocation} />
        </View>
      </View>
    </View>
  );

  const filteredProviders = (providers || []).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout hideHeader>
      <PullToRefreshLayout refreshing={refreshing} onRefresh={onRefresh}>
        <View style={styles.headerSection}>
          <View style={styles.header}>
            <View>
              <CustomText variant="body1" color="#64748B" weight="medium">
                Hello, {user?.name?.split(' ')[0] ?? 'there'} 👋
              </CustomText>
              <CustomText variant="h1" style={styles.mainTitle}>Find your service</CustomText>
            </View>
            <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.8}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>

          <CustomInput
            placeholder="Search for services..."
            value={search}
            onChangeText={setSearch}
            containerStyle={styles.searchBar}
            icon={<Search size={moderateScale(18)} color="#64748B" />}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <CustomText variant="h3" weight="bold">Top Rated</CustomText>
            <TouchableOpacity onPress={() => navigation.navigate('AllProviders')}>
              <CustomText variant="body2" weight="semibold" color="#3B82F6">See all</CustomText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.listPadding}>
            {(loading || refreshing) ? (
              [1, 2, 3, 4].map((i) => <View key={i}>{renderSkeleton()}</View>)
            ) : filteredProviders.length > 0 ? (
              filteredProviders.map((item) => (
                <ProviderCard
                  key={item.id}
                  name={item.name}
                  category={item.category}
                  rating={item.rating}
                  location={item.location}
                  image={item.image}
                  onPress={() => navigation.navigate('ProviderDetail', { id: item.id })}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <CustomText variant="body1" align="center" color="#94A3B8">
                  No providers found matching your search.
                </CustomText>
              </View>
            )}
          </View>
        </View>
      </PullToRefreshLayout>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(20),
  },
  mainTitle: {
    marginTop: verticalScale(2),
  },
  avatarContainer: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#FFFFFF',
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(22),
  },
  searchBar: {
    marginHorizontal: horizontalScale(16),
    marginBottom: verticalScale(16),
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  listPadding: {
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(20),
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    padding: moderateScale(12),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  skeletonImage: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(16),
  },
  skeletonInfo: {
    flex: 1,
    marginLeft: horizontalScale(16),
    justifyContent: 'center',
  },
  skeletonTitle: {
    width: '70%',
    height: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  skeletonCategory: {
    width: '40%',
    height: verticalScale(12),
    marginBottom: verticalScale(12),
  },
  skeletonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonRating: {
    width: '20%',
    height: verticalScale(10),
  },
  skeletonLocation: {
    width: '30%',
    height: verticalScale(10),
  },
  emptyContainer: {
    marginTop: verticalScale(60),
    alignItems: 'center',
  },
});

export default HomeScreen;
