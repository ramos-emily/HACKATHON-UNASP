import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Footer from '../../components/Footer';
import { saveQuizResult } from '../../services/mockStorage';

interface WaterProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function Water({ onBack, onNext, onProfile, onHome, onFavorites }: WaterProps) {
  const [selectedCupIndex, setSelectedCupIndex] = useState<number | null>(null);
  const [selectedRemedyIndex, setSelectedRemedyIndex] = useState<number | null>(null);
  const [selectedUrineIndex, setSelectedUrineIndex] = useState<number | null>(null);

  const cupOptions = [
    { label: 'Nenhum', value: 0, image: require('../../assets/cups_none.png') },
    { label: '1 a 3', value: 1, image: require('../../assets/cups_1_3.png') },
    { label: '4 a 6', value: 2, image: require('../../assets/cups_4_6.png') },
    { label: '7', value: 3, image: require('../../assets/cups_7.png') },
    { label: '8 ou mais', value: 4, image: require('../../assets/cups_8_plus.png') },
  ];

  const remedyOptions = [
    { label: 'Nunca', value: 0 },
    { label: 'Raramente', value: 1 },
    { label: 'Algumas vezes', value: 2 },
    { label: 'Muitas vezes', value: 3 },
    { label: 'Sempre', value: 4 }
  ];

  const urineOptions = [
    { label: 'Casos Médicos', value: 0, image: require('../../assets/urine_0.png') },
    { label: 'Severamente Desidratado', value: 1, image: require('../../assets/urine_1.png') },
    { label: 'Moderadamente Desidratado', value: 2, image: require('../../assets/urine_2.png') },
    { label: 'Levemente Desidratado', value: 3, image: require('../../assets/urine_3.png') },
    { label: 'Bem Hidratado', value: 4, image: require('../../assets/urine_4.png') },
  ];

  const calculateScore = () => {
    let score = 0;
    
    // Pontuação para consumo de água (ideal 7-8 copos)
    if (selectedCupIndex !== null) {
      const cupValue = cupOptions[selectedCupIndex].value;
      if (cupValue === 3) score += 40; // 7 copos (ótimo)
      else if (cupValue === 4) score += 35; // 8+ copos (muito bom)
      else if (cupValue === 2) score += 25; // 4-6 copos (bom)
      else if (cupValue === 1) score += 10; // 1-3 copos (ruim)
      else score += 5; // nenhum (muito ruim)
    }
    
    // Pontuação para uso da água como remédio (quanto mais, melhor)
    if (selectedRemedyIndex !== null) {
      score += remedyOptions[selectedRemedyIndex].value * 5;
    }
    
    // Pontuação para cor da urina (quanto mais clara, melhor)
    if (selectedUrineIndex !== null) {
      score += urineOptions[selectedUrineIndex].value * 10;
    }
    
    return score;
  };

  const handleNext = () => {
    if (selectedCupIndex === null || selectedRemedyIndex === null || selectedUrineIndex === null) {
      Alert.alert('Atenção', 'Por favor, responda todas as perguntas');
      return;
    }
  
    const result = {
      answers: {
        coposAgua: cupOptions[selectedCupIndex].label,
        aguaRemedio: remedyOptions[selectedRemedyIndex].label,
        corUrina: urineOptions[selectedUrineIndex].label
      },
      score: calculateScore()
    };
  
    saveQuizResult('water', result);
    
    if (onNext) onNext();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/header-icon.png')} style={styles.icon} />
        </View>

        <Image source={require('../../assets/agua-botao-unico.png')} style={styles.singleButtonImage} />

        {/* Primeira Pergunta - Consumo de Água */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Quantos copos (250ml) de água você bebe diariamente?
          </Text>

          <View style={styles.cupsRow}>
            {cupOptions.map((item, index) => (
              <TouchableOpacity
                key={`water-${index}`}
                style={styles.cupIllustration}
                onPress={() => setSelectedCupIndex(index)}
              >
                <Image
                  source={item.image}
                  style={[
                    styles.cupImage,
                    selectedCupIndex === index && { tintColor: '#005b96' },
                  ]}
                />
                <Text style={[
                  styles.optionLabel,
                  selectedCupIndex === index && { fontWeight: 'bold', color: '#005b96' }
                ]}>
                  {item.label} {item.label !== 'Nenhum' && 'copos'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Segunda Pergunta - Água como Remédio */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Você utiliza a água como remédio para tratamentos caseiros quando necessário?
          </Text>

          <View style={styles.cupsRow}>
            {remedyOptions.map((item, index) => (
              <TouchableOpacity
                key={`remedy-${index}`}
                style={styles.cupIllustration}
                onPress={() => setSelectedRemedyIndex(index)}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    selectedRemedyIndex === index && { fontWeight: 'bold', color: '#005b96' },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Terceira Pergunta - Cor da Urina */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Qual a cor da sua urina?</Text>

          <View style={styles.cupsRow}>
            {urineOptions.map((item, index) => (
              <TouchableOpacity
                key={`urine-${index}`}
                style={styles.cupIllustration}
                onPress={() => setSelectedUrineIndex(index)}
              >
                <Image
                  source={item.image}
                  style={[
                    styles.cupImage,
                    selectedUrineIndex === index && { tintColor: '#005b96' },
                  ]}
                />
                <Text style={[
                  styles.optionLabel,
                  selectedUrineIndex === index && { fontWeight: 'bold', color: '#005b96' }
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Navegação */}
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
  container: {
    alignItems: 'center',
    paddingBottom: 20,
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
  },
  singleButtonImage: {
    width: 490,
    height: 55,
    resizeMode: 'contain',
    marginTop: 10,
  },
  questionContainer: {
    backgroundColor: '#D3F0FF',
    marginTop: 20,
    borderRadius: 16,
    padding: 18,
    width: '90%',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#000',
  },
  cupsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  cupIllustration: {
    alignItems: 'center',
    width: '18%',
    marginVertical: 10,
  },
  cupImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  optionLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: '#000',
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