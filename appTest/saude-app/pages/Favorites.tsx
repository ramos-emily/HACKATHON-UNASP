import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import ResultItem from '../components/Favorito';
import Footer from '../components/Footer';
import { getQuizResults, calculateTotalScore } from '../services/mockStorage';

interface FavoritesProps {
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

// Valores ideais para cada categoria
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

// Ícones para cada categoria
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

  useEffect(() => {
    const quizData = getQuizResults();
    setResults(quizData);
    setTotalScore(calculateTotalScore());
    
    // Obtém os dados de análise corporal da página Exercise
    if (quizData.exercise?.bodyAnalysis) {
      setBodyAnalysis(quizData.exercise.bodyAnalysis);
    }
  }, []);

  // Dados padrão caso não tenha sido preenchido o questionário
  const defaultBodyAnalysis = {
    pressureClassification: '--',
    imcClassification: '--',
    imc: '--',
    rcqClassification: '--',
    rcq: '--',
    frame: '--'
  };

  const currentAnalysis = bodyAnalysis || defaultBodyAnalysis;

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/resultados_header.png')} style={styles.headerIcon} />
        </View>

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
        
        {/* Exibe apenas os questionários respondidos */}
        {Object.entries(results).map(([quizName, quizData]: [string, any]) => (
          <ResultItem
            key={quizName}
            imageSource={categoryIcons[quizName as keyof typeof categoryIcons]}
            title={quizName.charAt(0).toUpperCase() + quizName.slice(1).replace(/([A-Z])/g, ' $1')}
            value={`${quizData.score || '--'}`}
            idealText={idealScores[quizName as keyof typeof idealScores]}
          />
        ))}
      </ScrollView>
      
      <Footer onProfile={onProfile} onHome={onHome} onFavorites={onFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d7f0ff',
  },
  container: {
    paddingBottom: 20,
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
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
});