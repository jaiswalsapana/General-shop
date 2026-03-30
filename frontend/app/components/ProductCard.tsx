"use client";

import Link from 'next/link';
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

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-green-600 shadow-sm">
          {product.category}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-green-600 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-green-600">₹{product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white p-2 md:px-4 md:py-2 rounded-full transition-colors group/btn"
          >
            <ShoppingCart size={18} className="md:mr-2" />
            <span className="hidden md:inline font-semibold text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
