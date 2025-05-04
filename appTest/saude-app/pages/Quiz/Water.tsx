import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Footer from '../../components/Footer';

interface WaterProps {
  onBack: () => void;
  onNext?: () => void;
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
}

export default function WaterHeader({
  onBack,
  onNext,
  onProfile,
  onFavorites,
  onHome,
}: WaterProps) {
  
  const handleCupSelection = (option: string) => {
    console.log(`Selecionado: ${option}`);
  };

  const handleRemedySelection = (option: string) => {
    console.log(`Uso de água como remédio: ${option}`);
  };

  const handleUrineSelection = (option: string) => {
    console.log(`Cor da urina selecionada: ${option}`);
  };

  const cupOptions = [
    { label: 'Nenhum', image: require('../../assets/cups_none.png') },
    { label: '1 a 3', image: require('../../assets/cups_1_3.png') },
    { label: '4 a 6', image: require('../../assets/cups_4_6.png') },
    { label: '7', image: require('../../assets/cups_7.png') },
    { label: '8 ou mais', image: require('../../assets/cups_8_plus.png') },
  ];

  const remedyOptions = ['Nunca', 'Raramente', 'Algumas vezes', 'Muitas vezes', 'Sempre'];

  const urineOptions = [
    { label: 'Casos Médicos', image: require('../../assets/urine_0.png') },
    { label: 'Severamente Desidratado', image: require('../../assets/urine_1.png') },
    { label: 'Moderadamente Desidratado', image: require('../../assets/urine_2.png') },
    { label: 'Levemente Desidratado', image: require('../../assets/urine_3.png') },
    { label: 'Bem Hidratado', image: require('../../assets/urine_4.png') },
  ];

  return (
    <View>
      <View style={styles.headerContainer}>
        {/* Fundo azul claro atrás apenas do ícone */}
        <View style={styles.iconBackground}>
          <Image source={require('../../assets/header-icon.png')} style={styles.icon} />
        </View>

        {/* Imagem única do botão "ÁGUA" com retângulo */}
        <Image source={require('../../assets/agua-botao-unico.png')} style={styles.singleButtonImage} />

        {/* PRIMEIRA PERGUNTA */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Quantos copos (250ml) de água você bebe diariamente?
          </Text>

          <View style={styles.cupsRow}>
            {cupOptions.map((item, index) => (
              <View key={index} style={styles.cupIllustration}>
                <Image source={item.image} style={styles.cupImage} />
                <Text style={styles.optionLabel}>
                  {item.label} {item.label !== 'Nenhum' && 'copos'}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.dotsWrapper}>
            <Image source={require('../../assets/Group 48.png')} style={styles.dotsLine} />
            <View style={styles.touchableDotsOverlay}>
              {cupOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.overlayDot, { left: `${index * 24.5}%` }]}
                  onPress={() => handleCupSelection(item.label)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* SEGUNDA PERGUNTA */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Você utiliza a água como remédio para tratamentos caseiros quando necessário? (Por exemplo, compressas quentes e frias, aplicação de gelo, inalação, escalda pés e banhos em geral).
          </Text>

          <View style={styles.cupsRow}>
            {remedyOptions.map((label, index) => (
              <View key={index} style={styles.cupIllustration}>
                <Text style={styles.optionLabel}>{label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.dotsWrapper}>
            <Image source={require('../../assets/Group 48.png')} style={styles.dotsLine} />
            <View style={styles.touchableDotsOverlay}>
              {remedyOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.overlayDot, { left: `${index * 24.5}%` }]}
                  onPress={() => handleRemedySelection(item)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* TERCEIRA PERGUNTA */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Qual a cor da sua urina?</Text>

          <View style={styles.cupsRow}>
            {urineOptions.map((item, index) => (
              <View key={index} style={styles.cupIllustration}>
                <Image source={item.image} style={styles.cupImage} />
                <Text style={styles.optionLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.dotsWrapper}>
            <Image source={require('../../assets/Group 48.png')} style={styles.dotsLine} />
            <View style={styles.touchableDotsOverlay}>
              {urineOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.overlayDot, { left: `${index * 24.5}%` }]}
                  onPress={() => handleUrineSelection(item.label)}
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
      </View>
      {/* Rodapé */}
      <Footer onProfile={onProfile} onHome={onHome} onFavorites={onFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: -8,
  },
  iconBackground: {
    width: '100%',
    backgroundColor: '#D3F0FF',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: -10,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  singleButtonImage: {
    width: 490,
    height: 55,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 0,
  },
  questionContainer: {
    backgroundColor: '#D3F0FF',
    marginTop: 20,
    borderRadius: 16,
    padding: 18,
    width: '90%',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  cupsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  cupIllustration: {
    alignItems: 'center',
    width: 60,
  },
  cupImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  optionLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  dotsWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },
  dotsLine: {
    width: '100%',
    height: 20,
    resizeMode: 'contain',
  },
  touchableDotsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  overlayDot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
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
