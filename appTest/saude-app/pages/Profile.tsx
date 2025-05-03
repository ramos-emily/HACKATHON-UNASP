import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  Animated,
} from 'react-native';

interface ProfileProps {
  onBack: () => void;
  user: string;
  onSave: () => void;
}

export default function Profile({ onBack, user, onSave }: ProfileProps) {
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');
  const [name, setName] = useState(user);
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(scaleValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleNameChange = (newName: string) => {
    if (newName.length <= 50) {
      setName(newName);
    }
  };

  const handleEmailChange = (newEmail: string) => {
    if (newEmail.length <= 50) {
      setEmail(newEmail);
    }
  };

  const handlePhoneChange = (text: string) => {
    let cleanText = text.replace(/[^\d]/g, '');
    if (cleanText.length <= 11) {
      if (cleanText.length > 2 && cleanText.length <= 6) {
        cleanText = `(${cleanText.slice(0, 2)}) ${cleanText.slice(2)}`;
      } else if (cleanText.length > 6) {
        cleanText = `(${cleanText.slice(0, 2)}) ${cleanText.slice(2, 7)}-${cleanText.slice(7, 11)}`;
      }
      setPhone(cleanText);
    }
  };

  const handleBirthDateChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    if (cleanText.length <= 10) {
      let formattedDate = cleanText;
      if (formattedDate.length > 2) {
        formattedDate = `${formattedDate.slice(0, 2)}-${formattedDate.slice(2)}`;
      }
      if (formattedDate.length > 5) {
        formattedDate = `${formattedDate.slice(0, 5)}-${formattedDate.slice(5)}`;
      }
      setBirthDate(formattedDate);
    }
  };

  const handleSave = () => {
    alert('Informações salvas!');
    onSave(); // Redireciona para a Home
  };

  const resetName = () => {
    if (name === '') {
      setName(user);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SEU PERFIL</Text>
      </View>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarPlaceholder}>
          <TouchableOpacity style={styles.cameraButton} onPress={openModal}>
            <Text style={styles.cameraIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{name}</Text>
      </View>

      {/* Informações */}
      <View style={styles.infoContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
            onBlur={resetName}
          />
          <Text style={styles.editText}>Editar</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD-MM-AAAA"
            value={birthDate}
            onChangeText={handleBirthDateChange}
            maxLength={10}
          />
          <Text style={styles.editText}>Editar</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.sexButtons}>
            <TouchableOpacity
              style={[styles.sexButton, sex === 'M' && styles.sexButtonActive]}
              onPress={() => setSex('M')}
            >
              <Text style={[styles.sexText, sex === 'M' && styles.sexTextActive]}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sexButton, sex === 'F' && styles.sexButtonActive]}
              onPress={() => setSex('F')}
            >
              <Text style={[styles.sexText, sex === 'F' && styles.sexTextActive]}>F</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          <Text style={styles.editText}>Editar</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(XX) XXXXX-XXXX"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={15}
          />
          <Text style={styles.editText}>Editar</Text>
        </View>
      </View>

      <Modal transparent visible={modalVisible}>
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.zoomedAvatar, { transform: [{ scale: scaleValue }] }]} >
            <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
              <Image
                source={{ uri: 'https://via.placeholder.com/300' }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Botão de Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 75,
    backgroundColor: '#003878',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#DDD',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  cameraIcon: {
    fontSize: 14,
  },
  userName: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#002E6D',
  },
  infoContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#002E6D',
    marginBottom: 4,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F8F8',
    color: '#333',
  },
  editText: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
    marginLeft: 4,
  },
  sexButtons: {
    flexDirection: 'row',
    marginTop: 4,
  },
  sexButton: {
    borderColor: '#002E6D',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  sexButtonActive: {
    backgroundColor: '#002E6D',
  },
  sexText: {
    color: '#002E6D',
  },
  sexTextActive: {
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedAvatar: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#002E6D',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});