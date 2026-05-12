import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const countryFlags = {
  Francja: '🇫🇷',
  Japonia: '🇯🇵',
  RPA: '🇿🇦',
  Brazylia: '🇧🇷',
  USA: '🇺🇸',
  'Wielka Brytania': '🇬🇧',
  Australia: '🇦🇺',
  Hiszpania: '🇪🇸',
  Włochy: '🇮🇹',
  Tajlandia: '🇹🇭',
  Holandia: '🇳🇱',
  'Zjednoczone Emiraty Arabskie': '🇦🇪',
  Maroko: '🇲🇦',
  Grecja: '🇬🇷',
  Islandia: '🇮🇸',
  Argentyna: '🇦🇷',
};

const recommendedPlaces = [
  { id: '1', name: 'Paryż', country: 'Francja', description: 'Paryż to jedno z najbardziej fascynujących miejsc w kraju Francja. Miasto słynie z wyjątkowych atrakcji turystycznych, historii oraz lokalnej kultury.', latitude: 48.8566, longitude: 2.3522 },
  { id: '2', name: 'Kioto', country: 'Japonia', description: 'Kioto znane z tradycyjnej architektury, ogrodów i świątyń buddyjskich, oferuje wyjątkowe wrażenia kulturowe i historyczne.', latitude: 35.0116, longitude: 135.7681 },
  { id: '3', name: 'Kapsztad', country: 'RPA', description: 'Kapsztad położony u stóp Góry Stołowej, idealny dla miłośników przyrody i plaż.', latitude: -33.9249, longitude: 18.4241 },
  { id: '4', name: 'Rio de Janeiro', country: 'Brazylia', description: 'Miasto karnawału, samby i plaż Copacabana oraz Ipanema.', latitude: -22.9068, longitude: -43.1729 },
  { id: '5', name: 'Nowy Jork', country: 'USA', description: 'Nowy Jork, miasto, które nigdy nie śpi, słynie z drapaczy chmur, Central Parku i różnorodnej kultury.', latitude: 40.7128, longitude: -74.006 },
  { id: '6', name: 'Londyn', country: 'Wielka Brytania', description: 'Londyn to historyczne miasto pełne zabytków, takich jak Big Ben, Tower Bridge i British Museum.', latitude: 51.5074, longitude: -0.1278 },
  { id: '7', name: 'Sydney', country: 'Australia', description: 'Sydney słynie z opery, plaż Bondi i przepięknych widoków na zatokę.', latitude: -33.8688, longitude: 151.2093 },
  { id: '8', name: 'Barcelona', country: 'Hiszpania', description: 'Barcelona zachwyca architekturą Gaudiego, pyszną kuchnią i klimatycznymi uliczkami.', latitude: 41.3851, longitude: 2.1734 },
  { id: '9', name: 'Rzym', country: 'Włochy', description: 'Rzym to serce starożytnego imperium, z Koloseum, Forum Romanum i Watykanem.', latitude: 41.9028, longitude: 12.4964 },
  { id: '10', name: 'Bangkok', country: 'Tajlandia', description: 'Bangkok to tętniąca życiem stolica Tajlandii, znana z świątyń, pysznego jedzenia i nocnych rynków.', latitude: 13.7563, longitude: 100.5018 },
  { id: '11', name: 'Amsterdam', country: 'Holandia', description: 'Amsterdam słynie z kanałów, rowerów i muzeów, tworząc niepowtarzalny klimat miasta.', latitude: 52.3676, longitude: 4.9041 },
  { id: '12', name: 'Dubaj', country: 'Zjednoczone Emiraty Arabskie', description: 'Dubaj to nowoczesne miasto z futurystycznymi budynkami, takimi jak Burj Khalifa i luksusowymi hotelami.', latitude: 25.276987, longitude: 55.296249 },
  { id: '13', name: 'Marrakesz', country: 'Maroko', description: 'Marrakesz oferuje barwne bazary, starożytne pałace i magiczną atmosferę orientu.', latitude: 31.6295, longitude: -7.9811 },
  { id: '14', name: 'Santorini', country: 'Grecja', description: 'Santorini zachwyca białymi domkami, niebieskimi kopułami i przepięknymi zachodami słońca nad morzem.', latitude: 36.3932, longitude: 25.4615 },
  { id: '15', name: 'Reykjavik', country: 'Islandia', description: 'Reykjavik to brama do dzikiej przyrody Islandii, z gorącymi źródłami i zorzą polarną.', latitude: 64.1466, longitude: -21.9426 },
  { id: '16', name: 'Buenos Aires', country: 'Argentyna', description: 'Buenos Aires to miasto tanga, z klimatycznymi uliczkami i wyjątkową kulturą latynoamerykańską.', latitude: -34.6037, longitude: -58.3816 },
];

export default function HitsScreen() {
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleToggleFavorite = (place) => {
    if (favorites.includes(place.id)) {
      setFavorites(favorites.filter((id) => id !== place.id));
    } else {
      setFavorites([...favorites, place.id]);
      Alert.alert('Dodano do ulubionych', `${place.name} został dodany do ulubionych.`);
    }
  };

  const openDetails = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    const flag = countryFlags[item.country] || '🌍';

    return (
      <TouchableOpacity style={styles.card} onPress={() => openDetails(item)}>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>{flag}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.country}>{item.country}</Text>
            </View>
            <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
              <Ionicons
                name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={favorites.includes(item.id) ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendedPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                <Text style={styles.modalTitle}>{selectedPlace.name}</Text>
                <Text style={styles.modalCountry}>{selectedPlace.country}</Text>
                <Text style={styles.modalDescription}>{selectedPlace.description}</Text>
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: selectedPlace.latitude,
                      longitude: selectedPlace.longitude,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: selectedPlace.latitude,
                        longitude: selectedPlace.longitude,
                      }}
                      title={selectedPlace.name}
                      description={selectedPlace.country}
                    />
                  </MapView>
                </View>
                <Button title="Zamknij" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  flagContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  flag: { fontSize: 30 },
  info: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold' },
  country: { fontSize: 14, color: '#777' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  modalCountry: { fontSize: 18, color: '#888', marginBottom: 10 },
  modalDescription: { fontSize: 16, marginBottom: 20 },
  mapContainer: { height: 200, marginBottom: 20 },
  map: { flex: 1 },
});