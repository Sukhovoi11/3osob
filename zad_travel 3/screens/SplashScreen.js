
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="airplane" size={120} color="#007AFF" />
      <Text style={styles.title}>Planer podróży</Text>
      <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  title: { fontSize:28, fontWeight:'bold', color:'#007AFF', marginTop:20 }
});
