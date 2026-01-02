import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Main Cart State
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Toast Notification State
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);

  // User & Order State
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: '', pincode: ''
  });

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart:v1');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        } else {
          console.warn("Corrupt cart data found, resetting.");
          setCartItems([]);
        }
      }
      const savedOrders = localStorage.getItem('orders:v1');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUser = localStorage.getItem('userDetails:v1');
      if (savedUser) setUserDetails(JSON.parse(savedUser));
    } catch (e) {
      console.error("Failed to load local storage data", e);
    }
  }, []);

  // Save to LocalStorage & Update Stats
  useEffect(() => {
    localStorage.setItem('cart:v1', JSON.stringify(cartItems));

    // Calculate Stats - Ensure cartItems is array
    if (Array.isArray(cartItems)) {
      const count = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      const total = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
      setCartCount(count);
      setCartTotal(total);
    }
  }, [cartItems]);

  // Cart Actions
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Trigger Toast
    setToastProduct(product);
    setShowToast(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      showToast,
      toastProduct,
      setShowToast,
      userDetails,
      setUserDetails,
      orders,
      setOrders
    }}>
      {children}
    </CartContext.Provider>
  );
};
