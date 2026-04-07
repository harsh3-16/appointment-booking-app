import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import { CustomButton, MainLayout, CustomText, CustomHeader, Skeleton } from '../../components/shared';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { useAppDispatch, addAppointment } from '../../store';
import { usePostQuery } from '../../hooks/usePostQuery';
import { useGetQuery } from '../../hooks/useGetQuery';
import { apiUrls } from '../../lib/apiUrls';
import Toast from 'react-native-toast-message';

type BookingRouteProp = RouteProp<HomeStackParamList, 'Booking'>;

const generateDates = () => {
  const dates = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    dates.push({
      id: i.toString(),
      day: days[d.getDay()],
      date: d.getDate().toString(),
      fullDate: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    });
  }
  return dates;
};

const DATES = generateDates();

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const BookingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Booking'>>();
  const route = useRoute<BookingRouteProp>();
  const dispatch = useAppDispatch();
  const { id, providerName, providerImage } = route.params;

  const [selectedDate, setSelectedDate] = useState('0');
  const [selectedTime, setSelectedTime] = useState('');
  
  const { loading: bookingLoading, postQuery } = usePostQuery<any>({
    onSuccess: (data) => {
      dispatch(addAppointment(data));
      Toast.show({
        type: 'success',
        text1: 'Booked!',
        text2: 'Your appointment has been confirmed.',
      });
      navigation.navigate('Explore');
    }
  });

  const handleBook = () => {
    if (!selectedTime) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select a time slot.',
      });
      return;
    }

    const selectedDateObj = DATES.find((d) => d.id === selectedDate);
    postQuery({
      url: apiUrls.appointments.book,
      data: {
        providerId: id,
        providerName,
        date: `${selectedDateObj?.day}, ${selectedDateObj?.fullDate}`,
        time: selectedTime,
      }
    });
  };

  return (
    <MainLayout hideHeader>
      <CustomHeader 
        showBack 
        title="Select Time Slot" 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity style={styles.providerCard} activeOpacity={0.9}>
          <View style={styles.cardContent}>
            <Image source={{ uri: providerImage }} style={styles.providerAvatar} />
            <View style={styles.providerInfo}>
              <CustomText variant="caption" weight="semibold" color="#64748B" style={styles.bookingWithText}>
                BOOKING WITH
              </CustomText>
              <CustomText variant="h3" weight="bold" style={styles.providerName}>
                {providerName}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CalendarIcon size={moderateScale(18)} color="#1E293B" />
            <CustomText variant="sub2" weight="bold" style={styles.sectionTitle}>
              Select Date
            </CustomText>
          </View>
          <FlatList
            horizontal
            data={DATES}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateItem,
                  selectedDate === item.id ? styles.selectedDateItem : styles.unselectedDateItem
                ]}
                onPress={() => setSelectedDate(item.id)}
                activeOpacity={0.7}
              >
                <CustomText 
                  variant="caption" 
                  weight="medium" 
                  color={selectedDate === item.id ? '#FFFFFF' : '#64748B'}
                  style={styles.dayText}
                >
                  {item.day}
                </CustomText>
                <CustomText 
                  variant="sub1" 
                  weight="bold" 
                  color={selectedDate === item.id ? '#FFFFFF' : '#1E293B'}
                >
                  {item.date}
                </CustomText>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={moderateScale(18)} color="#1E293B" />
            <CustomText variant="sub2" weight="bold" style={styles.sectionTitle}>
              Select Time
            </CustomText>
          </View>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeItem,
                  selectedTime === time ? styles.selectedTimeItem : styles.unselectedTimeItem
                ]}
                onPress={() => setSelectedTime(time)}
                activeOpacity={0.7}
              >
                <CustomText 
                  variant="body2" 
                  weight="semibold" 
                  color={selectedTime === time ? '#FFFFFF' : '#1E293B'}
                >
                  {time}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Confirm Booking"
          onPress={handleBook}
          loading={bookingLoading}
          style={styles.confirmBtn}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: verticalScale(140),
  },
  providerCard: {
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(16),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  bookingWithText: {
    marginBottom: verticalScale(2),
    letterSpacing: 0.5,
  },
  providerAvatar: {
    width: moderateScale(54),
    height: moderateScale(54),
    borderRadius: moderateScale(14),
    backgroundColor: '#F1F5F9',
  },
  providerInfo: {
    marginLeft: horizontalScale(16),
    flex: 1,
  },
  providerName: {
    // Premium h3 variant
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    marginLeft: horizontalScale(8),
  },
  dateList: {
    paddingHorizontal: horizontalScale(16),
  },
  dateItem: {
    width: horizontalScale(65),
    height: verticalScale(85),
    borderRadius: moderateScale(16),
    marginRight: horizontalScale(12),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  unselectedDateItem: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateItem: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  dayText: {
    marginBottom: verticalScale(6),
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: horizontalScale(16),
    justifyContent: 'space-between',
  },
  timeItem: {
    width: '48%',
    height: verticalScale(52),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  unselectedTimeItem: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTimeItem: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
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
  confirmBtn: {
    width: '100%',
  },
});

export default BookingScreen;
