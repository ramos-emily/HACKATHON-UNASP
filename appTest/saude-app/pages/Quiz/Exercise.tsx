import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Footer from '../../components/Footer';

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

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
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
            <Text style={styles.label}>Seu peso em Kg</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.peso}
              onChangeText={(text) => handleChange('peso', text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Sua altura em cm</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.altura}
              onChangeText={(text) => handleChange('altura', text)}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Circunferência da cintura em cm</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.cintura}
              onChangeText={(text) => handleChange('cintura', text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Circunferência do quadril em cm</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.quadril}
              onChangeText={(text) => handleChange('quadril', text)}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Frequência respiratória</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.respiratoria}
              onChangeText={(text) => handleChange('respiratoria', text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Frequência cardíaca de repouso</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={form.cardiaca}
              onChangeText={(text) => handleChange('cardiaca', text)}
            />
          </View>
        </View>

        <View style={[styles.inputBox, { marginTop: 10 }]}>
          <Text style={styles.label}>Circunferência do pulso em cm</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.pulso}
            onChangeText={(text) => handleChange('pulso', text)}
          />
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


