import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Vehicle } from '../types';
import { Colors } from '../constants/colors';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: () => void;
}

// Indian number format: 1235000 → "12,35,000"
const formatINR = (amount: number): string => {
  const str = amount.toString();
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest !== '' ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3 : last3;
  return `₹ ${formatted}`;
};

const formatTime = (secs: number): string => {
  if (secs <= 0) return '0s';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onPress }) => {
  const [secsLeft, setSecsLeft] = useState(vehicle.timeLeftSeconds);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (secsLeft <= 0) return;
    const id = setInterval(() => setSecsLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.95} onPress={onPress}>

      {/* ── Auction number row ── */}
      <View style={styles.auctionRow}>
        <Text style={styles.auctionNo}>Auc No : {vehicle.auctionNo}</Text>
        <TouchableOpacity
          onPress={() => setFav(!fav)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={21}
            color={fav ? Colors.danger : '#BBBBBB'}
          />
        </TouchableOpacity>
      </View>

      {/* ── Car image ── */}
      <Image
        source={{ uri: vehicle.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* ── Name + info ── */}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {vehicle.name.toUpperCase()} {vehicle.year}
        </Text>
        <Text style={styles.info} numberOfLines={1}>
          {'• '}{vehicle.registrationNo}{'  •  '}{vehicle.ownerType}
          {'  •  '}{vehicle.kmDriven}{'  •  '}{vehicle.fuelType}
        </Text>

        {/* ── Bid row ── */}
        <View style={styles.bidRow}>
          {/* Highest bids pill */}
          <LinearGradient
           colors={['#558aca', '#53bda1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bidPill}
          >
            <Text style={styles.bidPillLabel}>Highest Bids </Text>
            <Text style={styles.bidPillAmount}>{formatINR(vehicle.highestBid)}</Text>
          </LinearGradient>

          {/* Accepting Bids / timer pill */}
          {vehicle.isAcceptingBids ? (
            <View style={styles.timerPill}>
              <Text style={styles.acceptingLabel}>Accepting Bids</Text>
              <Text style={styles.timerValue}>{formatTime(secsLeft)}</Text>
            </View>
          ) : (
            <View style={styles.closedPill}>
              <Text style={styles.closedLabel}>Bidding Closed</Text>
            </View>
          )}
        </View>
      </View>

      {/* ── Fair Market Value banner ── */}
      <View style={styles.fmvBanner}>
        <Text style={styles.fmvText}>
          Fair Market Value : {formatINR(vehicle.fairMarketValue)}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginHorizontal: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },

  /* Auction row */
  auctionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  auctionNo: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,          // dark navy-teal, matches screenshot
  },

  /* Image */
  image: {
    width: '100%',
    height: 185,
    backgroundColor: Colors.grayLight,
  },

  /* Body */
  body: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  info: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },

  /* Bid row */
  bidRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
  },

  /* Green bid pill */
  bidPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  bidPillLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bidPillAmount: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* Coral/pink timer pill */
  timerPill: {
    backgroundColor: Colors.acceptingBg,  // #FFEAEA — light coral
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 115,
  },
  acceptingLabel: {
    fontSize: 10,
    color: Colors.acceptingText,           // #E03636 — coral red
    fontWeight: '700',
    marginBottom: 2,
  },
  timerValue: {
    fontSize: 14,
    color: Colors.timerText,              // dark — countdown digits
    fontWeight: '800',
  },

  /* Closed pill */
  closedPill: {
    backgroundColor: Colors.grayLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 115,
  },
  closedLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },

  /* Dark navy FMV banner */
  fmvBanner: {
    backgroundColor: Colors.primary,      // #1B3F6E — same navy as tabs
    paddingVertical: 10,
    alignItems: 'center',
  },
  fmvText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
