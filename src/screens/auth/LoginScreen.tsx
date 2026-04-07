import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { verticalScale, moderateScale, horizontalScale } from '../../styles/scaling';
import { AuthLayout, CustomButton, CustomText, CustomInput } from '../../components/shared';
import { Mail, Lock } from 'lucide-react-native';
import { useAppDispatch, setCredentials } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Login'>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    dispatch(
      setCredentials({
        user: { id: '1', name: 'John Doe', email: data.email },
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
        <CustomText variant="h1" style={styles.title}>Welcome Back</CustomText>
        <CustomText variant="body1" color="#64748B" style={styles.subtitle}>
          Sign in to book your next appointment
        </CustomText>
      </View>

      <View style={styles.form}>
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
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              secureTextEntry
              icon={<Lock size={moderateScale(20)} color="#64748B" />}
            />
          )}
        />

        <CustomButton
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          style={styles.loginButton}
        />

        <View style={styles.footer}>
          <CustomText variant="body2" color="#64748B">Don't have an account? </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <CustomText variant="body2" weight="bold" color="#3B82F6">Register</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: verticalScale(40),
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
  loginButton: {
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

export default LoginScreen;
