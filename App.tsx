import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import Toast, { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CustomText } from './src/components/shared';
import { moderateScale, horizontalScale, verticalScale } from './src/styles/scaling';
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#10B981', backgroundColor: '#FFFFFF', borderRadius: 12, height: 60 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: moderateScale(15),
        fontWeight: '700',
        fontFamily: 'Outfit-Bold',
        color: '#1E293B'
      }}
      text2Style={{
        fontSize: moderateScale(13),
        fontFamily: 'Inter-Regular',
        color: '#64748B'
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#EF4444', backgroundColor: '#FFFFFF', borderRadius: 12, height: 60 }}
      text1Style={{
        fontSize: moderateScale(15),
        fontWeight: '700',
        fontFamily: 'Outfit-Bold',
        color: '#1E293B'
      }}
      text2Style={{
        fontSize: moderateScale(13),
        fontFamily: 'Inter-Regular',
        color: '#64748B'
      }}
    />
  )
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Outfit-Regular': Outfit_400Regular,
    'Outfit-Medium': Outfit_500Medium,
    'Outfit-SemiBold': Outfit_600SemiBold,
    'Outfit-Bold': Outfit_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <RootNavigator />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
}


