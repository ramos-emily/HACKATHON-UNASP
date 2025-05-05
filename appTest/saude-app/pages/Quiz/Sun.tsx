import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import Footer from '../../components/Footer';
import { saveQuizResult } from '../../services/mockStorage';

interface SunProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function Sol({ onBack, onNext, onProfile, onFavorites, onHome }: SunProps) {
  const [selectedOption1, setSelectedOption1] = useState<number | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<number | null>(null);

  const options = [
    { label: 'Nunca', value: 0 },
    { label: 'Raramente', value: 1 },
    { label: 'Às vezes', value: 2 },
    { label: 'Frequentemente', value: 3 },
    { label: 'Sempre', value: 4 }
  ];

  const calculateScore = () => {
    let score = 0;
    
    // Pontuação para exposição ao sol (ótimo entre 2-3 vezes/semana)
    if (selectedOption1 !== null) {
      // Máximo para "Às vezes" (valor 2), reduzindo para extremos
      score += Math.abs(2 - options[selectedOption1].value) === 0 ? 30 : 
               Math.abs(2 - options[selectedOption1].value) === 1 ? 25 : 15;
    }
    
    // Pontuação para luz natural em casa (quanto mais, melhor)
    if (selectedOption2 !== null) {
      score += options[selectedOption2].value * 10;
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
        sunExposure: options[selectedOption1].label,
        naturalLight: options[selectedOption2].label
      },
      score: calculateScore()
    };
  
    saveQuizResult('sun', result);
    
    if (onNext) onNext();
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/sun_icon.png')} style={styles.icon} />
        </View>
        <Image source={require('../../assets/sun_banner.png')} style={styles.banner} />

        {/* Pergunta 1 - Exposição ao sol */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Com que frequência você se expõe ao sol por pelo menos 15 minutos, sem o uso de protetor solar?
          </Text>

          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity 
                key={`q1-${index}`}
                style={[styles.option, selectedOption1 === index && styles.selectedOption]}
                onPress={() => setSelectedOption1(index)}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {options.map((_, index) => (
                <TouchableOpacity
                  key={`q1-dot-${index}`}
                  style={[styles.dot, selectedOption1 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption1(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 2 - Luz natural */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Em sua casa, as janelas e persianas são abertas diariamente para que entrem sol e luz natural?
          </Text>

          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity 
                key={`q2-${index}`}
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
              {options.map((_, index) => (
                <TouchableOpacity
                  key={`q2-dot-${index}`}
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    flexGrow: 1,
  },
  iconBackground: {
    width: '100%',
    backgroundColor: '#D3F0FF',
    alignItems: 'center',
    paddingVertical: 10,
    height: 75,
  },
  icon: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: -10,
  },
  banner: {
    width: 430,
    height: 90,
    resizeMode: 'contain',
    marginTop: 5,
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: '#FFF8E1',
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
  },
  option: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#FFECB3',
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
    borderColor: '#FFEB99',
  },
  selectedDot: {
    backgroundColor: '#FBC02D',
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