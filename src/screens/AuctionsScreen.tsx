import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const AuctionsScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Auctions</Text>
    </View>
    <View style={styles.body}>
      <Ionicons name="car-outline" size={64} color={Colors.grayBorder} />
      <Text style={styles.label}>All Auctions</Text>
      <Text style={styles.sub}>Browse all available auctions here.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  title: { fontSize: 22, fontWeight: '800', color: Colors.white },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  label: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  sub: { fontSize: 13, color: Colors.textMuted },
});

export default AuctionsScreen;
