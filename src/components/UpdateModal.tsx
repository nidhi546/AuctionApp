import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { PLAY_STORE_URL } from '../constants/data';

interface UpdateModalProps {
  visible: boolean;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

export const UpdateModal: React.FC<UpdateModalProps> = ({ visible, onClose }) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: height,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleUpdate = async () => {
    try {
      const supported = await Linking.canOpenURL(PLAY_STORE_URL);
      if (supported) {
        await Linking.openURL(PLAY_STORE_URL);
      }
    } catch (error) {
      console.warn('Could not open Play Store URL:', error);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity }]}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
              {/* Handle bar */}
              <View style={styles.handle} />

              {/* Icon */}
              <View style={styles.iconContainer}>
                <Ionicons name="rocket-outline" size={38} color={Colors.white} />
              </View>

              {/* Title */}
              <Text style={styles.title}>Super App Required</Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Message */}
              <Text style={styles.message}>
                To continue using Auction App, you need to install the{' '}
                <Text style={styles.highlight}>CarYanams Super App</Text>.
              </Text>
              <Text style={styles.subMessage}>
                Please install the Super App from Google Play Store to enjoy seamless
                bidding, live auctions, and more features.
              </Text>

              {/* Feature pills */}
              <View style={styles.featureRow}>
                {['Live Auctions', 'Real-time Bids', 'Secure Payments'].map((f) => (
                  <View key={f} style={styles.featurePill}>
                    <Ionicons name="checkmark-circle" size={13} color={Colors.accentGreen} />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>

              {/* Buttons */}
              <TouchableOpacity
                style={styles.updateButton}
                activeOpacity={0.85}
                onPress={handleUpdate}
              >
                <Ionicons name="logo-google-playstore" size={20} color={Colors.white} />
                <Text style={styles.updateButtonText}>Get Super App on Play Store</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.7}
                onPress={onClose}
              >
                <Text style={styles.closeButtonText}>Maybe Later</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.grayBorder,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grayLight,
    marginBottom: 16,
  },
  message: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  highlight: {
    color: Colors.primary,
    fontWeight: '700',
  },
  subMessage: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.badgeGreen,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  featureText: {
    fontSize: 11,
    color: Colors.accentGreen,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  updateButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  closeButton: {
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.grayBorder,
  },
  closeButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
