import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'MY_CART_ITEMS';

export const addToCart = async (item) => {
  try {
    const existing = await AsyncStorage.getItem(CART_KEY);
    const cart = existing ? JSON.parse(existing) : [];

    cart.push(item);

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.log('Error adding to cart', error);
  }
};

export const getCartItems = async () => {
  try {
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error reading cart', error);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.log('Error clearing cart', error);
  }
};
