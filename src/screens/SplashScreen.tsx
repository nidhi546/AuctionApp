import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Entrance animation sequence
    Animated.sequence([
      // Logo fades + scales in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Title slides up
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // Tagline + dots
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotsOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Pulsing dots animation
      const pulse = Animated.loop(
        Animated.stagger(200, [
          Animated.sequence([
            Animated.timing(dot1, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(dot1, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(dot2, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(dot2, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(dot3, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(dot3, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          ]),
        ])
      );
      pulse.start();
    });

    // Navigate after 5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      {/* Background decorative circles */}
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.logoBox}>
          {/* Car icon (text-based logo placeholder) */}
          <Text style={styles.logoIconText}>🚗</Text>
        </View>
      </Animated.View>

      {/* Brand name */}
      <Animated.Text
        style={[
          styles.brandName,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        CarYanams
      </Animated.Text>

      <Animated.Text
        style={[
          styles.brandSub,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        AUCTION
      </Animated.Text>

      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Drive Your Dream Deal
      </Animated.Text>

      {/* Loading dots */}
      <Animated.View style={[styles.dotsContainer, { opacity: dotsOpacity }]}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
        ))}
      </Animated.View>

      {/* Footer */}
      <Text style={styles.footer}>v1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleLarge: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: Colors.grayLight,
    opacity: 0.5,
  },
  circleSmall: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.badgeBlue,
    opacity: 0.6,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBox: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 14,
  },
  logoIconText: {
    fontSize: 52,
  },
  brandName: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 6,
    marginTop: 2,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    fontSize: 12,
    color: Colors.grayBorder,
  },
});

export default SplashScreen;
