import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';


interface WelcomeProps {
  onGetStarted: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <ImageBackground source={require('../assets/fundowelcome.png')} 
    style={styles.container}
    imageStyle={styles.backgroundImage}
    resizeMode='cover'
    >
      <Text style={styles.title}>Seja Bem-Vindo</Text>
      < Image source={require('../assets/logowelcome.png')} style={styles.logo} />
      <Text style={styles.brand}>Daily Health</Text>
      <Text style={styles.subtitle}>Conectando você ao seu{'\n'}bem-estar!</Text>


      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 23,
  },
  backgroundImage: {
    // Ajusta a posição vertical da imagem
    top: -650, // negativo sobe, positivo desce
  },
  title: {
    fontSize: 24,
    color: '#003878',
    fontFamily: 'Inter-Medium.ttf',
    marginBottom: 52,
  },
  logo: {
    width: 206,
    height: 215,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  brand: {
    fontSize: 45,
    fontFamily: 'Inter',
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 24,
    color: '#56B6C3',
    fontFamily: 'Inter-Regular.ttf',
    textAlign: 'center',
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#003878',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter-Regular.ttf',  
  },
});