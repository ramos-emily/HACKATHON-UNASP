import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Footer from '../../components/Footer';

interface TempProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function Temperanca({ onBack, onNext, onProfile, onFavorites, onHome }: TempProps) {
  const [bebida, setBebida] = useState<boolean | null>(null);
  const [tempoTela, setTempoTela] = useState<number | null>(null);
  const [relacionamento, setRelacionamento] = useState<number | null>(null);
  const [emocaoEstresse, setEmocaoEstresse] = useState<number | null>(null);

  const telaOptions = [
    'Mais de 4 horas',
    'De 3 a 4 horas',
    '2 a 3 horas',
    '1 a 2 horas',
    'Menos de 1 hora',
  ];

  const relacionamentoOptions = [
    'Raramente',
    'Ocasionalmente',
    'Às vezes',
    'Geralmente',
    'Sempre',
  ];

  const emocaoOptions = [
    'Triste',
    'Ansioso',
    'Agressivo',
    'Irritado',
    'Impaciente',
  ];

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image source={require('../../assets/temperance_icon.png')} style={styles.icon} />
        </View>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>TEMPERANÇA</Text>
        </View>

        {/* Pergunta 1 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Você ingere bebida alcoólica (cerveja, vinho, licor, aguardente, pinga ou qualquer outra)?
          </Text>
          <View style={styles.yesNoContainer}>
            <TouchableOpacity
              style={[styles.optionButton, bebida === true && styles.selectedYes]}
              onPress={() => setBebida(true)}
            >
              <Image source={require('../../assets/check.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>SIM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, bebida === false && styles.selectedNo]}
              onPress={() => setBebida(false)}
            >
              <Image source={require('../../assets/x.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>NÃO</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pergunta 2 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Número de horas que eu passo em frente de uma tela como diversão ou passatempo{'\n'}(TV, jogos, computador, celular, etc)
          </Text>
          <View style={styles.optionsContainer}>
            {telaOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => setTempoTela(index)}>
                <Text style={styles.optionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {telaOptions.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dot, tempoTela === index && styles.selectedDot]}
                  onPress={() => setTempoTela(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 3 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Eu possuo um bom relacionamento com as pessoas ao meu redor (trabalho, família, amigos, etc)
          </Text>
          <View style={styles.optionsContainer}>
            {relacionamentoOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => setRelacionamento(index)}>
                <Text style={styles.optionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {relacionamentoOptions.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dot, relacionamento === index && styles.selectedDot]}
                  onPress={() => setRelacionamento(index)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pergunta 4 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Quando estou sob pressão ou estresse, eu costumo me sentir mais...
          </Text>
          <View style={styles.optionsContainer}>
            {emocaoOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => setEmocaoEstresse(index)}>
                <Text style={styles.optionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {emocaoOptions.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dot, emocaoEstresse === index && styles.selectedDot]}
                  onPress={() => setEmocaoEstresse(index)}
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
        
                  <TouchableOpacity onPress={onNext}>
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
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#D3F0FF',
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 90,
    resizeMode: 'contain',
    marginTop: 10,
  },
  banner: {
    backgroundColor: '#F9B64D',
    paddingVertical: 10,
    paddingHorizontal: 140,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  questionBox: {
    backgroundColor: '#FFE6C9',
    borderRadius: 15,
    padding: 15,
    width: '90%',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    color: '#000',
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    alignItems: 'center',
    padding: 5,
    width: 80,
    borderRadius: 10,
  },
  selectedYes: {
    backgroundColor: '#D0F5D6',
  },
  selectedNo: {
    backgroundColor: '#F5D0D0',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  optionText: {
    fontWeight: 'bold',
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
    width: '19%',
  },
  optionLabel: {
    fontSize: 10,
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
    top: '40%',
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
    borderColor: '#FFDCA9',
  },
  selectedDot: {
    backgroundColor: '#F9B64D',
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
