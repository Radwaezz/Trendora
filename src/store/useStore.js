// store.js
import {create} from 'zustand';

const useStore = create((set) => ({
  counter: 1, // Initial value of the counter
  
  // Actions for updating the counter
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({
    counter: state.counter > 1 ? state.counter - 1 : 1 
  })),
  setCounter: (value) => set(() => ({ counter: value })),
  
  // State for pagination
  currentPage: 1,
  productsPerPage: 16,
  setCurrentPage: (page) => set({ currentPage: page }),
  totalProducts: 0,
  setTotalProducts: (total) => set({ totalProducts: total }),
}));

export default useStore;
