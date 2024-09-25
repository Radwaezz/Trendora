// import create from 'zustand';

// export const useWishlistStore = create((set) => ({
//   wishlist: [],

//   // Add to wishlist
//   addToWishlist: (product) => set((state) => ({
//     wishlist: [...state.wishlist, product],
//   })),

//   // Remove from wishlist
//   removeFromWishlist: (product) => set((state) => ({
//     wishlist: state.wishlist.filter((item) => item.id !== product.id),
//   })),
// }));


// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// // Custom hook for managing the wishlist
// const useWishlistStore = () => {
//   const [likedProducts, setLikedProducts] = useState(new Set());

//   // Load wishlist from localStorage on component mount
//   useEffect(() => {
//     const savedWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
//     const productIds = new Set(savedWishList.map((product) => product.id));
//     setLikedProducts(productIds);
//   }, []);

//   // Add or remove product from wishlist
//   const toggleLike = (product) => {
//     setLikedProducts((prevLiked) => {
//       const updatedLiked = new Set(prevLiked);
      
//       if (updatedLiked.has(product.id)) {
//         updatedLiked.delete(product.id);
//         toast.info(`Product "${product.title}" successfully removed from wishlist`);

//         // Remove product from localStorage
//         let savedWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
//         savedWishList = savedWishList.filter((item) => item.id !== product.id);
//         localStorage.setItem('wishlist', JSON.stringify(savedWishList));
//       } else {
//         updatedLiked.add(product.id);
//         toast.success(`Product "${product.title}" successfully added to wishlist`);

//         // Add product to localStorage
//         const savedWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
//         savedWishList.push(product);
//         localStorage.setItem('wishlist', JSON.stringify(savedWishList));
//       }

//       return updatedLiked;
//     });
//   };

//   return {
//     likedProducts,
//     toggleLike,
//   };
// };

// export default useWishlistStore;


// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// const useWishlistStore = () => {
//   const [likedProducts, setLikedProducts] = useState(new Set());

//   // Load wishlist from localStorage when the component mounts
//   useEffect(() => {
//     const savedWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
//     const productIds = new Set(savedWishList.map((product) => product.id));
//     setLikedProducts(productIds);
//   }, []);

//   const toggleLike = (product) => {
//     setLikedProducts((prevLiked) => {
//       const updatedLiked = new Set(prevLiked);

//       if (updatedLiked.has(product.id)) {
//         updatedLiked.delete(product.id);
//         toast.info(`Product "${product.title}" successfully removed from wishlist`);

//         // Remove product from localStorage
//         let savedWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
//         savedWishList = savedWishList.filter((item) => item.id !== product.id);
//         localStorage.setItem('wishlist', JSON.stringify(savedWishList));
//       } else {
//         // Check if the product already exists in localStorage before adding
//         const savedWishList = JSON.parse(localStorage.getItem('wishlist')) || [];
//         const alreadyInWishlist = savedWishList.some((item) => item.id === product.id);

//         if (!alreadyInWishlist) {
//           updatedLiked.add(product.id);
//           toast.success(`Product "${product.title}" successfully added to wishlist`);

//           savedWishList.push(product);
//           localStorage.setItem('wishlist', JSON.stringify(savedWishList));
//         }
//       }

//       return updatedLiked;
//     });
//   };

//   return {
//     likedProducts,
//     toggleLike,
//   };
// };

// export default useWishlistStore;
