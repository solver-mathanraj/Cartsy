import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, titles, money, discount, image, stocks) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item);

      if (existingItem) {
        // 🔁 Increase count if already exists
        return prevCart.map((cartItem) =>
          cartItem.id === item
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
      } else {
        // 🆕 Add new item
        return [
          ...prevCart,
          {
            id: item,
            count: 1,
            title: titles,
            price: money,
            discountPercentage: discount,
            thumbnail: image,
            stock: stocks,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const decrementFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId && cartItem.count > 1
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem
      )
    );
  };

  const incrementFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decrementFromCart,
        incrementFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
