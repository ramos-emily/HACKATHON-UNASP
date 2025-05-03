// Favorites.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import ResultItem from '../components/Favorito';
import Footer from '../components/Footer';

interface FavoritesProps {
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function Favorites({ onProfile, onHome, onFavorites }: FavoritesProps) {
  return (
    <View>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/resultados_header.png')} style={styles.icon} />
      </View>

      {/* Total */}
      <View style={styles.totalContainer}>
        <View style={styles.resultadosBox}>
          <Text style={styles.headerTitle}>RESULTADOS</Text>
        </View>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <View style={styles.totalBox}>
        <ResultItem
        imageSource={require('../assets/LogoFavorites.png')}
        title=""
        value="/150"

      />
        </View>
      </View>

      <View style={styles.dividerLine} />

      <Text style={styles.sectionTitle}>ANÁLISES CORPORAIS</Text>

      {/* Itens */}
      <ResultItem
        imageSource={require('../assets/pressao.png')}
        title="Pressão Arterial"
        value="12/8"
      />

      <ResultItem
        imageSource={require('../assets/imc.png')}
        title="IMC"
        value="12.5 a 24.9"
        idealText=""
      />

      <ResultItem
        imageSource={require('../assets/peso.png')}
        title="PCI"
        value="Variável"
      />

      <ResultItem
        imageSource={require('../assets/cintura.png')}
        title="RCQ"
        value="M = 0.85"
      />

      <ResultItem
        imageSource={require('../assets/arcabouco.png')}
        title="Arcabouço Corporal"
        value="Variável"
      />

      <View style={styles.dividerLine} />
      <Text style={styles.sectionTitle}>POR CATEGORIA</Text>

      <ResultItem
        imageSource={require('../assets/iconWater.png')}
        title=""
        value="15"
      />
      <ResultItem
        imageSource={require('../assets/iconAr.png')}
        title=""
        value="10"
      />
      <ResultItem
        imageSource={require('../assets/iconMaca.png')}
        title=""
        value="15"
      />
      <ResultItem
        imageSource={require('../assets/iconSol.png')}
        title=""
        value="10"
      />
      <ResultItem
        imageSource={require('../assets/iconJustica.png')}
        title=""
        value="40"
      />
      <ResultItem
        imageSource={require('../assets/iconCoracao.png')}
        title=""
        value="15"
      />
      <ResultItem
        imageSource={require('../assets/iconLua.png')}
        title=""
        value="20"
      />
      <ResultItem
        imageSource={require('../assets/iconCruz.png')}
        title=""
        value="25"
      />
    </ScrollView>
    <Footer onProfile={onProfile} onHome={onHome} onFavorites={onFavorites} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d7f0ff',
    alignItems: 'stretch',
  },
  header: {
    width: '100%',
    height: 75,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  resultadosBox: {
    backgroundColor: '#007ED5',
    paddingHorizontal: 70,
    paddingVertical: 10,
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  totalLabel: {
    fontSize: 20,
    color: '#003878',
    marginBottom: 16,
    fontWeight: '600',
  },
  totalContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#d7f0ff',
  },
  
  totalBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  totalText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  totalMax: {
    fontSize: 18,
    marginLeft: 4,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003878',
    marginBottom: 12,
    textAlign: 'center',
  },
  dividerLine: {
    height: 15,
    borderRadius: 10,
    backgroundColor: '#007ED5',
    width: '97%',
    alignSelf: 'center',
    marginVertical: 20,
  },
});