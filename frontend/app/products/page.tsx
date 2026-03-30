import ProductCard from '../components/ProductCard';
import Link from 'next/link';

async function getProducts() {
  try {
    const res = await fetch('http://localhost:5002/api/products', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch('http://localhost:5002/api/categories', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Products({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = searchParams ? await searchParams : {};
  const search = typeof params.search === 'string' ? params.search.toLowerCase() : '';
  const category = typeof params.category === 'string' ? params.category : '';

  const allProducts = await getProducts();
  const categories = await getCategories();

  // Filter products based on searchParams
  let filteredProducts = allProducts;
  if (category) {
    filteredProducts = filteredProducts.filter((p: any) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    filteredProducts = filteredProducts.filter((p: any) => p.name.toLowerCase().includes(search));
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 pb-16">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Categories</h2>
          <ul className="space-y-3">
            <li>
              <Link 
                href="/products" 
                className={`block hover:text-green-600 transition-colors ${!category ? 'font-bold text-green-600' : 'text-gray-600'}`}
              >
                All Products
              </Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <Link 
                  href={`/products?category=${cat.name}`} 
                  className={`block hover:text-green-600 transition-colors ${category.toLowerCase() === cat.name.toLowerCase() ? 'font-bold text-green-600' : 'text-gray-600'}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {search ? `Search results for "${search}"` : category ? `${category} Products` : 'All Products'}
            <span className="text-sm font-normal text-gray-500 ml-3">({filteredProducts.length} items)</span>
          </h1>
          
          {/* Simple Sort Dropdown Layout (non-functional visual) */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-gray-500">Sort by:</span>
            <select className="border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 p-2 border bg-white outline-none">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-gray-50 text-center py-16 rounded-2xl border border-gray-200">
            <h3 className="text-xl text-gray-600 font-semibold mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your category or search term.</p>
            <Link href="/products" className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition">
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
