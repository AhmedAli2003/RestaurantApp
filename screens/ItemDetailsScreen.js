import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart } from '../utils/cartStorage'; // تأكد أن هذا الملف موجود

const ItemDetailsScreen = ({ route }) => {
  const { item } = route.params;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState('');

  const COMMENTS_KEY = `COMMENTS_${item.name}`;

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const stored = await AsyncStorage.getItem(COMMENTS_KEY);
      if (stored) {
        setComments(JSON.parse(stored));
      }
    } catch (error) {
      console.log('خطأ أثناء تحميل التعليقات:', error);
    }
  };

  const saveComment = async () => {
    if (!newComment || !rating) {
      Alert.alert('الرجاء تعبئة جميع الحقول');
      return;
    }

    const newEntry = { comment: newComment, rating };
    const updated = [...comments, newEntry];
    setComments(updated);
    await AsyncStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
    setNewComment('');
    setRating('');
  };

  return (
    <View style={styles.container}>
      {/* معلومات الصنف */}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.section}>الوصف: {item.description}</Text>
      <Text style={styles.section}>القيمة الغذائية: {item.nutrition}</Text>

      {/* عرض التعليقات */}
      <Text style={styles.subTitle}>التعليقات:</Text>
      <FlatList
        data={comments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text>⭐ {item.rating}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
      />

      {/* إدخال تعليق وتقييم */}
      <TextInput
        style={styles.input}
        placeholder="اكتب تعليقك"
        value={newComment}
        onChangeText={setNewComment}
      />
      <TextInput
        style={styles.input}
        placeholder="التقييم من 1 إلى 5"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <TouchableOpacity style={styles.button} onPress={saveComment}>
        <Text style={styles.buttonText}>إضافة تعليق</Text>
      </TouchableOpacity>

      {/* زر الإضافة للسلة */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff8c00', marginTop: 10 }]}
        onPress={() => {
          addToCart(item);
          Alert.alert('تمت الإضافة إلى السلة', item.name);
        }}
      >
        <Text style={styles.buttonText}>إضافة إلى السلة</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
    textAlign: 'right',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  commentBox: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
