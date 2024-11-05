import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import ProductsCard from "../../components/ProductsCard";
import StatusCard from "../../components/StatusCard/statusCard";
import Loading from "../../components/Loading";
import Category from "../../components/Category";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Hero />
      <Category />
      <div className="flex flex-col text-center w-full mt-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1 uppercase">
          products
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 uppercase">
          All Products
        </h1>
      </div>
      {products?.length > 0 ? (
        <ProductsCard products={products} />
      ) : (
        <Loading />
      )}
      <StatusCard />
    </div>
  );
}
