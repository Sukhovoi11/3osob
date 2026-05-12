
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NoteCard({ note }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      🕒<Text style={styles.date}>{new Date(note.createdAt).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  content: { fontSize: 14, color: '#6b7280', marginTop: 6 },
  date: { fontSize: 12, color: '#9ca3af', marginTop: 8, textAlign: 'right' },
});
