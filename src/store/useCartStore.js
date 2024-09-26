


import { create } from 'zustand';
import { toast } from 'react-toastify';

const useCartStore = create((set, get) => ({
  cart: [],
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  isCartOpen: false,

  // Cart Functions
  addToCart: (product) => {
    const currentCart = get().cart;
    const existingProduct = currentCart.find(item => item.id === product.id);

    if (existingProduct) {
      set({
        cart: currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        ),
      });
    } else {
      set({ 
        cart: [...currentCart, { ...product, quantity: product.quantity || 1 }] 
      });
    }
  },
  updateItemQuantity: (id, delta) => {
    set(state => {
      const updatedCart = state.cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) } // Ensure quantity is at least 1
          : item
      );
      return { cart: updatedCart };
    });
  },
  removeFromCart: (id) => set({
    cart: get().cart.filter(item => item.id !== id),
  }),

  cartTotalItems: () => 
    get().cart.reduce((total, item) => total + item.quantity, 0),

  cartTotalPrice: () => 
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),

  // Wishlist Functions
  toggleLike: (product) => {
    set((state) => {
      const updatedWishlist = state.wishlist.some(item => item.id === product.id)
        ? state.wishlist.filter(item => item.id !== product.id)
        : [...state.wishlist, product];

      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

      if (updatedWishlist.length > state.wishlist.length) {
        toast.success(`Product "${product.title}" successfully added to wishlist`);
      } else {
        toast.info(`Product "${product.title}" successfully removed from wishlist`);
      }

      return { wishlist: updatedWishlist };
    });
  },

  removeFromWishlist: (id) => {
    set((state) => {
      const updatedWishlist = state.wishlist.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    });
  },

  isProductInWishlist: (id) => {
    return get().wishlist.some(item => item.id === id);
  },

  wishlistTotalItems: () => get().wishlist.length,

  // New function to initialize wishlist from localStorage
  initializeWishlist: () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    set({ wishlist: savedWishlist });
  },
}));

export default useCartStore;