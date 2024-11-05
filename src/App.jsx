import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import CategoryProducts from "./pages/CategoryProducts";
function App() {
  return (
    <div className="text-gray-600 text-4xl">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories/:name" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
