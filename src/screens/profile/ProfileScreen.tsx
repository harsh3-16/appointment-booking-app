import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { useAppSelector, useAppDispatch, logout } from '../../store';
import { MainLayout, CustomText, PullToRefreshLayout, Skeleton } from '../../components/shared';
import { User, Bell, Shield, CircleHelp, LogOut, ChevronRight } from 'lucide-react-native';

const ProfileScreen = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderSkeleton = () => (
    <View style={styles.scrollContent}>
      <View style={styles.profileCard}>
        <Skeleton style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Skeleton style={{ width: '60%', height: 20, marginBottom: 8 }} />
          <Skeleton style={{ width: '40%', height: 14 }} />
        </View>
      </View>
      
      {[1, 2].map((i) => (
        <View key={i} style={styles.section}>
          <Skeleton style={{ width: '30%', height: 12, marginBottom: 12 }} />
          <View style={styles.menuCard}>
            <View style={{ padding: 16 }}>
              <Skeleton style={{ width: '100%', height: 40, marginBottom: 16 }} />
              <Skeleton style={{ width: '100%', height: 40, marginBottom: 16 }} />
              <Skeleton style={{ width: '100%', height: 40 }} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    onPress?: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconContainer}>{icon}</View>
        <CustomText variant="body1" weight="medium" style={styles.menuItemTitle}>{title}</CustomText>
      </View>
      {rightElement ?? <ChevronRight size={moderateScale(20)} color="#64748B" />}
    </TouchableOpacity>
  );

  return (
    <MainLayout title="Profile">
      <PullToRefreshLayout 
        refreshing={refreshing} 
        onRefresh={onRefresh}
        contentContainerStyle={styles.scrollContent}
      >
        {refreshing ? renderSkeleton() : (
          <>
            {/* Profile Card */}
            <View style={styles.profileCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <CustomText variant="h3" weight="bold" style={styles.profileName}>{user?.name ?? 'John Doe'}</CustomText>
                <CustomText variant="body2" color="#64748B" style={styles.profileEmail}>{user?.email ?? 'john.doe@example.com'}</CustomText>
              </View>
              <TouchableOpacity style={styles.editBtn}>
                <CustomText variant="caption" weight="semibold" color="#3B82F6">Edit</CustomText>
              </TouchableOpacity>
            </View>

            {/* Account Settings */}
            <View style={styles.section}>
              <CustomText variant="caption" weight="semibold" color="#64748B" style={styles.sectionTitle}>
                ACCOUNT SETTINGS
              </CustomText>
              <View style={styles.menuCard}>
                {renderMenuItem(<User size={moderateScale(20)} color="#3B82F6" />, 'Personal Information')}
                <View style={styles.menuDivider} />
                {renderMenuItem(
                  <Bell size={moderateScale(20)} color="#F59E0B" />,
                  'Notifications',
                  undefined,
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#E2E8F0', true: '#3B82F6' }}
                    thumbColor="#FFFFFF"
                  />
                )}
                <View style={styles.menuDivider} />
                {renderMenuItem(<Shield size={moderateScale(20)} color="#EF4444" />, 'Security & Privacy')}
              </View>
            </View>

            {/* Support */}
            <View style={styles.section}>
              <CustomText variant="caption" weight="semibold" color="#64748B" style={styles.sectionTitle}>
                SUPPORT
              </CustomText>
              <View style={styles.menuCard}>
                {renderMenuItem(<CircleHelp size={moderateScale(20)} color="#64748B" />, 'Help Center')}
                <View style={styles.menuDivider} />
                {renderMenuItem(<Shield size={moderateScale(20)} color="#64748B" />, 'About App')}
              </View>
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
              <LogOut size={moderateScale(20)} color="#EF4444" />
              <CustomText variant="body1" weight="bold" color="#EF4444" style={styles.logoutText}>Log Out</CustomText>
            </TouchableOpacity>

            <CustomText variant="caption" align="center" color="#94A3B8" style={styles.versionText}>
              Version 1.0.0
            </CustomText>
          </>
        )}
      </PullToRefreshLayout>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: horizontalScale(16),
    paddingBottom: verticalScale(40),
    backgroundColor: 'transparent',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: verticalScale(30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  profileImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  profileInfo: {
    flex: 1,
    marginLeft: horizontalScale(16),
  },
  profileName: {
    // Style from typography
  },
  profileEmail: {
    marginTop: verticalScale(2),
  },
  editBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
  },
  listPadding: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(40),
    backgroundColor: 'transparent',
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    marginBottom: verticalScale(12),
    marginLeft: horizontalScale(4),
    letterSpacing: 0.8,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(12),
  },
  menuItemTitle: {
    // Styling from typography
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: horizontalScale(16),
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(10),
  },
  logoutText: {
    marginLeft: horizontalScale(10),
  },
  versionText: {
    marginTop: verticalScale(30),
  },
});

export default ProfileScreen;
