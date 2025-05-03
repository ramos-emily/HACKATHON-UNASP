import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileIcon = require('../assets/ProfileIcon.png');
const LogoIcon = require('../assets/LogoIcon.png');
const FavoriteIcon = require('../assets/FavoriteIcon.png');

interface FooterProps {
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function Footer({ onProfile, onHome, onFavorites }: FooterProps) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={onProfile}>
        <Image source={ProfileIcon} style={styles.footerIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={onHome}>
        <Image source={LogoIcon} style={styles.footerIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={onFavorites}>
        <Image source={FavoriteIcon} style={styles.footerIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 1,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#003878',
  },
  footerButton: {
    alignItems: 'center',
    padding: 10,
  },
  footerIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
});
