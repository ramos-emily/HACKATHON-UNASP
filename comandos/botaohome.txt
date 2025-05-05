import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../components/Footer'; 

const remedies = [
  { name: 'Nutrição', screen: 'Nutrition', color: '#4CAF50' },
  { name: 'Exercício', screen: 'Exercise', color: '#2196F3' },
  { name: 'Água', screen: 'Water', color: '#00BCD4' },
  { name: 'Luz Solar', screen: 'Sun', color: '#FFC107' },
  { name: 'Confiança', screen: 'Trust', color: '#9C27B0' },
  { name: 'Descanso', screen: 'Rest', color: '#607D8B' },
  { name: 'Ar Puro', screen: 'CleanAir', color: '#8BC34A' },
  { name: 'Temperança', screen: 'Temperance', color: '#FF5722' }
];

interface HomeProps {
  user: string;
  onProfile: () => void;
  onFavorites: () => void;
  onHome: () => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function Home({ user, onProfile, onFavorites, onHome, onBack, onNavigate }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>8 REMÉDIOS NATURAIS</Text>

      <View style={styles.grid}>
        {remedies.map((remedy, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.remedyButton, { backgroundColor: remedy.color }]}
            onPress={() => onNavigate(remedy.screen)}
          >
            <Text style={styles.remedyText}>{remedy.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Footer onProfile={onProfile} onHome={onHome} onFavorites={onFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  remedyButton: {
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  remedyText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#795548',
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
