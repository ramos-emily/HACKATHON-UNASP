import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ResultItemProps {
  imageSource: any;
  title: string;
  value: string;
  idealText?: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ imageSource, title, value, idealText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.whiteBox} />
      </View>

      <View style={styles.rightContainer}>
        {value.split('\n').map((line, index) => (
          <Text key={index} style={styles.value}>{line}</Text>
        ))}
        {idealText && <Text style={styles.idealText}>{idealText}</Text>}
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
    width: 120,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  rightContainer: {
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  value: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  idealText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ResultItem;
