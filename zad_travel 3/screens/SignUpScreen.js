import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform,
  Alert
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles } from './SignInScreen';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerUser } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła się nie zgadzają');
      return;
    }
    setLoading(true);
    try {
      await registerUser(email.trim(), password);
      Alert.alert('Sukces', 'Rejestracja zakończona pomyślnie!');
      navigation.replace('SignIn');
    } catch (e) {
      Alert.alert('Błąd rejestracji', e.message || 'Nie udało się zarejestrować');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Rejestracja</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9ca3af"
        />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#9ca3af"
        />
        <TextInput
          style={styles.input}
          placeholder="Potwierdź hasło"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{loading ? 'Rejestracja...' : 'Zarejestruj się'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}>Masz już konto? Zaloguj się</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
