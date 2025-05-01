import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState('login');
  const [user, setUser] = React.useState('Maria da Silva');

  const goToHome = () => setCurrentScreen('home');
  const goToProfile = () => setCurrentScreen('profile');
  const goToFavorites = () => setCurrentScreen('favorites');
  const logout = () => setCurrentScreen('login');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {currentScreen === 'login' ? (
        <View style={styles.mainScreen}>
          <Text style={styles.title}>Página de Login</Text>
          <TouchableOpacity style={styles.button} onPress={goToHome}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      ) : currentScreen === 'home' ? (
        <Home
          user={user}
          onNavigateProfile={goToProfile}
          onNavigateFavorites={goToFavorites}
          onLogout={logout}
        />
      ) : currentScreen === 'profile' ? (
        <Profile onGoBack={goToHome} user={user} />
      ) : (
        <Favorites onGoBack={goToHome} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});