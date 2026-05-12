
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceCard({ place }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{place.name}</Text>
      {place.description ? <Text style={styles.description}>{place.description}</Text> : null}
      <Text style={styles.coords}>
        📍 {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  name: { fontSize: 16, fontWeight: '700', color: '#111827' },
  description: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  coords: { fontSize: 12, color: '#9ca3af', marginTop: 6 },
});
