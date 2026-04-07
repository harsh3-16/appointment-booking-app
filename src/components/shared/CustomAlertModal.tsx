import React from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback, Animated } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../styles/scaling';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react-native';

interface CustomAlertModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'danger' | 'success';
}

const CustomAlertModal: React.FC<CustomAlertModalProps> = ({
  visible,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
}) => {
  const getIcon = () => {
    const size = moderateScale(54);
    switch (type) {
      case 'danger':
        return <AlertCircle size={size} color="#EF4444" />;
      case 'success':
        return <CheckCircle2 size={size} color="#10B981" />;
      default:
        return <Info size={size} color="#3B82F6" />;
    }
  };

  const getHeaderBg = () => {
    switch (type) {
      case 'danger':
        return '#FEF2F2';
      case 'success':
        return '#ECFDF5';
      default:
        return '#EFF6FF';
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={[styles.iconContainer, { backgroundColor: getHeaderBg() }]}>
                {getIcon()}
              </View>
              
              <View style={styles.textContainer}>
                <CustomText variant="h3" weight="bold" align="center" style={styles.title}>
                  {title}
                </CustomText>
                <CustomText variant="body1" align="center" color="#64748B" style={styles.message}>
                  {message}
                </CustomText>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  title={confirmText}
                  onPress={() => {
                    onConfirm();
                    onClose();
                  }}
                  variant={type === 'danger' ? 'danger' : 'primary'}
                  style={styles.button}
                />
                <CustomButton
                  title={cancelText}
                  onPress={onClose}
                  variant="outline"
                  style={styles.button}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(24),
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(28),
    padding: moderateScale(24),
    paddingBottom: moderateScale(32), // More room at bottom
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  textContainer: {
    marginBottom: verticalScale(32),
    width: '100%',
  },
  title: {
    marginBottom: verticalScale(10),
    color: '#0F172A',
  },
  message: {
    lineHeight: verticalScale(22),
  },
  buttonContainer: {
    width: '100%',
    gap: verticalScale(12),
  },
  button: {
    width: '100%',
  },
});

export default CustomAlertModal;
