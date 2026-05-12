
import React, { useState } from 'react';
import {
  View, TextInput, Button, ActivityIndicator,
  Keyboard, Alert, StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBObjLCJHs4koxphtaHmthPfhf7X-06nPE';

export default function HotelsScreen() {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoords = async () => {
    if (!address.trim()) {
      Alert.alert('Błąd', 'Wprowadź adres lub miasto');
      return;
    }
    setLoading(true);
    setHotels([]);
    Keyboard.dismiss();
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      if(data.status !== 'OK'){
        Alert.alert('Błąd', 'Lokalizacja nie znaleziona');
        setLoading(false);
        return;
      }
      const loc = data.results[0].geometry.location;
      setCoords({latitude: loc.lat, longitude: loc.lng});
      fetchHotels(loc.lat, loc.lng);
    } catch (e) {
      Alert.alert('Błąd', 'Błąd pobierania współrzędnych');
      setLoading(false);
    }
  };

  const fetchHotels = async (lat, lng) => {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=lodging&key=${GOOGLE_MAPS_API_KEY}`);
      const data = await resp.json();
      if(data.status === 'OK'){
        setHotels(data.results);
      } else {
        Alert.alert('Błąd wyszukiwania hoteli', data.status);
      }
    } catch (e) {
      Alert.alert('Błąd', 'Błąd wyszukiwania hoteli');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Adres lub miasto"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <Button title="Znajdź hotele" onPress={fetchCoords} disabled={loading} />
      {loading && <ActivityIndicator style={{marginTop:10}} size="large" color="#2563eb" />}
      {coords && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={coords} title="Twój adres" pinColor="blue"/>
          {hotels.map((hotel, i) => (
            <Marker
              key={hotel.place_id || i}
              coordinate={{
                latitude: hotel.geometry.location.lat,
                longitude: hotel.geometry.location.lng
              }}
              title={hotel.name}
              description={hotel.vicinity}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15, backgroundColor: '#fff'},
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#111827',
  },
  map: {flex: 1, marginTop: 15},
});
