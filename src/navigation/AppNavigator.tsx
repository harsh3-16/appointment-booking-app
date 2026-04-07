import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppTabParamList, HomeStackParamList } from './types';
import HomeScreen from '../screens/home/HomeScreen';
import ProviderDetailScreen from '../screens/home/ProviderDetailScreen';
import BookingScreen from '../screens/home/BookingScreen';
import AppointmentsScreen from '../screens/appointments/AppointmentsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { Home, Calendar, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from '../styles/scaling';

import ProviderListScreen from '../screens/home/ProviderListScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Explore" component={HomeScreen} />
      <Stack.Screen name="AllProviders" component={ProviderListScreen} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const insets = useSafeAreaInsets();
  
  const TAB_BAR_HEIGHT = verticalScale(64) + insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconSize = moderateScale(size);
          if (route.name === 'Home') {
            return <Home size={iconSize} color={color} />;
          } else if (route.name === 'Appointments') {
            return <Calendar size={iconSize} color={color} />;
          } else if (route.name === 'Profile') {
            return <User size={iconSize} color={color} />;
          }
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#94A3B8',
        headerShown: false,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          paddingBottom: insets.bottom > 0 ? insets.bottom : verticalScale(10),
          paddingTop: verticalScale(10),
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Outfit-Medium',
          fontSize: moderateScale(11),
        }
      })}
    >

      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
