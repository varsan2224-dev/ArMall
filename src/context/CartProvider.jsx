import { useEffect, useReducer } from "react";
import CartContext from "./CartContext";

const savedCart = localStorage.getItem("cartItems");

const initialState = {
  cartItems: savedCart ? JSON.parse(savedCart) : [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id,
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            brand: product.brand,
            rating: product.rating,
            inStock: product.availabilityStatus,
            quantity: 1,
          },
        ],
      };
    }
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addToCart(product) {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }

  function increaseQuantity(id) {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  }

  function decreaseQuantity(id) {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  }

  function removeFromCart(id) {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const totalQuantity = state.cartItems.reduce(
    (acc, val) => acc + val.quantity,
    0,
  );
  const totalPrice = state.cartItems.reduce(
    (acc, val) => acc + val.price * val.quantity,
    0,
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const value = {
    cartItems: state.cartItems,
    totalQuantity,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
