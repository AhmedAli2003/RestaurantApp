import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import foodData from '../data/foodData';

const MealsListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const meals = foodData[category] || [];

  const renderMeal = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetails', { item })}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>أصناف قسم: {category}</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMeal}
      />
    </View>
  );
};

export default MealsListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  desc: { fontSize: 14, color: '#555' },
});
