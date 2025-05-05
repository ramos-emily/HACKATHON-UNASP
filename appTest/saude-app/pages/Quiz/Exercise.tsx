import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import Footer from '../../components/Footer';
import { saveQuizResult } from '../../services/mockStorage';

interface ExeProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function DadosCorporais({ onBack, onNext, onProfile, onFavorites, onHome }: ExeProps) {
  const [form, setForm] = useState({
    peso: '',
    altura: '',
    cintura: '',
    quadril: '',
    respiratoria: '',
    cardiaca: '',
    pulso: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const calculateBodyAnalysis = () => {
    const analysis: any = {};
    
    // Cálculo do IMC e classificação
    if (form.peso && form.altura) {
      const alturaM = parseInt(form.altura) / 100;
      const imcValue = parseInt(form.peso) / (alturaM * alturaM);
      analysis.imc = imcValue.toFixed(1);
      
      if (imcValue < 18.5) analysis.imcClassification = 'Abaixo do peso';
      else if (imcValue < 25) analysis.imcClassification = 'Normal';
      else if (imcValue < 30) analysis.imcClassification = 'Sobrepeso';
      else if (imcValue < 35) analysis.imcClassification = 'Obesidade Grau I';
      else if (imcValue < 40) analysis.imcClassification = 'Obesidade Grau II';
      else analysis.imcClassification = 'Obesidade Grau III';
    }

    // Cálculo RCQ (Relação Cintura-Quadril)
    if (form.cintura && form.quadril) {
      const rcqValue = parseInt(form.cintura) / parseInt(form.quadril);
      analysis.rcq = rcqValue.toFixed(2);
      analysis.rcqClassification = rcqValue > 0.85 ? 'Risco aumentado' : 'Normal';
    }

    // Classificação da pressão arterial (simplificada)
    if (form.cardiaca) {
      const fc = parseInt(form.cardiaca);
      if (fc < 60) analysis.pressureClassification = 'Bradicardia';
      else if (fc <= 100) analysis.pressureClassification = 'Normal';
      else analysis.pressureClassification = 'Taquicardia';
    }

    // Classificação da frequência respiratória
    if (form.respiratoria) {
      const fr = parseInt(form.respiratoria);
      if (fr < 12) analysis.breathClassification = 'Baixa';
      else if (fr <= 20) analysis.breathClassification = 'Normal';
      else analysis.breathClassification = 'Alta';
    }

    return analysis;
  };

  const calculateScore = () => {
    const analysis = calculateBodyAnalysis();
    let score = 0;
    
    // Pontuação baseada no IMC
    if (analysis.imcClassification) {
      if (analysis.imcClassification === 'Normal') score += 30;
      else if (analysis.imcClassification === 'Sobrepeso') score += 20;
      else score += 10;
    }

    // Pontuação baseada no RCQ
    if (analysis.rcqClassification) {
      score += analysis.rcqClassification === 'Normal' ? 20 : 10;
    }

    // Pontuação baseada na frequência cardíaca
    if (analysis.pressureClassification) {
      score += analysis.pressureClassification === 'Normal' ? 20 : 10;
    }

    return score;
  };

  const handleNext = () => {
    if (!form.peso || !form.altura || !form.cintura || !form.quadril) {
      Alert.alert('Atenção', 'Por favor, preencha pelo menos os campos obrigatórios (peso, altura, cintura e quadril)');
      return;
    }

    const bodyAnalysis = calculateBodyAnalysis();
    
    const result = {
      answers: {
        ...form,
        ...bodyAnalysis
      },
      score: calculateScore(),
      bodyAnalysis // Envia os dados de análise separadamente
    };

    saveQuizResult('exercise', result);
    
    if (onNext) onNext();
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image source={require('../../assets/exercise_icon.png')} style={styles.icon} />
        </View>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>EXERCÍCIO FÍSICO</Text>
        </View>

        {/* Campos de entrada */}
        <View style={styles.inputGrid}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Seu peso em Kg*</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.peso}
              onChangeText={(text) => handleChange('peso', text.replace(/[^0-9]/g, ''))}
              placeholder="Ex: 68"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Sua altura em cm*</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.altura}
              onChangeText={(text) => handleChange('altura', text.replace(/[^0-9]/g, ''))}
              placeholder="Ex: 170"
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Circunferência da cintura em cm*</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.cintura}
              onChangeText={(text) => handleChange('cintura', text.replace(/[^0-9]/g, ''))}
              placeholder="Ex: 80"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Circunferência do quadril em cm*</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.quadril}
              onChangeText={(text) => handleChange('quadril', text.replace(/[^0-9]/g, ''))}
              placeholder="Ex: 95"
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Frequência respiratória (rpm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.respiratoria}
              onChangeText={(text) => handleChange('respiratoria', text.replace(/[^0-9]/g, ''))}
              placeholder="Ex: 16"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Frequência cardíaca (bpm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.cardiaca}
              onChangeText={(text) => handleChange('cardiaca', text.replace(/[^0-9]/g, ''))}
              placeholder="Ex: 72"
            />
          </View>
        </View>

        <View style={[styles.inputBox, { marginTop: 10, width: '90%' }]}>
          <Text style={styles.label}>Circunferência do pulso em cm</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.pulso}
            onChangeText={(text) => handleChange('pulso', text.replace(/[^0-9]/g, ''))}
            placeholder="Ex: 16"
          />
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
    alignItems: 'center',
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#D3F0FF',
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
  banner: {
    backgroundColor: '#F27057',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
  },
  inputBox: {
    backgroundColor: '#FFDCD3',
    borderRadius: 12,
    padding: 10,
    width: '47%',
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    textAlign: 'center',
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