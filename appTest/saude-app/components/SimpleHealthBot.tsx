import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface HealthBotProps {
  userResults: {
    stressLevel?: number;
    sleepQuality?: number;
    nutritionScore?: number;
    exerciseScore?: number;
    waterIntake?: number;
    [key: string]: any;
  };
  onClose: () => void;
}

const SimpleHealthBot: React.FC<HealthBotProps> = ({ userResults, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou seu assistente de saúde. Toque em uma pergunta para começar:',
      fromUser: false,
    },
  ]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const questions = [
    'Como estou?',
    'Como posso melhorar?',
    'Oi!',
  ];

  const handleQuestionClick = (question: string) => {
    const userMessage = { id: Date.now(), text: question, fromUser: true };
    const botResponse = generateResponse(question);
    const botMessage = { id: Date.now() + 1, text: botResponse, fromUser: false };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const generateResponse = (question: string) => {
    const lower = question.toLowerCase();

    if (lower.includes('como estou') || lower.includes('resultados')) {
      return analyzeHealthStatus();
    }
    if (lower.includes('melhorar') || lower.includes('dicas')) {
      return generateImprovementTips();
    }
    if (lower.includes('oi') || lower.includes('olá')) {
      return 'Olá! Como posso te ajudar com sua saúde hoje?';
    }

    return 'Toque em uma pergunta abaixo para continuar.';
  };

  const analyzeHealthStatus = () => {
    let res = 'Seus resultados:\n\n';
    if (userResults.stressLevel !== undefined)
      res += `Estresse: ${userResults.stressLevel}/10\n`;
    if (userResults.sleepQuality !== undefined)
      res += `Sono: ${userResults.sleepQuality}/10\n`;
    if (userResults.nutritionScore !== undefined)
      res += `Nutrição: ${userResults.nutritionScore} pts\n`;
    if (userResults.exerciseScore !== undefined)
      res += `Exercício: ${userResults.exerciseScore} pts\n`;
    if (userResults.waterIntake !== undefined)
      res += `Água: ${userResults.waterIntake}L/dia\n`;
    return res;
  };

  const generateImprovementTips = () => {
    const tips = [];

    if (userResults.stressLevel && userResults.stressLevel > 5)
      tips.push('- Faça respiração profunda todos os dias.');
    if (userResults.sleepQuality && userResults.sleepQuality < 6)
      tips.push('- Tente dormir e acordar nos mesmos horários.');
    if (userResults.nutritionScore && userResults.nutritionScore < 30)
      tips.push('- Coma mais frutas e vegetais.');
    if (userResults.exerciseScore && userResults.exerciseScore < 20)
      tips.push('- Caminhe 30 minutos por dia.');
    if (userResults.waterIntake && userResults.waterIntake < 2)
      tips.push('- Beba pelo menos 2L de água por dia.');

    if (tips.length === 0) return 'Você está indo muito bem! Continue assim.';
    return 'Dicas para melhorar:\n\n' + tips.join('\n');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
      <View style={styles.chatContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Assistente de Saúde</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.fromUser ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
        />

        <View style={styles.buttonContainer}>
          {questions.map((q) => (
            <TouchableOpacity key={q} style={styles.questionButton} onPress={() => handleQuestionClick(q)}>
              <Text style={styles.questionText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  chatContainer: {
    height: '60%',
    backgroundColor: '#d7f0ff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#007ED5',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003878',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003878',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  messageText: {
    fontSize: 16,
    color: '#003878',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  questionButton: {
    backgroundColor: '#007ED5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  questionText: {
    color: 'white',
    fontSize: 14,
  },
});

export default SimpleHealthBot;
