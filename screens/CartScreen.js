import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { getCartItems, clearCart } from '../utils/cartStorage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    const unsubscribe = navigation.addListener('focus', loadCart);
    return unsubscribe;
  }, [navigation]);

  const calculateTotal = () => {
    return cartItems.length;
  };

  const handleClearCart = async () => {
    await clearCart();
    setCartItems([]);
    Alert.alert('تم مسح السلة');
  };

  const goToPayment = () => {
    if (cartItems.length === 0) {
      Alert.alert('السلة فارغة');
      return;
    }
    navigation.navigate('Payment'); // تأكد أنك أضفت هذه الشاشة لاحقًا
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 السلة</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>السلة فارغة حاليًا</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <Text style={styles.itemName}>🍽️ {item.name}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>الإجمالي: {calculateTotal()} صنف</Text>

      <TouchableOpacity style={styles.clearBtn} onPress={handleClearCart}>
        <Text style={styles.btnText}>🗑️ مسح السلة</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.payBtn} onPress={goToPayment}>
        <Text style={styles.btnText}>💳 الذهاب إلى الدفع</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
  itemBox: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 14,
    color: '#555',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  clearBtn: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payBtn: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
