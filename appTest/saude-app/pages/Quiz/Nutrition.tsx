import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Footer from '../../components/Footer';
import { saveQuizResult } from '../../services/mockStorage';

interface NutriProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

const OptionButton = ({
  label,
  icon,
  onPress,
  isSelected,
}: {
  label: string;
  icon?: any;
  onPress: () => void;
  isSelected: boolean;
}) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    {icon && <Image source={icon} style={styles.optionIcon} />}
    <Text style={styles.optionLabel}>{label}</Text>
    {isSelected && <View style={styles.selectedDot} />}
  </TouchableOpacity>
);

export default function Nutrition({ onBack, onNext, onProfile, onFavorites, onHome }: NutriProps) {
  const [selectedOption1, setSelectedOption1] = useState<number | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<number | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<number | null>(null);

  const frequencyOptions = ['Nunca', 'Raramente', 'Algumas vezes', 'Muitas vezes', 'Sempre'];

  const foodTypeOptions = [
    { label: 'Não Vegetariano', icon: require('../../assets/nao_veg.png') },
    { label: 'Semi Vegetariano', icon: require('../../assets/semi_veg.png') },
    { label: 'Pesco Vegetariano', icon: require('../../assets/pesco.png') },
    { label: 'Ovolacto Vegetariano', icon: require('../../assets/ovolacto.png') },
    { label: 'Vegetariano Estrito', icon: require('../../assets/estrito.png') },
  ];

  const junkFoodOptions = [
    { label: 'Quatro ou mais', icon: require('../../assets/4_mais.png') },
    { label: 'Três', icon: require('../../assets/3.png') },
    { label: 'Dois', icon: require('../../assets/2.png') },
    { label: 'Um', icon: require('../../assets/1.png') },
    { label: 'Nenhuma' }, // sem imagem
  ];
  const calculateScore = () => {
    let score = 0;
    
    // Pontuação para a pergunta 1 (frequência de alimentos saudáveis)
    if (selectedOption1 !== null) {
      // Quanto maior a frequência, maior a pontuação (0 a 4)
      score += selectedOption1 * 5; // Multiplicador para dar mais peso
    }
    
    // Pontuação para a pergunta 2 (tipo de alimentação)
    if (selectedOption2 !== null) {
      // Quanto mais vegetariano, maior a pontuação (0 a 4)
      score += (4 - selectedOption2) * 7; // Invertido e com peso maior
    }
    
    // Pontuação para a pergunta 3 (junk food)
    if (selectedOption3 !== null) {
      // Quanto menos junk food, maior a pontuação (0 a 4)
      score += (4 - selectedOption3) * 6; // Invertido
    }
    
    return score;
  };

  const handleNext = () => {
    if (selectedOption1 === null || selectedOption2 === null || selectedOption3 === null) {
      Alert.alert('Atenção', 'Por favor, responda todas as perguntas');
      return;
    }
  
    const result = {
      answers: {
        frequency: frequencyOptions[selectedOption1],
        foodType: foodTypeOptions[selectedOption2].label,
        junkFood: junkFoodOptions[selectedOption3].label
      },
      score: calculateScore()
    };
  
    saveQuizResult('nutrition', result);
    
    if (onNext) onNext();
  };


  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/nutrition_icon.png')} style={styles.icon} />
        </View>
        <Image source={require('../../assets/nutrition_banner.png')} style={styles.banner} />

        {/* Pergunta 1 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Com que frequência você inclui nas principais refeições do dia: feijões, cereais integrais, castanhas, frutas, legumes e verduras?
          </Text>

          <View style={styles.optionsContainer}>
            {frequencyOptions.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                onPress={() => setSelectedOption1(index)}
                isSelected={selectedOption1 === index}
              />
            ))}
          </View>
        </View>

        {/* Pergunta 2 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Como você se classifica no que se refere ao tipo de alimento que você mais consome?
          </Text>

          <View style={styles.optionsContainer}>
            {foodTypeOptions.map((option, index) => (
              <OptionButton
                key={index}
                label={option.label}
                icon={option.icon}
                onPress={() => setSelectedOption2(index)}
                isSelected={selectedOption2 === index}
              />
            ))}
          </View>
        </View>

        {/* Pergunta 3 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Quantos dos itens a seguir você consome uma ou mais vezes por semana? (salgadinhos, bolachas, frituras, refrigerantes e doces de maneira geral)
          </Text>

          <View style={styles.optionsContainer}>
            {junkFoodOptions.map((option, index) => (
              <OptionButton
                key={index}
                label={option.label}
                icon={option.icon}
                onPress={() => setSelectedOption3(index)}
                isSelected={selectedOption3 === index}
              />
            ))}
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
  container: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  iconBackground: {
    width: '100%',
    backgroundColor: '#D3F0FF',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  banner: {
    width: 430,
    height: 90,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: '#E8F9E9',
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
  selectedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginTop: 5,
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