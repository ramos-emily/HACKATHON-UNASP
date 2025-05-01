import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function Profile({ onGoBack }: { onGoBack: () => void }) {
  const [editing, setEditing] = React.useState(false);
  const [weight, setWeight] = React.useState('65');

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>PERFIL</Text>

      {/* Nome do usuário */}
      <Text style={styles.userName}>MARIA DA SILVA</Text>

      {/* Informações do perfil */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Data de nascimento</Text>
          <Text style={styles.infoValue}>22-01-2007</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Altura</Text>
          <Text style={styles.infoValue}>1.65 m</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Peso</Text>
          <Text>style={styles.nomeDoPerfil} AAAAAAAAAAAAAAAAAAAa</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              autoFocus
            />
          ) : (
            <Text style={styles.infoValue}>{weight} kg</Text>
          )}
          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Text style={styles.editButton}>{editing ? 'salvar' : 'editar'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
        <Text style={styles.backButtonText}>Voltar</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },

  userName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#444',
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#2196F3',
    padding: 0,
    marginRight: 10,
  },
  editButton: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
    width: 60,
    textAlign: 'right',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});