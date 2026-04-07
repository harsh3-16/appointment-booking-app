import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { useAppSelector, useAppDispatch, cancelAppointment as cancelAction, setAppointments } from '../../store';
import { EmptyState, PullToRefreshLayout, CustomAlertModal, MainLayout, CustomText, Skeleton } from '../../components/shared';
import { Calendar as CalendarIcon, Clock, Trash2 } from 'lucide-react-native';
import { useGetQuery } from '../../hooks/useGetQuery';
import { apiUrls } from '../../lib/apiUrls';

const AppointmentsScreen = () => {
  const { list } = useAppSelector((state) => state.appointments);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const { loading, getQuery } = useGetQuery<any[]>({
    onSuccess: (data) => {
      // Only overwrite if API returns data (session persistence for mock as per user request)
      if (data && data.length > 0) {
        dispatch(setAppointments(data));
      }
    }
  });

  useEffect(() => {
    getQuery({ url: apiUrls.appointments.list });
  }, [getQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getQuery({ url: apiUrls.appointments.list, params: { _t: Date.now() } });
    setRefreshing(false);
  };

  const renderSkeleton = () => (
    <View style={styles.skeletonCard}>
      <Skeleton style={styles.skeletonTitle} />
      <Skeleton style={styles.skeletonDivider} />
      <View style={styles.skeletonFooter}>
        <View>
          <Skeleton style={styles.skeletonMeta} />
          <Skeleton style={[styles.skeletonMeta, { marginTop: 4, width: '60%' }]} />
        </View>
      </View>
    </View>
  );

  const handleCancelPress = (id: string) => {
    setSelectedAppointmentId(id);
    setCancelModalVisible(true);
  };

  const confirmCancel = () => {
    if (selectedAppointmentId) {
      dispatch(cancelAction(selectedAppointmentId));
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { color: '#3B82F6', bgColor: '#EFF6FF', label: 'Upcoming' };
      case 'cancelled':
        return { color: '#EF4444', bgColor: '#FEF2F2', label: 'Cancelled' };
      case 'completed':
        return { color: '#10B981', bgColor: '#ECFDF5', label: 'Completed' };
      default:
        return { color: '#64748B', bgColor: '#F8FAFC', label: status.toUpperCase() };
    }
  };

  const renderAppointment = ({ item }: { item: any }) => {
    const status = getStatusInfo(item.status);
    return (
      <View style={styles.card}>
        <View style={styles.cardMain}>
          <View style={styles.cardHeader}>
            <CustomText variant="h3" weight="bold" numberOfLines={1} style={styles.providerName}>
              {item.providerName}
            </CustomText>
            <View style={[styles.statusBadge, { backgroundColor: status.bgColor }]}>
              <CustomText 
                variant="caption" 
                weight="bold" 
                style={{ color: status.color }}
              >
                {status.label}
              </CustomText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.footer}>
            <View style={styles.metaContainer}>
              <View style={styles.metaRow}>
                <CalendarIcon size={moderateScale(14)} color="#64748B" />
                <CustomText variant="body2" color="#64748B" style={styles.metaText}>
                  {item.date}
                </CustomText>
              </View>
              <View style={[styles.metaRow, { marginTop: verticalScale(4) }]}>
                <Clock size={moderateScale(14)} color="#64748B" />
                <CustomText variant="body2" color="#64748B" style={styles.metaText}>
                  {item.time}
                </CustomText>
              </View>
            </View>
            
            {item.status === 'upcoming' && (
              <TouchableOpacity
                style={styles.cancelAction}
                onPress={() => handleCancelPress(item.id)}
                activeOpacity={0.7}
              >
                <Trash2 size={moderateScale(18)} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <MainLayout title="Appointments" hideHeader={false}>
      <PullToRefreshLayout
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        <View style={styles.container}>
          {refreshing ? (
            <View style={styles.listPadding}>
              {[1, 2, 3].map((i) => (
                <View key={i} style={styles.skeletonCard}>
                  <Skeleton style={styles.skeletonTitle} />
                  <Skeleton style={styles.skeletonDivider} />
                  <View style={styles.skeletonFooter}>
                    <View>
                      <Skeleton style={styles.skeletonMeta} />
                      <Skeleton style={[styles.skeletonMeta, { marginTop: 4, width: '60%' }]} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : list.length === 0 ? (
            <View style={styles.emptyWrap}>
              <EmptyState message="No appointments scheduled yet." />
            </View>
          ) : (
            <View style={styles.listPadding}>
              {[...list].reverse().map((item) => (
                <View key={item.id}>
                  {renderAppointment({ item })}
                </View>
              ))}
            </View>
          )}
        </View>
      </PullToRefreshLayout>

      <CustomAlertModal
        visible={cancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        onConfirm={confirmCancel}
        title="Cancel Booking"
        message="Are you sure you want to cancel this appointment?"
        type="danger"
        confirmText="Yes, Cancel"
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listPadding: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  cardMain: {
    padding: moderateScale(20),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    flex: 1,
    marginRight: horizontalScale(12),
  },
  statusBadge: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(8),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: verticalScale(16),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metaContainer: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: horizontalScale(8),
  },
  cancelAction: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWrap: {
    marginTop: verticalScale(100),
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  skeletonTitle: {
    width: '50%',
    height: verticalScale(20),
    marginBottom: verticalScale(12),
  },
  skeletonDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: verticalScale(16),
  },
  skeletonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonMeta: {
    width: horizontalScale(120),
    height: verticalScale(14),
  },
});


export default AppointmentsScreen;
