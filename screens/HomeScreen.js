import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { id: '1', name: 'مأكولات بحرية' },
  { id: '2', name: 'ساندويشات' },
  { id: '3', name: 'أطباق رئيسية' },
  { id: '4', name: 'شوربات' },
  { id: '5', name: 'مقبلات' },
  { id: '6', name: 'مشروبات' },
];

const HomeScreen = ({ navigation }) => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
    onPress={() => navigation.navigate('MealsList', { category: item.name })}

    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أقسام الطعام</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartText}>الذهاب إلى السلة 🛒</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryButton: {
    backgroundColor: '#ffe4b5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
