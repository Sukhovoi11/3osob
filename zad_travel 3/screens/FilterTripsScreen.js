
import React, { useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';
import { TripsContext } from '../context/TripsContext';

export default function FilterTripsScreen({ navigation }) {
  const {
    filterDestination, setFilterDestination,
    filterDate, setFilterDate,
    filterNotes, setFilterNotes
  } = useContext(TripsContext);

  const handleApply = () => {
    navigation.goBack(); // контекст уже обновляет filteredTrips
  };

  const clearFilters = () => {
    setFilterDestination('');
    setFilterDate('');
    setFilterNotes('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Фильтр поездок</Text>

      <TextInput
        style={styles.input}
        placeholder="Miejsce docelowe"
        value={filterDestination}
        onChangeText={setFilterDestination}
        placeholderTextColor="#9ca3af"
      />

      <TextInput
        style={styles.input}
        placeholder="Data (RRRR-MM-DD)"
        value={filterDate}
        onChangeText={setFilterDate}
        placeholderTextColor="#9ca3af"
      />

      <TextInput
        style={styles.input}
        placeholder="Notatka"
        value={filterNotes}
        onChangeText={setFilterNotes}
        placeholderTextColor="#9ca3af"
      />

      <TouchableOpacity style={styles.button} onPress={handleApply}>
        <Text style={styles.buttonText}>Применить фильтр</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        onPress={clearFilters}
      >
        <Text style={[styles.buttonText, styles.clearText]}>Очистить фильтр</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 20, color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    marginBottom: 15,
    backgroundColor: '#fafafa',
    color: '#111827'
  },
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#2563eb',
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: '#f3f4f6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18
  },
  clearText: {
    color: '#2563eb',
  }
});
