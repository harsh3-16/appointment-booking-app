import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { verticalScale, moderateScale } from '../../styles/scaling';
import { AuthLayout, CustomButton, CustomText, CustomInput, CustomHeader } from '../../components/shared';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react-native';
import { useAppDispatch, setCredentials } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Register'>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: RegisterFormData) => {
    dispatch(
      setCredentials({
        user: { id: '1', name: data.name, email: data.email },
        token: 'mock-token',
      })
    );
  };

  return (
    <AuthLayout>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <CustomText variant="h1" style={styles.title}>Create Account</CustomText>
        <CustomText variant="body1" color="#64748B" style={styles.subtitle}>
          Join us to start booking appointments
        </CustomText>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
              icon={<User size={moderateScale(20)} color="#64748B" />}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Mail size={moderateScale(20)} color="#64748B" />}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Password"
              placeholder="Create a password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              secureTextEntry
              icon={<Lock size={moderateScale(20)} color="#64748B" />}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Confirm Password"
              placeholder="Repeat your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.confirmPassword?.message}
              secureTextEntry
              icon={<ShieldCheck size={moderateScale(20)} color="#64748B" />}
            />
          )}
        />

        <CustomButton
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          style={styles.registerButton}
        />

        <View style={styles.footer}>
          <CustomText variant="body2" color="#64748B">Already have an account? </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <CustomText variant="body2" weight="bold" color="#3B82F6">Sign In</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: verticalScale(30),
    marginTop: verticalScale(10),
  },
  title: {
    marginBottom: verticalScale(8),
  },
  subtitle: {
    marginTop: verticalScale(8),
  },
  form: {
    flex: 1,
  },
  registerButton: {
    marginTop: verticalScale(10),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(30),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  logo: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
});

export default RegisterScreen;
