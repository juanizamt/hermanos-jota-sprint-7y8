import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  
  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === productToAdd._id);
      if (existingItem) {
        
        return prevItems.map(item =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  };


  const removeFromCart = (id) => {
      setCartItems(prev => prev.filter(item => item._id !== id));
  };


  const clearCart = () => setCartItems([]);


  const cartTotal = cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};