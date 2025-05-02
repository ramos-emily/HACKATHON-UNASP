import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HomeProps {
  user: string;
  onProfile: () => void;
  onFavorites: () => void;
  onLogout: () => void;
}

export default function Home({ user, onProfile, onFavorites, onLogout }: HomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{user}</Text>
        <Text style={styles.subheader}>RESUMO E SUAS ATIVIDADES</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={onProfile}>
          <Text style={styles.footerIcon}>👤</Text>
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={onLogout}>
          <Text style={styles.footerIcon}>🚪</Text>
          <Text style={styles.footerText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={onFavorites}>
          <Text style={styles.footerIcon}>❤️</Text>
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
    backgroundColor: '#f8f8f8',
  },
  footerButton: {
    alignItems: 'center',
    padding: 10,
  },
  footerIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 12,
    color: '#555',
  },
});