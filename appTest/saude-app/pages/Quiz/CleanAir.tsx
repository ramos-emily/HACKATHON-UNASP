import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Footer from '../../components/Footer';
import { saveQuizResult } from '../../services/mockStorage';

interface AirProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function AirHeader({ onBack, onNext, onProfile, onFavorites, onHome }: AirProps) {
  const [selectedOption1, setSelectedOption1] = useState<number | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<number | null>(null);

  const airOptions = [
    { label: 'Muito Ruim', icon: require('../../assets/muito_ruim.png'), value: 0 },
    { label: 'Ruim', icon: require('../../assets/ruim.png'), value: 1 },
    { label: 'Regular', icon: require('../../assets/regular.png'), value: 2 },
    { label: 'Boa', icon: require('../../assets/boa.png'), value: 3 },
    { label: 'Muito Boa', icon: require('../../assets/muito_boa.png'), value: 4 },
  ];

  const breathingOptions = [
    { label: 'Nunca', value: 0 },
    { label: 'Raramente', value: 1 },
    { label: 'Algumas vezes', value: 2 },
    { label: 'Muitas vezes', value: 3 },
    { label: 'Sempre', value: 4 },
  ];

  const calculateScore = () => {
    let score = 0;
    
    if (selectedOption1 !== null) {
      score += airOptions[selectedOption1].value * 5;
    }
    
    if (selectedOption2 !== null) {
      score += breathingOptions[selectedOption2].value * 5;
    }
    
    return score;
  };

  const handleNext = () => {
    if (selectedOption1 === null || selectedOption2 === null) {
      Alert.alert('Atenção', 'Por favor, responda todas as perguntas');
      return;
    }
  
    const result = {
      answers: {
        airQuality: airOptions[selectedOption1].label,
        breathingPractice: breathingOptions[selectedOption2].label
      },
      score: calculateScore()
    };
  
    saveQuizResult('cleanAir', result);
    
    if (onNext) onNext();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/air_icon.png')} style={styles.icon} />
        </View>
        <Image source={require('../../assets/air_pure.png')} style={styles.banner} />

        {/* Pergunta 1 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Considerando os lugares onde passa a maior parte do tempo, como você classifica a qualidade do ar que respira?
          </Text>

          <View style={styles.optionsContainer}>
            {airOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.option, selectedOption1 === index && styles.selectedOption]}
                onPress={() => setSelectedOption1(index)}
              >
                <Image source={option.icon} style={styles.optionIcon} />
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {airOptions.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dot, selectedOption1 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption1(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 2 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Você faz respiração profunda ao ar livre ou quando precisa controlar a tensão e a ansiedade?
          </Text>

          <View style={styles.optionsContainer}>
            {breathingOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.option, selectedOption2 === index && styles.selectedOption]}
                onPress={() => setSelectedOption2(index)}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {breathingOptions.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dot, selectedOption2 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption2(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Setas de navegação */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={onBack}>
            <Image source={require('../../assets/setaEsquerda.png')} style={styles.navArrow} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <Image source={require('../../assets/setaDireita.png')} style={styles.navArrow} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer onProfile={onProfile} onHome={onHome} onFavorites={onFavorites} />
    </View>
  );
}

// Mantenha os mesmos estilos que você já tem
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconBackground: {
    width: '100%',
    backgroundColor: '#D3F0FF',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  banner: {
    width: 430,
    height: 90,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: '#D3F0FF',
    borderRadius: 15,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  option: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#C0E8FF',
  },
  optionIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  optionLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  lineWrapper: {
    position: 'relative',
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 10,
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: 10,
    right: 10,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ADD8E6',
  },
  selectedDot: {
    backgroundColor: '#4A90E2',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
    marginBottom: 30,
  },
  navArrow: {
    width: 10,
    height: 50,
    resizeMode: 'contain',
  },
});