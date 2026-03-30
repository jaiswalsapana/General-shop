"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, CheckCircle, Package } from 'lucide-react';
import Link from 'next/link';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-green-100 max-w-2xl mx-auto my-12 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-iner shadow-green-200">
          <CheckCircle size={48} className="animate-bounce" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Order Successful!</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">Thank you for shopping with FreshGrocery. Your healthy groceries are being prepared for delivery.</p>
        <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex items-center gap-4 text-left border border-gray-100">
          <Truck className="text-gray-400 shrink-0" size={32} />
          <div>
            <h4 className="font-bold text-gray-900">Estimated Delivery</h4>
            <p className="text-gray-500">Today, by 6:00 PM</p>
          </div>
        </div>
        <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold mb-4">You have nothing to checkout</h2>
        <Link href="/products" className="text-green-600 font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6 border-b pb-4">
              <Truck className="text-green-500" /> Delivery Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Phone</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow outline-none" placeholder="+91 98765 43210" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Delivery Address</label>
              <textarea required rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow outline-none" placeholder="123 Fresh Lane, Green Town..." />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mt-8 mb-6 border-b pb-4 pt-4">
              <CreditCard className="text-green-500" /> Payment Info
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-green-200 bg-green-50 rounded-xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                   <input type="radio" checked readOnly className="text-green-600 focus:ring-green-500 h-5 w-5" />
                   <span className="font-bold text-gray-900">Cash on Delivery</span>
                </div>
                <Package className="text-green-600" />
              </div>
              <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between cursor-not-allowed opacity-50 relative overflow-hidden group">
                <div className="flex items-center gap-3">
                   <input type="radio" disabled className="h-5 w-5" />
                   <span className="font-bold text-gray-900">Credit / Debit Card</span>
                </div>
                <CreditCard className="text-gray-500" />
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-[1px]">
                   <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded font-bold">Coming Soon</span>
                </div>
              </div>
            </div>
            
          </form>
        </div>

        <div className="md:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Order Items</h3>
             <ul className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-4">
               {cart.map(item => (
                 <li key={item.id} className="flex gap-4">
                   <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                   <div className="flex-1">
                     <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                     <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                     <p className="text-sm font-bold text-green-600">₹{item.price * item.quantity}</p>
                   </div>
                 </li>
               ))}
             </ul>
             
             <div className="border-t border-gray-100 pt-4 space-y-2 mb-6 text-sm text-gray-600">
               <div className="flex justify-between"><span>Subtotal</span> <span className="font-medium">₹{cartTotal}</span></div>
               <div className="flex justify-between"><span>Tax</span> <span className="font-medium">₹{Math.round(cartTotal * 0.05)}</span></div>
               <div className="flex justify-between text-lg font-black text-gray-900 mt-2 pt-2 border-t border-dashed">
                 <span>Total</span> <span className="text-green-600">₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
               </div>
             </div>

             <button type="submit" form="checkout-form" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group transform active:scale-95">
              Place Order
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
