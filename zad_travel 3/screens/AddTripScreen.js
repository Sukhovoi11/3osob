import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet,
  Alert
} from 'react-native';
import { TripsContext } from '../context/TripsContext';

export default function AddTripScreen({ navigation }) {
  const { addTrip } = useContext(TripsContext);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [budget, setBudget] = useState(''); // новое состояние для бюджета
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!destination || !date) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    // Можно проверить, если бюджет есть, чтобы он был числом
    if (budget && isNaN(parseFloat(budget))) {
      Alert.alert('Błąd', 'Budżet musi być liczbą');
      return;
    }

    setLoading(true);
    try {
      await addTrip({
        destination,
        date,
        note,
        budget: budget ? parseFloat(budget) : 0, // передаем число, либо 0 если пусто
      });
      Alert.alert('Sukces', 'Podróż została dodana');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Błąd', e.message || 'Nie udało się dodać podróży');
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dodać podróż</Text>

      <TextInput
        style={styles.input}
        placeholder="Miejsce docelowe"
        value={destination}
        onChangeText={setDestination}
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        style={styles.input}
        placeholder="Data (RRRR-MM-DD)"
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Notatka (opcjonalnie)"
        value={note}
        onChangeText={setNote}
        multiline={true}
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        style={styles.input}
        placeholder="Budżet (cyfry)"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
        placeholderTextColor="#9ca3af"
      />

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleAdd} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Dodawanie...' : 'Dodać'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 20, color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    color: '#111827'
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 18,
  }
});
