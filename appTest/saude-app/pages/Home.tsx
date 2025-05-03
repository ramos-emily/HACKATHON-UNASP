import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RemedioCard from '../components/Home';
import Footer from '../components/Footer';

interface HomeProps {
  onProfile: () => void;
  onHome: () => void;
  onFavorites: () => void;
  onNavigation: (destination: string) => void;
}

export default function TelaHome({ onProfile, onHome, onFavorites, onNavigation }: HomeProps) {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Homepage</Text>
        </View>

        {/* Imagem com botão sobreposto */}
        <ImageBackground
          source={require('../assets/LogoHome.png')}
          style={styles.logoContainer}
          resizeMode="contain"
        >
          <TouchableOpacity style={styles.botaoAgua} onPress={() => onNavigation('Water')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAr} onPress={() => onNavigation('CleanAir')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoNutri} onPress={() => onNavigation('Nutrition')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSol} onPress={() => onNavigation('Sun')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoTemp} onPress={() => onNavigation('Temperance')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoExe} onPress={() => onNavigation('Exercise')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoDes} onPress={() => onNavigation('Rest')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCf} onPress={() => onNavigation('Trust')}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoPlay} onPress={() => onNavigation('Trust')}>
          </TouchableOpacity>
        </ImageBackground>

        <Image source={require('../assets/Q8RM.png')} style={styles.q8rm} resizeMode="contain" />

        <Text style={styles.descricao}>
          O Questionário dos 8 Remédios Naturais não é apenas um programa; é um estilo de vida. Quando os 8 componentes estão devidamente alinhados, combinados e aplicados de forma consistente, demonstram repetidamente seu poder não apenas para melhorar condições de saúde, mas para transformar vidas de maneira positiva e duradoura.
          {'\n\n'}
          Descubra a seguir, de maneira mais detalhada, como cada um desses elementos pode fazer a diferença na sua vida.
        </Text>

        {/* Cards dos Remédios Naturais */}
        <RemedioCard
          imagem={require('../assets/waterHome.png')}
          texto="Como o corpo é composto por 70% de água, manter-se bem hidratado e saber o que e quando beber são essenciais para a saúde. A hidroterapia (água aplicada externamente ao corpo), seguida de massagem, melhora a circulação e o sistema imunológico de maneiras surpreendentes."
        />
        <RemedioCard
          imagem={require('../assets/arHome.png')}
          texto="O ar é o recurso mais essencial do corpo — mais vital que a comida ou a água. Em cidades poluídas, respirar ar puro é um verdadeiro remédio: melhora a oxigenação do cérebro, que consome 20% do oxigênio que respiramos, e ajuda a reduzir o cortisol, diminuindo o estresse e a ansiedade."
        />
        <RemedioCard
          imagem={require('../assets/nutricaoHome.png')}
          texto="O intestino afeta diretamente o funcionamento do nosso cérebro — por isso, dizemos que somos o que comemos. Uma alimentação desequilibrada pode contribuir para problemas como ansiedade, depressão e dificuldades cognitivas, enquanto uma dieta balanceada, rica em frutas, verduras, legumes, grãos integrais, sementes e alimentos naturais, favorece o bem-estar mental e emocional. Cuidar da alimentação é essencial não só para o corpo, mas também para a mente."
        />
        <RemedioCard
          imagem={require('../assets/luzHome.png')}
          texto="A exposição ao sol estimula a produção de vitamina D, essencial para a imunidade, saúde dos ossos e regulação do humor. Também melhora o sono e os níveis de energia ao equilibrar o relógio biológico. Então, que tal aproveitar alguns minutinhos de sol perto do meio-dia e cuidar da sua saúde de forma natural e revigorante?"
        />
        <RemedioCard
          imagem={require('../assets/temperancaHome.png')}
          texto="Usar coisas boas com moderação e evitar o que faz mal é uma escolha sábia, embora nem sempre fácil. A temperança é um presente de Deus, um fruto do Espírito (Gálatas 5:22, 23), que protege contra vícios, melhora a saúde mental, fortalece os relacionamentos e equilibra o uso de telas. Viver com moderação é viver com mais liberdade, paz e qualidade de vida."
        />
        <RemedioCard
          imagem={require('../assets/exercicioHome.png')}
          texto="A ação é uma lei da vida. O tônus e a força muscular se perdem sem esforço, mas o exercício melhora a saúde do corpo, da mente e do espírito, multiplicando a vitalidade e o bem-estar. A terapia por meio da atividade física inclui exercícios ao ar livre, avaliações em esteira e alongamentos. Em Loma Linda, idosos com mais de 90 anos vivem com vitalidade através dos 8 Remédios Naturais, mostrando que nossos hábitos atuais moldam uma velhice saudável e cheia de energia."
        />
        <RemedioCard
          imagem={require('../assets/descansoHome.png')}
          texto='"Deus ajuda quem cedo madruga" não é apenas um ditado, mas um princípio vital, pois a restauração requer descanso, e o sono permite que o corpo se renove. Durante o sono, o corpo se recupera, fortalece o sistema imunológico e o cérebro processa informações, consolidando memórias e regulando as emoções.'
        />
        <RemedioCard
          imagem={require('../assets/confiancaHome.png')}
          texto='Estudos mostram que a prática espiritual fortalece o sistema imunológico, melhora a saúde cardiovascular e promove longevidade, além de trazer propósito e reduzir a ansiedade. "Confia no Senhor de todo o teu coração" (Provérbios 3:5-6). Deus convida você a descansar Nele, entregando suas preocupações e renovando corpo e mente com Sua paz.'
        />
      </ScrollView>

      <Footer onProfile={onProfile} onHome={onHome} onFavorites={onFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#d7f0ff',
  },
  header: {
    width: '100%',
    height: 75,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007ED5',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    width: '100%',
    aspectRatio: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoPlay: {
    position: 'absolute',
    top: '45%',
    right: '43%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoAgua: {
    position: 'absolute',
    top: '25%',
    right: '28%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoAr: {
    position: 'absolute',
    top: '45%',
    right: '25%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoNutri: {
    position: 'absolute',
    top: '65%',
    right: '30%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoSol: {
    position: 'absolute',
    top: '73%',
    right: '45%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoTemp: {
    position: 'absolute',
    top: '65%',
    right: '58%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoExe: {
    position: 'absolute',
    top: '43%',
    right: '62%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoDes: {
    position: 'absolute',
    top: '22%',
    right: '58%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  botaoCf: {
    position: 'absolute',
    top: '15%',
    right: '45%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  q8rm: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  descricao: {
    fontSize: 22,
    textAlign: 'center',
    color: '#002233',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
