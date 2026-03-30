import { ShoppingCart, Star, Shield, Truck, PackageCheck } from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from '../../components/AddToCartButton';

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:5002/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">The product you are looking for might be out of stock or doesn't exist.</p>
        <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 pb-16">
      <div className="p-8 md:p-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-green-600 transition">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-green-600 transition">Products</Link>
          <span className="mx-2">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-green-600 transition">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image */}
          <div className="md:w-1/2 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full h-auto max-h-[500px] object-contain hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center text-yellow-400 text-sm">
                <Star className="fill-current w-4 h-4" />
                <Star className="fill-current w-4 h-4" />
                <Star className="fill-current w-4 h-4" />
                <Star className="fill-current w-4 h-4" />
                <Star className="w-4 h-4 text-gray-300" />
                <span className="text-gray-500 ml-1">(4.0)</span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <div className="text-3xl font-black text-green-600 mb-6 flex items-end gap-2">
              ₹{product.price} <span className="text-lg font-medium text-gray-400 line-through mb-1">₹{Math.round(product.price * 1.2)}</span>
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded ml-2">20% OFF</span>
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* In a pure Server Component, we can't Add to Cart interactively. 
                We will need a Client Component for the actions! */}
            <div className="mt-8">
               <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Delivery Details</span>
               <ul className="mt-4 space-y-3">
                 <li className="flex items-center text-gray-600"><Truck className="mr-3 text-green-600" size={20}/> Free delivery on orders over ₹500</li>
                 <li className="flex items-center text-gray-600"><PackageCheck className="mr-3 text-green-600" size={20}/> Easy 7 days return policy</li>
                 <li className="flex items-center text-gray-600"><Shield className="mr-3 text-green-600" size={20}/> Secure packing & sanitised handling</li>
               </ul>
            </div>
            
            {/* Add to Cart Button */}
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
