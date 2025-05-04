import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet,
  KeyboardAvoidingView, 
  Platform,
  Image 
} from 'react-native';
import { mockAuth as auth } from '../services/mockAuth';

interface RegisterProps {
  onBack: () => void;
  onRegister: () => void;
}

export default function Register({ onBack, onRegister }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      onRegister(); // Navega para Home
    } catch (error) {
      console.log('Erro simulado (não se preocupe)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image source={require('../assets/logowelcome.png')} style={styles.logo} />
        <Text style={styles.brand}>Daily Health</Text>
        <Text style={styles.title}>Cadastro</Text>
      
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmação de senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'CARREGANDO...' : 'Continue'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  logo: {
    width: 206,
    height: 215,
    resizeMode: 'contain',
    marginBottom: 15,
    marginTop: 70,
  },
  brand: {
    fontSize: 45,
    color: '#000000',
    fontFamily: 'Inter',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    color: '#003878',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#003878',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#85a3c3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backButtonText: {
    color: '#003878',
    fontSize: 14,
    fontWeight: 'bold',
  },
});