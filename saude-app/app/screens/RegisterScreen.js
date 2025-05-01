// app/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="flex-1 justify-center items-center px-6 py-10">
        <Text className="text-3xl font-bold text-white-600 mb-8">Criar Conta</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <TextInput
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 mb-6"
        />

        <TouchableOpacity className="bg-blue-600 w-full py-3 rounded-lg mb-4">
          <Text className="text-white text-center font-semibold text-base">Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/')} className="mt-2">
          <Text className="text-blue-500">Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
