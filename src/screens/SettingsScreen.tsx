import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface SettingRowProps {
  icon: string;
  label: string;
  subtitle?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, label, subtitle }) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.7}>
    <View style={styles.rowIcon}>
      <Ionicons name={icon as any} size={20} color={Colors.primary} />
    </View>
    <View style={styles.rowText}>
      <Text style={styles.rowLabel}>{label}</Text>
      {subtitle && <Text style={styles.rowSub}>{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={16} color={Colors.grayBorder} />
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Settings</Text>
    </View>
    <View style={styles.body}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingRow icon="person-outline" label="Profile" subtitle="Manage your account" />
        <SettingRow icon="lock-closed-outline" label="Security" subtitle="Password & 2FA" />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
        <SettingRow icon="notifications-outline" label="Notifications" subtitle="Manage alerts" />
        <SettingRow icon="globe-outline" label="Language" subtitle="English" />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <SettingRow icon="information-circle-outline" label="App Version" subtitle="1.0.0" />
        <SettingRow icon="document-text-outline" label="Terms & Privacy" />
      </View>
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
  body: { flex: 1, padding: 16 },
  section: {
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    padding: 14,
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.grayLight,
    gap: 12,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.badgeBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  rowSub: { fontSize: 12, color: Colors.textMuted, marginTop: 1 },
});

export default SettingsScreen;
