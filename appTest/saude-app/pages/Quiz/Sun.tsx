import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Footer from '../../components/Footer';

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

  const options = ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'];

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/sun_icon.png')} style={styles.icon} />
        </View>
        <Image source={require('../../assets/sun_banner.png')} style={styles.banner} />

        {/* Pergunta 1 */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Com que frequência você se expõe ao sol por pelo menos 15 minutos, sem o uso de protetor solar?
          </Text>

          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => setSelectedOption1(index)}>
                <Text style={styles.optionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {options.map((_, index) => (
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
            Em sua casa, as janelas e persianas são abertas diariamente para que entrem sol e luz natural?
          </Text>

          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => setSelectedOption2(index)}>
                <Text style={styles.optionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <View style={styles.lineContainer}>
              {options.map((_, index) => (
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
