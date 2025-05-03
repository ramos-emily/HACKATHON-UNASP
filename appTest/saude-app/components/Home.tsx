import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

interface RemedioCardProps {
  imagem: ImageSourcePropType;
  texto: string;
}

export default function RemedioCard({ imagem, texto }: RemedioCardProps) {
  return (
    <View style={styles.card}>
      <Image source={imagem} style={styles.imagem} resizeMode="contain" />
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  imagem: {
    width: '90%',
    aspectRatio: 1.5, 
    alignSelf: 'center',
  },
  texto: {
    padding: 10,
    fontSize: 22,
    color: '#002233',
    textAlign: 'center',
    lineHeight: 22,
  },
});
