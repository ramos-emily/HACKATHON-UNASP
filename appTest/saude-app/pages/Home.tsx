import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({
  user,
  onNavigateProfile,
  onNavigateFavorites,
  onLogout
}: {
  user: string;
  onNavigateProfile: () => void;
  onNavigateFavorites: () => void;
  onLogout: () => void;
}) {
  return (
    <View style={styles.container}>
      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.header}>{user}</Text>
        <Text style={styles.subheader}>RESUMO E SUAS ATIVIDADES</Text>

        {/* Seu conteúdo existente aqui */}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={onNavigateProfile}>
          <Text style={styles.footerIcon}>👤</Text>
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={onLogout}>
          <Text style={styles.footerIcon}>🚪</Text>
          <Text style={styles.footerText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={onNavigateFavorites}>
          <Text style={styles.footerIcon}>❤️</Text>
          <Text style={styles.footerText}>Favoritos</Text>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
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