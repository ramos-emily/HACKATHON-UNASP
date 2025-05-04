import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
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
import CleanAir from './pages/Quiz/CleanAir';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user] = useState('MARIA DA SILVA');
  const [previousScreen, setPreviousScreen] = useState<string | null>(null);

  const navigateTo = (screen: string) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (previousScreen) {
      setCurrentScreen(previousScreen);
      setPreviousScreen(null);
    }
  };

  const screens = {
    welcome: <Welcome onGetStarted={() => navigateTo('login')} />,
    login: <Login
            onLogin={() => navigateTo('home')}
            onSignup={() => navigateTo('register')}
           />,
           register: <Register 
           onBack={() => navigateTo('login')} 
           onRegister={() => navigateTo('home')} 
         />,
    home: (
      <Home
      onProfile={() => navigateTo('profile')}
      onHome={() => navigateTo('home')} 
      onFavorites={() => navigateTo('favorites')}
      onNavigation={(screen) => navigateTo(screen)}
    />
    ),
    profile: <Profile 
      onBack={goBack} 
      user={user} 
      onSave={() => navigateTo('home')}
    />,
    favorites: <Favorites
      onProfile={() => navigateTo('profile')}
      onHome={() => navigateTo('home')}
      onFavorites={() => navigateTo('favorites')}
    />,
    Nutrition: <Nutrition
    onBack={goBack}
    onNext={() => navigateTo('Exercise')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
    Exercise: <Exercise
    onBack={goBack}
    onNext={() => navigateTo('Water')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
    Water: <Water 
    onBack={goBack}
    onNext={() => navigateTo('Sun')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
    Sun: <Sun 
    onBack={goBack}
    onNext={() => navigateTo('Trust')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
    Trust: <Trust 
    onBack={goBack}
    onNext={() => navigateTo('Rest')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
    Rest: <Rest 
    onBack={goBack}
    onNext={() => navigateTo('Temperance')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
    Temperance: <Temperance 
    onBack={goBack}
    onNext={() => navigateTo('CleanAir')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
    CleanAir: <CleanAir 
    onBack={goBack}
    onNext={() => navigateTo('favorites')}
    onProfile={() => navigateTo('profile')}
    onHome={() => navigateTo('home')} 
    onFavorites={() => navigateTo('favorites')}
    />,
  };

  return (
    <View style={styles.container}>
      {screens[currentScreen as keyof typeof screens]}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});