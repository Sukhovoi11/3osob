
import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function AboutScreen({ navigation }) {
  const { signOutUser } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="airplane" size={80} color="#2563eb" />
        <Text style={styles.title}>Planer podróży</Text>
        <Text style={styles.version}>Wersja 1.0.0</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Aplikacja pomaga organizować podróże, śledzić miejsca do odwiedzenia, zarządzać zadaniami i notatkami oraz kontrolować budżet.
        </Text>

        {[
          'Tworzenie i zarządzanie podróżami',
          'Dodawanie miejsc na mapie',
          'Zarządzanie zadaniami i notatkami',
          'Kontrola budżetu',
          'Powiadomienia push',
          'Synchronizacja danych',
        ].map((feature, i) => (
          <View style={styles.feature} key={i}>
            <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={styles.buttonText}>Wstecz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={signOutUser}>
            <Ionicons name="log-out" size={20} color="#fff" />
            <Text style={styles.buttonText}>Wyloguj się</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { alignItems: 'center', padding: 30, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  title: { fontSize: 28, fontWeight: '800', color: '#2563eb', marginTop: 10 },
  version: { fontSize: 14, color: '#6b7280', marginTop: 5 },
  content: { padding: 20 },
  description: { fontSize: 16, color: '#374151', marginBottom: 20, lineHeight: 24 },
  feature: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  featureText: { fontSize: 16, color: '#374151', marginLeft: 10 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 },
  button: { flex: 1, backgroundColor: '#2563eb', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10, marginHorizontal: 5 },
  signOutButton: { backgroundColor: '#dc2626' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },
});
