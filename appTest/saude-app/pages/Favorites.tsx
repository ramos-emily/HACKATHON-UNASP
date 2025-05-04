import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native';
import ResultItem from '../components/Favorito';
import Footer from '../components/Footer';
import { getQuizResults, calculateTotalScore } from '../services/mockStorage';
import SimpleHealthBot from '../components/SimpleHealthBot';
import { mockFirestore } from '../services/mockFirestore';

interface FavoritesProps {
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

const idealScores = {
  nutrition: '25',
  water: '20',
  exercise: '20',
  sun: '15',
  trust: '15',
  rest: '15',
  temperance: '10',
  cleanAir: '10'
};

const categoryIcons = {
  nutrition: require('../assets/iconMaca.png'),
  water: require('../assets/iconWater.png'),
  exercise: require('../assets/iconCruz.png'),
  sun: require('../assets/iconSol.png'),
  trust: require('../assets/iconCoracao.png'),
  rest: require('../assets/iconLua.png'),
  temperance: require('../assets/iconJustica.png'),
  cleanAir: require('../assets/iconAr.png')
};

export default function Favorites({ onProfile, onHome, onFavorites }: FavoritesProps) {
  const [results, setResults] = useState<any>({});
  const [totalScore, setTotalScore] = useState(0);
  const [bodyAnalysis, setBodyAnalysis] = useState<any>(null);
  const [healthResults, setHealthResults] = useState<any>({});
  const [chatVisible, setChatVisible] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Configuração ajustada para posicionar mais acima
  const buttonY = scrollY.interpolate({
    inputRange: [0, 50],  // Range menor para animação mais rápida
    outputRange: [70, 20], // Inicia em 70px (mais perto do header) e fixa em 20px
    extrapolate: 'clamp'
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  useEffect(() => {
    const quizData = getQuizResults();
    setResults(quizData);
    setTotalScore(calculateTotalScore());
    
    if (quizData.exercise?.bodyAnalysis) {
      setBodyAnalysis(quizData.exercise.bodyAnalysis);
    }

    const healthData = mockFirestore.getHealthResults();
    setHealthResults(healthData);
  }, []);

  const currentAnalysis = bodyAnalysis || {
    pressureClassification: '--',
    imcClassification: '--',
    imc: '--',
    rcqClassification: '--',
    rcq: '--',
    frame: '--'
  };

  return (
    <View style={styles.mainContainer}>
      {/* Cabeçalho fixo */}
      <View style={styles.header}>
        <Image source={require('../assets/resultados_header.png')} style={styles.headerIcon} />
      </View>

      {/* Botão flutuante posicionado antes do ScrollView */}
      <Animated.View style={[
        styles.chatButton,
        {
          transform: [{ translateY: buttonY }],
          top: 70 // Posição inicial ajustada para mais perto do header
        }
      ]}>
        <TouchableOpacity 
          onPress={() => setChatVisible(true)}
          style={styles.chatButtonTouchable}
        >
          <Image 
            source={require('../assets/LogoFavorites.png')} 
            style={styles.chatButtonImage}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Área de conteúdo rolável */}
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 80 }]} // Padding ajustado
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.totalContainer}>
          <View style={styles.resultadosBox}>
            <Text style={styles.headerTitle}>RESULTADOS</Text>
          </View>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <ResultItem
            imageSource={require('../assets/LogoFavorites.png')}
            title=""
            value={`${totalScore}`}
            idealText="150"
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>ANÁLISES CORPORAIS</Text>
        <ResultItem 
          imageSource={require('../assets/pressao.png')} 
          title="Pressão Arterial" 
          value={currentAnalysis.pressureClassification}
          idealText="Normal"
        />
        <ResultItem 
          imageSource={require('../assets/imc.png')} 
          title="IMC" 
          value={currentAnalysis.imcClassification}
          idealText={`${currentAnalysis.imc} (Normal)`}
        />
        <ResultItem 
          imageSource={require('../assets/peso.png')} 
          title="PCI" 
          value={currentAnalysis.rcqClassification}
          idealText={`${currentAnalysis.rcq} (Normal)`}
        />
        <ResultItem 
          imageSource={require('../assets/cintura.png')} 
          title="RCQ" 
          value={currentAnalysis.rcqClassification}
          idealText="<0.85"
        />

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>POR CATEGORIA</Text>
        
        {Object.entries(results).map(([quizName, quizData]: [string, any]) => (
          <ResultItem
            key={quizName}
            imageSource={categoryIcons[quizName as keyof typeof categoryIcons]}
            title={quizName.charAt(0).toUpperCase() + quizName.slice(1).replace(/([A-Z])/g, ' $1')}
            value={`${quizData.score || '--'}`}
            idealText={idealScores[quizName as keyof typeof idealScores]}
          />
        ))}
      </Animated.ScrollView>

      {/* Modal do chatbot */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChatVisible(false)}
      >
        <View style={styles.modalContainer}>
          <SimpleHealthBot
            userResults={healthResults}
            onClose={() => setChatVisible(false)}
          />
        </View>
      </Modal>
      
      <Footer onProfile={onProfile} onHome={onHome} onFavorites={onFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d7f0ff',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerIcon: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  resultadosBox: {
    backgroundColor: '#007ED5',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 15,
    width: '80%',
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  totalContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: '#003878',
    fontWeight: '600',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#007ED5',
    marginVertical: 15,
    width: '90%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003878',
    textAlign: 'center',
    marginVertical: 10,
  },
  chatButton: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007ED5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
  },
  chatButtonTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});