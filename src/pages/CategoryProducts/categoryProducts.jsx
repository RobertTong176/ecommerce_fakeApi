import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import ProductsCard from "../../components/ProductsCard";

export default function CategoryProducts() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${name}`
      );
      const data = await response.json();
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return <Loading />;
  return (
    <div>
      <ProductsCard products={products}/>
    </div>
  );
}
