import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Nutrition from './pages/Quiz/Nutrition';
import Exercise from './pages/Quiz/Exercise';
import Water from './pages/Quiz/Water';
import Sun from './pages/Quiz/Sun';
import Trust from './pages/Quiz/Trust';
import Rest from './pages/Quiz/Rest';
import Temperance from './pages/Quiz/Temperance';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user] = useState('MARIA DA SILVA');

  const screens = {
        Nutrition: <Nutrition onBack={() => setCurrentScreen('favorites')} />,
        Exercise: <Exercise onBack={() => setCurrentScreen('favorites')} />,
        Water: <Water onBack={() => setCurrentScreen('favorites')} />,
        Sun: <Sun onBack={() => setCurrentScreen('favorites')} />,
        Trust: <Trust onBack={() => setCurrentScreen('favorites')} />,
        Rest: <Rest onBack={() => setCurrentScreen('favorites')} />,

        Temperance: <Temperance onBack={() => setCurrentScreen('favorites')} />,
    login: <Login onLogin={() => setCurrentScreen('home')} />,
    home: (
      <Home
        user={user}
        onProfile={() => setCurrentScreen('profile')}
        onFavorites={() => setCurrentScreen('favorites')}
        onLogout={() => setCurrentScreen('login')}
      />
    ),
    profile: <Profile onBack={() => setCurrentScreen('home')} user={user} />,
    favorites: <Favorites onBack={() => setCurrentScreen('home')} />
  };

  return (
    <View style={styles.container}>
      {screens[currentScreen]}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});