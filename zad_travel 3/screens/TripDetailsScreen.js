import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Platform, TextInput, Modal } from 'react-native';
import { TripsContext } from '../context/TripsContext';

export default function TripDetailsScreen({ route, navigation }) {
  const { trip } = route.params;
  const { updateTrip, toggleCompleted } = useContext(TripsContext);

  const [currentTrip, setCurrentTrip] = useState(trip);
  const [budget, setBudget] = useState(trip.budget ?? '');

  // Для кастомного модального окна (для Android)
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget.toString());

  const handleToggleCompleted = () => {
    toggleCompleted(currentTrip);
    setCurrentTrip(prev => ({ ...prev, completed: !prev.completed }));
  };

  const handleBudgetChangeIOS = () => {
    Alert.prompt(
      'Zmień budżet',
      'Wprowadź nowy budżet',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Zapisz',
          onPress: (val) => {
            const num = parseFloat(val);
            if (!isNaN(num)) {
              setBudget(num.toString());
              setCurrentTrip(prev => ({ ...prev, budget: num }));
              updateTrip(currentTrip.id, { budget: num });
            } else {
              Alert.alert('Błąd', 'Wprowadź poprawną liczbę');
            }
          },
        },
      ],
      'plain-text',
      budget.toString()
    );
  };

  const handleBudgetChange = () => {
    if (Platform.OS === 'ios') {
      handleBudgetChangeIOS();
    } else {
      // Для Android показываем модальное окно
      setBudgetInput(budget.toString());
      setModalVisible(true);
    }
  };

  const saveBudgetAndroid = () => {
    const num = parseFloat(budgetInput);
    if (!isNaN(num)) {
      setBudget(num.toString());
      setCurrentTrip(prev => ({ ...prev, budget: num }));
      updateTrip(currentTrip.id, { budget: num });
      setModalVisible(false);
    } else {
      Alert.alert('Błąd', 'Wprowadź poprawną liczbę');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{currentTrip.destination}</Text>
      <Text style={styles.date}>{currentTrip.date}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notatka:</Text>
        <Text>{currentTrip.note || '-'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budżet:</Text>
        <TouchableOpacity onPress={handleBudgetChange}>
          <Text style={styles.budget}>${budget || '0'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status:</Text>
        <Text>{currentTrip.completed ? 'Zakończone' : 'Aktywne'}</Text>
        <TouchableOpacity style={styles.button} onPress={handleToggleCompleted}>
          <Text style={styles.buttonText}>
            {currentTrip.completed ? 'Oznacz jako aktywne' : 'Oznacz jako zakończone'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6b7280', marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Wstecz</Text>
      </TouchableOpacity>

      {/* Модальное окно для Android */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={styles.sectionTitle}>Wprowadź budżet</Text>
            <TextInput
              style={modalStyles.input}
              keyboardType="numeric"
              value={budgetInput}
              onChangeText={setBudgetInput}
              placeholder="Wprowadź kwotę"
              autoFocus
            />
            <View style={modalStyles.buttonsRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#6b7280', flex: 1, marginRight: 5 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Anuluj</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1, marginLeft: 5 }]}
                onPress={saveBudgetAndroid}
              >
                <Text style={styles.buttonText}>Zapisz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    marginBottom: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 8, color: '#111827' },
  date: { fontSize: 18, color: '#6b7280', marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: '600', fontSize: 18, marginBottom: 8, color: '#374151' },
  budget: { fontSize: 20, fontWeight: '700', color: '#2563eb' },
  button: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
