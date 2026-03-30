"use client";

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven't added any fresh groceries to your cart yet.</p>
        <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
              <Link href={`/products/${item.id}`} className="shrink-0 w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              
              <div className="flex-1 text-center sm:text-left">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors">{item.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <div className="text-lg font-black text-green-600">₹{item.price}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:text-green-600 transition"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:text-green-600 transition"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-medium text-gray-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium text-gray-900">₹{Math.round(cartTotal * 0.05)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900">Total Estimate</span>
                <span className="text-3xl font-black text-green-600">₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
              Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
