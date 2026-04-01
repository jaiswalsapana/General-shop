import Link from 'next/link';
import ProductCard from './components/ProductCard';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

import { products, categories } from '@/lib/data';

async function getProducts() {
  return products;
}

async function getCategories() {
  return categories;
}

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  
  // Get 4 random products for featured section
  const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl overflow-hidden shadow-sm border border-green-100 mt-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
          <div className="md:w-1/2 space-y-6 z-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Fresh & Healthy <br /> <span className="text-green-600">Organic Food</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              Get premium quality groceries delivered straight to your door. Freshness guaranteed with every order.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0 relative hidden md:block">
            <div className="absolute inset-0 bg-green-200/50 rounded-full blur-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600&h=500" 
              alt="Fresh Vegetables" 
              className="rounded-2xl object-cover shadow-2xl w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          { icon: <Leaf size={32}/>, title: '100% Organic', desc: 'Sourced directly from organic farms' },
          { icon: <Truck size={32}/>, title: 'Fast Delivery', desc: 'Same day delivery on all fresh items' },
          { icon: <ShieldCheck size={32}/>, title: 'Secure Payment', desc: '100% secure payment gateway' }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
            <p className="text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section id="categories" className="py-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-white  flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
            Shop by Category
          </h2>
          <Link href="/products" className="text-green-600 font-semibold hover:text-green-700 hidden sm:flex items-center gap-1 group">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat: any) => (
            <Link key={cat.id} href={`/products?category=${cat.name}`} className="bg-white hover:bg-green-50 transition-colors p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-gray-50 group-hover:bg-white rounded-full flex items-center justify-center font-bold text-2xl text-gray-300">
                {cat.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-gray-800 text-center">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
            Featured Products
          </h2>
        </div>
        
        {products.length === 0 ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center shadow-sm">
            <h3 className="text-xl font-bold mb-2">Backend Not Connected</h3>
            <p>Please make sure the backend server is running on localhost:5002.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
