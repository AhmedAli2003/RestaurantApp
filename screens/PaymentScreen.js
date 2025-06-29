import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { clearCart, getCartItems } from '../utils/cartStorage';

const PaymentScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleConfirmOrder = async () => {
    const items = await getCartItems();

    if (items.length === 0) {
      Alert.alert('السلة فارغة');
      return;
    }

    if (!selectedMethod) {
      Alert.alert('يرجى اختيار طريقة الدفع');
      return;
    }

    await clearCart();

    Alert.alert('✅ تم تأكيد الطلب بنجاح', `طريقة الدفع: ${selectedMethod}`, [
      {
        text: 'الرجوع للرئيسية',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 اختيار طريقة الدفع</Text>

      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'كاش' && styles.selected,
        ]}
        onPress={() => setSelectedMethod('كاش')}
      >
        <Text style={styles.optionText}>الدفع كاش عند الاستلام 💵</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'فيزا' && styles.selected,
        ]}
        onPress={() => setSelectedMethod('فيزا')}
      >
        <Text style={styles.optionText}>الدفع ببطاقة فيزا 💳</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
        <Text style={styles.confirmText}>✅ تأكيد الطلب</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  confirmBtn: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
