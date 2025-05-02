import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuizProps {
  onBack: () => void;
}

export default function Nutrition({ onBack }: QuizProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questionário: Nutrição</Text>

      {/* Adicione aqui o conteúdo específico do questionário */}

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