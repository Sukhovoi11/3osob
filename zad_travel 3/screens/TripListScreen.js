
import React, { useContext } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  Alert
} from 'react-native';
import { TripsContext } from '../context/TripsContext';
import TripCard from '../components/TripCard';
import { Ionicons } from '@expo/vector-icons';

export default function TripListScreen({ navigation }) {
  const { filteredTrips, deleteTrip } = useContext(TripsContext);

  const handleDelete = (id) => {
    Alert.alert(
      'Usuń podróż',
      'Czy na pewno chcesz usunąć tę podróż?',
      [
        { text: 'Anuluj', style: 'cancel' },
        { text: 'Usuń', style: 'destructive', onPress: () => deleteTrip(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TripCard
      trip={item}
      onPress={() => navigation.navigate('TripDetails', { trip: item })}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {filteredTrips.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="airplane" size={80} color="#9ca3af" />
          <Text style={styles.emptyText}>Podróży jeszcze nie ma</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTrips}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        />
      )}

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => navigation.navigate('FilterTrips')}
      >
        <Ionicons name="filter" size={20} color="#fff" />
        <Text style={styles.filterButtonText}>Filtr</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTrip')}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Dodać podróż</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#6b7280', marginTop: 20 },

  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },

  filterButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 4,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
