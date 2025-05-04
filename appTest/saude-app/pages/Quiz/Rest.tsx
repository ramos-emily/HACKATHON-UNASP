import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Footer from '../../components/Footer';
import { saveQuizResult } from '../../services/mockStorage';

interface RestProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function Rest({ onBack, onNext, onProfile, onFavorites, onHome }: RestProps) {
  const [selectedOption1, setSelectedOption1] = useState<number | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<number | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<number | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<number | null>(null);

  const sleepOptions = [
    { label: 'Nunca', value: 0, icon: require('../../assets/nuncaIcon.png') },
    { label: 'Quase nunca', value: 1, icon: require('../../assets/iconQuaseNunca.png') },
    { label: 'Algumas vezes', value: 2, icon: require('../../assets/algumasVezes.png') },
    { label: 'Muitas vezes', value: 3, icon: require('../../assets/muitasVezes.png') },
    { label: 'Sempre', value: 4, icon: require('../../assets/iconSempre.png') },
  ];

  const calculateScore = () => {
    let score = 0;
    
    // Pontuação para cada pergunta (0 a 4) * peso
    if (selectedOption1 !== null) {
      score += sleepOptions[selectedOption1].value * 5; // Peso maior para primeira pergunta
    }
    
    if (selectedOption2 !== null) {
      score += sleepOptions[selectedOption2].value * 4;
    }
    
    if (selectedOption3 !== null) {
      // Invertido pois distúrbios são negativos
      score += (4 - sleepOptions[selectedOption3].value) * 3;
    }
    
    if (selectedOption4 !== null) {
      score += sleepOptions[selectedOption4].value * 3;
    }
    
    return score;
  };

  const handleNext = () => {
    if (selectedOption1 === null || selectedOption2 === null || 
        selectedOption3 === null || selectedOption4 === null) {
      Alert.alert('Atenção', 'Por favor, responda todas as perguntas');
      return;
    }
  
    const result = {
      answers: {
        sleepQuality: sleepOptions[selectedOption1].label,
        earlySleep: sleepOptions[selectedOption2].label,
        sleepDisorders: sleepOptions[selectedOption3].label,
        beforeMidnight: sleepOptions[selectedOption4].label
      },
      score: calculateScore()
    };
  
    saveQuizResult('rest', result);
    
    if (onNext) onNext();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/iconLua.png')} style={styles.icon} />
        </View>

        <Image source={require('../../assets/descanso_banner.png')} style={styles.banner} />

        {/* Pergunta 1 - Qualidade do sono */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Você dorme de 7 a 8 horas por noite e acorda descansado e com boa disposição na maioria das vezes?
          </Text>
          <View style={styles.optionsContainer}>
            {sleepOptions.map((option, index) => (
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
              {sleepOptions.map((_, index) => (
                <TouchableOpacity
                  key={`q1-dot-${index}`}
                  style={[styles.dot, selectedOption1 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption1(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 2 - Dormir cedo */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Você costuma dormir cedo por volta das 22h?</Text>
          <View style={styles.optionsContainer}>
            {sleepOptions.map((option, index) => (
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
              {sleepOptions.map((_, index) => (
                <TouchableOpacity
                  key={`q2-dot-${index}`}
                  style={[styles.dot, selectedOption2 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption2(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 3 - Distúrbios do sono */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Você costuma ter algum distúrbio ou acordar antes do sono?</Text>
          <View style={styles.optionsContainer}>
            {sleepOptions.map((option, index) => (
              <TouchableOpacity
                key={`q3-${index}`}
                style={[styles.option, selectedOption3 === index && styles.selectedOption]}
                onPress={() => setSelectedOption3(index)}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {sleepOptions.map((_, index) => (
                <TouchableOpacity
                  key={`q3-dot-${index}`}
                  style={[styles.dot, selectedOption3 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption3(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 4 - Dormir antes da meia-noite */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Você costuma dormir antes da meia-noite?</Text>
          <View style={styles.optionsContainer}>
            {sleepOptions.map((option, index) => (
              <TouchableOpacity
                key={`q4-${index}`}
                style={[styles.option, selectedOption4 === index && styles.selectedOption]}
                onPress={() => setSelectedOption4(index)}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {sleepOptions.map((_, index) => (
                <TouchableOpacity
                  key={`q4-dot-${index}`}
                  style={[styles.dot, selectedOption4 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption4(index)}
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

// Mantenha os mesmos estilos
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
    backgroundColor: '#FFDDEF',
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
    backgroundColor: '#FFDDEF',
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