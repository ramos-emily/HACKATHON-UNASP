// app/screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <TextInput placeholder="Email" className="border w-full mb-2 p-2 rounded" />
      <TextInput placeholder="Senha" secureTextEntry className="border w-full mb-4 p-2 rounded" />
      <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded w-full">
        <Text className="text-white text-center font-bold">Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} className="mt-4">
        <Text className="text-blue-500">Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
