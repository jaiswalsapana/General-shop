"use client";

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name}(s) added to cart.`);
  };

  return (
    <div className="flex flex-col gap-4 mt-8 md:-translate-y-24">
      <div className="flex items-center">
        <button 
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="bg-gray-100 px-4 py-2 font-bold hover:bg-gray-200 transition rounded-l-full"
        >
          -
        </button>
        <div className="px-6 border-y border-gray-100 py-2 font-semibold">
          {quantity}
        </div>
        <button 
          onClick={() => setQuantity(q => q + 1)}
          className="bg-gray-100 px-4 py-2 font-bold hover:bg-gray-200 transition rounded-r-full"
        >
          +
        </button>
      </div>
      <button 
        onClick={handleAddToCart}
        className="bg-green-600 outline outline-4 outline-green-100 outline-offset-0 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow hover:shadow-lg transition-all flex items-center justify-center gap-3 w-full sm:w-64 transform active:scale-95"
      >
        <ShoppingCart size={22} /> Add to Cart
      </button>
    </div>
  );
}
