import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  Modal,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { VehicleCard } from '../components/VehicleCard';
import { Colors } from '../constants/colors';
import { VEHICLES, TABS } from '../constants/data';

const STORE_URL =
  Platform.OS === 'android'
    ? 'https://play.google.com/store/apps/details?id=com.caryanams.store'
    : 'https://apps.apple.com/us/app/caryanams/id6475390653';

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [searchText, setSearchText] = useState('');
  const [superAppModal, setSuperAppModal] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setSuperAppModal(true);
  }, []);

  const handleInstall = () => {
    Linking.openURL(STORE_URL);
  };

  const filtered = VEHICLES.filter((v) => {
    if (!searchText.trim()) return true;
    const q = searchText.toLowerCase();
    return v.name.toLowerCase().includes(q) || v.auctionNo.includes(q);
  });

  return (
    <View style={styles.root}>
      {/* Super-app install modal — no dismiss option */}
      <Modal
        visible={superAppModal}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <Ionicons name="rocket-outline" size={48} color={Colors.primary} />
            </View>
            <Text style={styles.modalTitle}>Install Our Super App</Text>
            <Text style={styles.modalBody}>
              For the best experience — live auctions, instant bids, and real-time
              notifications — download the CarYanams app from the{' '}
              {Platform.OS === 'android' ? 'Google Play Store' : 'Apple App Store'}.
            </Text>
            <TouchableOpacity
              style={styles.installBtn}
              onPress={handleInstall}
              activeOpacity={0.85}
            >
              <Ionicons
                name={Platform.OS === 'android' ? 'logo-google-playstore' : 'logo-apple'}
                size={20}
                color="#fff"
              />
              <Text style={styles.installBtnText}>
                {Platform.OS === 'android' ? 'Get it on Play Store' : 'Download on App Store'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Translucent status bar so gradient shows through */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Gradient header — covers status bar + title */}
      <LinearGradient
        colors={['#558aca', '#53bda1']}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientHeader, { paddingTop: insets.top }]}
      >
        <Text style={styles.headerTitle}>Welecom To CarYanams</Text>
      </LinearGradient>

      {/* Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Tab toggle */}
        <View style={styles.tabWrap}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label} ({tab.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search By Auction No, Car Name"
            placeholderTextColor={Colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Cards */}
        {filtered.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  gradientHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.3,
    marginTop: 8,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingTop: 16 },

  /* Tabs */
  tabWrap: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.white,
  },

  /* Search */
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 16,
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  /* Super-app modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  modalIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#eef4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalBody: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  installBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50,
    width: '100%',
    justifyContent: 'center',
  },
  installBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});

export default HomeScreen;
