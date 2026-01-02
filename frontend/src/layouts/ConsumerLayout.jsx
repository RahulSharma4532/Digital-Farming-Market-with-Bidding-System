import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ConsumerLayout() {
  const navigate = useNavigate();

  /* GLOBAL CART STATE */
  const [cartItems, setCartItems] = useState([]);

  /* ADD TO CART */
  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  /* REMOVE FROM CART */
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  /* CLEAR CART AFTER ORDER */
  const clearCart = () => setCartItems([]);

  return (
    <Outlet
      context={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: cartItems.reduce((s, i) => s + i.qty, 0)
      }}
    />
  );
}
