import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { 
  MainLayout, 
  CustomInput, 
  ProviderCard, 
  Skeleton, 
  PullToRefreshLayout,
  EmptyState,
  CustomHeader
} from '../../components/shared';
import { Search } from 'lucide-react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { useGetQuery } from '../../hooks/useGetQuery';

interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
}

const ProviderListScreen = () => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'AllProviders'>>();

  const { loading, data: providers, getQuery } = useGetQuery<Provider[]>();

  useEffect(() => {
    getQuery({ url: '/providers' });
  }, [getQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getQuery({ url: '/providers', params: { _t: Date.now() } });
    setRefreshing(false);
  };

  const filteredProviders = (providers || []).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <MainLayout 
      title="All Providers" 
      showBackButton 
      onBack={() => navigation.goBack()}
    >
      <View style={styles.searchContainer}>
        <CustomInput
          placeholder="Search by name or category..."
          value={search}
          onChangeText={setSearch}
          icon={<Search size={moderateScale(18)} color="#64748B" />}
        />
      </View>

      <PullToRefreshLayout refreshing={refreshing} onRefresh={onRefresh}>
        <View style={styles.listPadding}>
          {(loading || refreshing) ? (
            [1, 2, 3, 4, 5].map((i) => <View key={i}>{renderSkeleton()}</View>)
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
            <View style={styles.emptyWrap}>
              <EmptyState message="No results found." />
            </View>
          )}
        </View>
      </PullToRefreshLayout>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
    backgroundColor: 'transparent',
  },
  listPadding: {
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(40),
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
  emptyWrap: {
    marginTop: verticalScale(100),
  },
});

export default ProviderListScreen;
