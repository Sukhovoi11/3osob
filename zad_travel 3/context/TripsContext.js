import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { AuthContext } from './AuthContext';

const db = getFirestore();

export const TripsContext = createContext();

const STORAGE_KEY = '@trips_cache';

export function TripsProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const isInitialLoad = useRef(true);

  // Фильтры
  const [filterDestination, setFilterDestination] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterNotes, setFilterNotes] = useState('');

  const saveTripsCache = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Ошибка сохранения trips:', e);
    }
  };

  const loadTripsCache = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json != null ? JSON.parse(json) : [];
    } catch (e) {
      console.error('Ошибка загрузки trips:', e);
      return [];
    }
  };

  useEffect(() => {
    if (!user) {
      setTrips([]);
      isInitialLoad.current = true;
      return;
    }
    const loadTrips = async () => {
      if (!isInitialLoad.current) return;
      const cached = await loadTripsCache();

      if (cached.length > 0) {
        setTrips(cached);
        isInitialLoad.current = false;
        return;
      }

      try {
        const q = query(collection(db, 'trips'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const tripsData = [];
        querySnapshot.forEach(doc => tripsData.push({ id: doc.id, ...doc.data() }));
        setTrips(tripsData);
        await saveTripsCache(tripsData);
        isInitialLoad.current = false;
      } catch (error) {
        console.error('Ошибка при загрузке trips:', error);
      }
    };
    loadTrips();
  }, [user]);

  useEffect(() => {
    if (!isInitialLoad.current) {
      saveTripsCache(trips);
    }
  }, [trips]);

  const addTrip = async (trip) => {
    if (!user) return;
    try {
      const docRef = await addDoc(collection(db, 'trips'), {
        ...trip,
        userId: user.uid,
        completed: false,
      });
      const newTrip = { id: docRef.id, ...trip, completed: false };
      setTrips(prev => [...prev, newTrip]);
      await saveTripsCache([...trips, newTrip]);
    } catch (error) {
      console.error('Ошибка добавления trip:', error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await deleteDoc(doc(db, 'trips', id));
      const updated = trips.filter(t => t.id !== id);
      setTrips(updated);
      await saveTripsCache(updated);
    } catch (error) {
      console.error('Ошибка удаления trip:', error);
    }
  };

  const updateTrip = async (id, updatedFields) => {
    try {
      const tripRef = doc(db, 'trips', id);
      await updateDoc(tripRef, updatedFields);
      const updated = trips.map(t => t.id === id ? { ...t, ...updatedFields } : t);
      setTrips(updated);
      await saveTripsCache(updated);
    } catch (error) {
      console.error('Ошибка обновления trip:', error);
    }
  };

  const toggleCompleted = (trip) => {
    updateTrip(trip.id, { completed: !trip.completed });
  };

  // Логика фильтрации trips — вычисляемая переменная
  const filteredTrips = trips.filter(trip => {
    const matchDestination = filterDestination
      ? trip.destination.toLowerCase().includes(filterDestination.toLowerCase())
      : true;

    const matchDate = filterDate
      ? trip.date.includes(filterDate)
      : true;

    const matchNotes = filterNotes
      ? (trip.note ? trip.note.toLowerCase().includes(filterNotes.toLowerCase()) : false)
      : true;

    return matchDestination && matchDate && matchNotes;
  });

  return (
    <TripsContext.Provider value={{
      trips,
      setTrips,           // добавляем setTrips
      filteredTrips,
      addTrip,
      deleteTrip,
      updateTrip,
      toggleCompleted,
      filterDestination,
      setFilterDestination,
      filterDate,
      setFilterDate,
      filterNotes,
      setFilterNotes,
    }}>
      {children}
    </TripsContext.Provider>
  );
}
