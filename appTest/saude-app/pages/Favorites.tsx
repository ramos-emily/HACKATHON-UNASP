import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FavoritesProps {
  onBack: () => void;
  navigation: {
    navigate: (screen: string) => void;
  };
}

const remedies = [
  { name: 'Nutrição', screen: 'Nutrition' },
  { name: 'Exercício', screen: 'Exercise' },
  { name: 'Água', screen: 'Water' },
  { name: 'Luz Solar', screen: 'Sun' },
  { name: 'Confiança', screen: 'Trust' },
  { name: 'Descanso', screen: 'Rest' },
  { name: 'Ar Puro', screen: 'CleanAir' },
  { name: 'Temperança', screen: 'Temperance' }
];

export default function Favorites({ onBack, navigation }: FavoritesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>8 REMÉDIOS NATURAIS</Text>

      <View style={styles.grid}>
        {remedies.map((remedy, index) => (
          <TouchableOpacity
            key={index}
            style={styles.remedyButton}
            onPress={() => navigation.navigate(remedy.screen)}
          >
            <Text style={styles.remedyText}>{remedy.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  remedyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1976d2',
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
  },
});