export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-green-500 mb-4">FreshGrocery</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for daily essentials, fresh produce, and quality groceries delivered right to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-green-500 transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-green-500 transition-colors">Products</a></li>
              <li><a href="/cart" className="hover:text-green-500 transition-colors">Cart</a></li>
              <li><a href="/checkout" className="hover:text-green-500 transition-colors">Checkout</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: jaiswalsapna080 </li>
              <li>Phone: +91 8957835966</li>
              <li>Address: Mahrajganj Uttar Pradesh</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FreshGrocery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
