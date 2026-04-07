import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Explore: undefined;
  AllProviders: undefined;
  ProviderDetail: { id: string };
  Booking: { id: string; providerName: string; providerImage: string };
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};
