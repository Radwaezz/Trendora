
// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  counter: 1, // Initial value of the counter
  cart: [], // Cart to store products

  // Actions for updating the counter
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  
  decrement: () => set((state) => {
    // If the counter is greater than 1, decrement it
    if (state.counter > 1) {
      return { counter: state.counter - 1 };
    }
    return { counter: state.counter }; // Keep it at 1 if it's already 1
  }),

  setCounter: (value) => set(() => ({ counter: value })),

  // Cart management
  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find((p) => p.id === product.id);
    
    if (existingProduct) {
      // Update the quantity of an existing product
      return {
        cart: state.cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + state.counter } : p
        ),
      };
    } else {
      // Add a new product to the cart
      return {
        cart: [...state.cart, { ...product, quantity: state.counter }],
      };
    }
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((product) => product.id !== productId),
  })),

  updateCartProductQuantity: (productId, newQuantity) => set((state) => {
    if (newQuantity === 0) {
      // Remove the product if quantity reaches zero
      return {
        cart: state.cart.filter((product) => product.id !== productId),
      };
    } else {
      // Update product quantity in the cart
      return {
        cart: state.cart.map((product) =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        ),
      };
    }
  }),

  // Pagination state
  currentPage: 1,
  productsPerPage: 16,
  setCurrentPage: (page) => set({ currentPage: page }),
  totalProducts: 0,
  setTotalProducts: (total) => set({ totalProducts: total }),
}));

export default useStore;
