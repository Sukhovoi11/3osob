import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  Alert
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signInUser } = useContext(AuthContext);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola');
      return;
    }
    setLoading(true);
    try {
      await signInUser(email.trim(), password);
    } catch (e) {
      Alert.alert('Błąd logowania', e.message || 'Nie udało się zalogować');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Logowanie</Text>

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

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{loading ? 'Logowanie...' : 'Zaloguj się'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Nie masz konta? Zarejestruj się</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 30, flex: 1, justifyContent: 'center' },
  title: { fontSize: 36, fontWeight: '800', color: '#111', marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    marginBottom: 20,
    color: '#111',
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  linkText: {
    color: '#2563eb',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
