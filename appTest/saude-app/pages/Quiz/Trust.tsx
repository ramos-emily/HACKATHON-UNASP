import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import Footer from '../../components/Footer';
import { saveQuizResult } from '../../services/mockStorage';

interface TrustProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function Trust({ onBack, onNext, onProfile, onFavorites, onHome }: TrustProps) {
  const [selectedOption1, setSelectedOption1] = useState<number | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<number | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<number | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<number | null>(null);
  const [selectedOption5, setSelectedOption5] = useState<number | null>(null);

  const options = [
    { label: 'Nunca', value: 0 },
    { label: 'Raramente', value: 1 },
    { label: 'Às vezes', value: 2 },
    { label: 'Frequentemente', value: 3 },
    { label: 'Sempre', value: 4 }
  ];

  const calculateScore = () => {
    let score = 0;
    
    // Pontuação para confiança em Deus
    if (selectedOption1 !== null) {
      score += options[selectedOption1].value * 10;
    }
    
    // Pontuação para influência positiva
    if (selectedOption2 !== null) {
      score += options[selectedOption2].value * 10;
    }
    
    // Pontuação para participação em reuniões
    if (selectedOption3 !== null) {
      score += options[selectedOption3].value * 8;
    }
    
    // Pontuação para práticas espirituais
    if (selectedOption4 !== null) {
      score += options[selectedOption4].value * 8;
    }
    
    // Pontuação para preocupação com a morte (invertida)
    if (selectedOption5 !== null) {
      score += (4 - options[selectedOption5].value) * 4;
    }
    
    return score;
  };

  const handleNext = () => {
    if (selectedOption1 === null || selectedOption2 === null || 
        selectedOption3 === null || selectedOption4 === null || 
        selectedOption5 === null) {
      Alert.alert('Atenção', 'Por favor, responda todas as perguntas');
      return;
    }
  
    const result = {
      answers: {
        confiaEmDeus: options[selectedOption1].label,
        influenciaPositiva: options[selectedOption2].label,
        participaReunioes: options[selectedOption3].label,
        praticaAtividades: options[selectedOption4].label,
        preocupacaoMorte: options[selectedOption5].label
      },
      score: calculateScore()
    };
  
    saveQuizResult('trust', result);
    
    if (onNext) onNext();
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/iconCruz.png')} style={styles.icon} />
        </View>
        <Image source={require('../../assets/confianca_banner.png')} style={styles.banner} />

        {/* Pergunta 1 - Confiança em Deus */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Você confia em Deus?</Text>
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

        {/* Pergunta 2 - Influência positiva */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Sua confiança em Deus influencia positivamente sua maneira de viver?</Text>
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

        {/* Pergunta 3 - Reuniões religiosas */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Com que frequência você participa de reuniões religiosas?</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
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
              {options.map((_, index) => (
                <TouchableOpacity
                  key={`q3-dot-${index}`}
                  style={[styles.dot, selectedOption3 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption3(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 4 - Práticas espirituais */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Você pratica atividades religiosas ou espirituais em sua vida particular?</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
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
              {options.map((_, index) => (
                <TouchableOpacity
                  key={`q4-dot-${index}`}
                  style={[styles.dot, selectedOption4 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption4(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 5 - Preocupação com a morte */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Você fica preocupado ou com medo do que irá acontecer comigo quando morrer?</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity 
                key={`q5-${index}`}
                style={[styles.option, selectedOption5 === index && styles.selectedOption]}
                onPress={() => setSelectedOption5(index)}
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
                  key={`q5-dot-${index}`}
                  style={[styles.dot, selectedOption5 === index && styles.selectedDot]}
                  onPress={() => setSelectedOption5(index)}
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
  container: {
    paddingBottom: 20,
    alignItems: 'center',
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
    backgroundColor: '#FFE4FE',
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
    backgroundColor: '#FFE4FE',
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