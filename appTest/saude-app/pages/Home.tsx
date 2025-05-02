import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileIcon = require('../assets/ProfileIcon.png');
const LogoIcon = require('../assets/LogoIcon.png');
const FavoriteIcon = require('../assets/FavoriteIcon.png');

interface HomeProps {
  user: string;
  onProfile: () => void;
  onFavorites: () => void;
  onHome: () => void;
}

export default function Home({ user, onProfile, onFavorites, onHome }: HomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{user}</Text>
        <Text style={styles.subheader}>RESUMO E SUAS ATIVIDADES</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={onProfile}>
          <Image
            source={ProfileIcon}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={onHome}>
          <Image
            source={LogoIcon}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={onFavorites}>
          <Image
            source={FavoriteIcon}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Questionários</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#003878',
  },
  footerButton: {
    alignItems: 'center',
    padding: 10,
  },
  footerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
  },
});