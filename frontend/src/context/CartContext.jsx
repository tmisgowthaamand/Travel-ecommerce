import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, item_count: 0 });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], total: 0, item_count: 0 });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/cart`);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart, token]);

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) return false;
    try {
      await axios.post(`${API_URL}/api/cart/add`, { product_id: productId, quantity });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return false;
    try {
      await axios.put(`${API_URL}/api/cart/update`, { product_id: productId, quantity });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Failed to update cart:', error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return false;
    try {
      await axios.delete(`${API_URL}/api/cart/remove/${productId}`);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      return false;
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return false;
    try {
      await axios.delete(`${API_URL}/api/cart/clear`);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
