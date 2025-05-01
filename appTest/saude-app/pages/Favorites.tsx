import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Favorites({ onGoBack }: { onGoBack: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Favoritos</Text>
      <Text>Lista de itens favoritos aparecerá aqui</Text>

      <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
        <Text>Voltar</Text>
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
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
  },
});