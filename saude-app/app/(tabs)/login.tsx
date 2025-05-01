import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <TextInput
        placeholder="Email"
        className="border w-full mb-2 p-2 rounded"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        className="border w-full mb-4 p-2 rounded"
      />
      <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded w-full">
        <Text className="text-white text-center font-bold">Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/register')} className="mt-4">
        <Text className="text-blue-500">AAAAAAAAAAAAAAAAAa</Text>
      </TouchableOpacity>
    </View>
  );
}
