
import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, Button,
  Alert, StyleSheet, TouchableOpacity
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBObjLCJHs4koxphtaHmthPfhf7X-06nPE';

export default function DojazdScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [mode, setMode] = useState('driving');
  const mapRef = useRef(null);

  const decodePolyline = (t) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < t.length) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  const fetchRoute = async (originCoords, destinationCoords) => {
    const originStr = `${originCoords.latitude},${originCoords.longitude}`;
    const destinationStr = `${destinationCoords.latitude},${destinationCoords.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=${GOOGLE_MAPS_API_KEY}&mode=${mode}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK') {
        Alert.alert('Błąd API', data.error_message || data.status);
        return;
      }

      const points = decodePolyline(data.routes[0].overview_polyline.points);
      setRouteCoords(points);

      const leg = data.routes[0].legs[0];
      setDistance(`${leg.distance.text} (${leg.duration.text})`);

      setTimeout(() => {
        if(mapRef.current){
          mapRef.current.fitToCoordinates([originCoords,destinationCoords], {
            edgePadding: { top: 100,right: 100,bottom: 100,left: 100 },
            animated: true,
          });
        }
      }, 500);
    } catch (error) {
      Alert.alert('Błąd podczas pobierania trasy');
      console.error(error);
    }
  };

  const getCoords = async (locationName) => {
    try {
      const geocode = await Location.geocodeAsync(locationName);
      if (geocode.length === 0) throw new Error('Lokalizacja nie znaleziona');
      return geocode[0];
    } catch (error) {
      Alert.alert('Błąd', error.message);
      return null;
    }
  };

  const handlePlanTrip = async () => {
    if (!origin || !destination) {
      Alert.alert('Błąd', 'Wprowadź punkt początkowy i końcowy');
      return;
    }
    const orig = await getCoords(origin);
    const dest = await getCoords(destination);
    if (!orig || !dest) return;
    setOriginCoords(orig);
    setDestinationCoords(dest);
    await fetchRoute(orig, dest);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Lokalizacja A" style={styles.input} value={origin} onChangeText={setOrigin} />
      <TextInput placeholder="Lokalizacja B" style={styles.input} value={destination} onChangeText={setDestination} />
      <View style={styles.modeRow}>
        {['driving','walking','bicycling','transit'].map(m => (
          <TouchableOpacity
            key={m}
            style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
            onPress={() => setMode(m)}
          >
            <Text style={[styles.modeTxt, mode === m && styles.modeTxtActive]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Pokaż trasę" onPress={handlePlanTrip} />
      {distance && <Text style={styles.distance}>Расстояние: {distance}</Text>}

      <MapView
        style={styles.map}
        ref={mapRef}
        region={originCoords ? {...originCoords, latitudeDelta: 0.05, longitudeDelta: 0.05} : null}
      >
        {originCoords && <Marker coordinate={originCoords} title="Punkt A" />}
        {destinationCoords && <Marker coordinate={destinationCoords} title="Punkt B" />}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#2563eb" />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', padding:20},
  input: {borderWidth:1, borderColor:'#d1d5db', borderRadius:8, padding:10, marginBottom:10},
  modeRow: {flexDirection:'row', justifyContent:'space-around', marginBottom:10},
  modeBtn: {paddingVertical:6,paddingHorizontal:12, borderRadius:8, backgroundColor:'#e5e7eb'},
  modeBtnActive: {backgroundColor:'#2563eb'},
  modeTxt: {color:'#000', fontWeight:'600'},
  modeTxtActive: {color:'#fff'},
  distance: {padding:10, fontWeight:'600', fontSize:16},
  map: {flex:1, marginTop:10}
});
