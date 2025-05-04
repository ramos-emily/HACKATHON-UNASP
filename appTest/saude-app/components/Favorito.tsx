import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ResultItemProps {
  imageSource: any;
  title: string;
  value: string;
  idealText?: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ 
  imageSource, 
  title, 
  value, 
  idealText
}) => {
  return (
    <View style={styles.container}>
      {/* Ícone à esquerda */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>

      {/* Título e retângulo branco no meio */}
      <View style={styles.middleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.whiteBox}>
          <Text style={styles.boxValue}>{value}</Text>
        </View>
      </View>

      {/* Valor ideal à direita */}
      <View style={styles.rightContainer}>
        <Text style={styles.idealText}>{idealText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  whiteBox: {
    width: 140,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  rightContainer: {
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  idealText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
});

export default ResultItem;