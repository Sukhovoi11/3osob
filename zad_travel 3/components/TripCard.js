
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TripCard({ trip, onPress, onDelete }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View>
        <Text style={styles.name}>{trip.destination}</Text>
        <Text style={styles.date}>{trip.date}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={24} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: '700', color: '#111827' },
  date: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  buttons: { justifyContent: 'center' },
});
