import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);


  const GOOGLE_API_KEY = 'AIzaSyBObjLCJHs4koxphtaHmthPfhf7X-06nPE';

  const fetchNearbyPlaces = async (latitude, longitude) => {
    const radius = 5000; // 5 км
    const type = 'tourist_attraction';

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json.status === 'OK') {
        return json.results;
      } else {
        console.warn('Google Places API error:', json.status);
        return [];
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const regionObj = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(regionObj);

      const nearbyPlaces = await fetchNearbyPlaces(loc.coords.latitude, loc.coords.longitude);
      setPlaces(nearbyPlaces);

      setLoading(false);
    })();
  }, []);

  const onPlaceSelected = (data, details = null) => {
    if (!details) return;

    const newRegion = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    setRegion(newRegion);
    // Центрируем карту на выбранной точке
    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }

    // Загружаем достопримечательности вокруг новой точки
    fetchNearbyPlaces(newRegion.latitude, newRegion.longitude).then(setPlaces);
  };

  if (loading || !region) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Szukaj miejsce "
        fetchDetails={true}
        onPress={onPlaceSelected}
        query={{
          key: GOOGLE_API_KEY,
          language: 'pl',
        }}
        styles={{
          container: {
            position: 'absolute',
            top: 10,
            width: '90%',
            alignSelf: 'center',
            zIndex: 1,
          },
          listView: { backgroundColor: 'white' },
        }}
        debounce={400}
      />

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude || 52.2297,
            longitude: location?.longitude || 21.0122,
          }}
          title="Twoje GEO"
          description="Jesteś tu"
          pinColor="blue"
        />

        {places.map((place) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
            pinColor="red"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
