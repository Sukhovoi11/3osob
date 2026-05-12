
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskItem({ task, onToggle }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      <Ionicons
        name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={task.completed ? '#4caf50' : '#9ca3af'}
      />
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        {task.description ? <Text style={styles.description}>{task.description}</Text> : null}
        {task.dueDate ? <Text style={styles.dueDate}>Срок: {task.dueDate}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-start', padding: 15, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10 },
  content: { marginLeft: 12, flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  completed: { textDecorationLine: 'line-through', color: '#9ca3af' },
  description: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  dueDate: { fontSize: 12, color: '#dc2626', marginTop: 4 },
});
