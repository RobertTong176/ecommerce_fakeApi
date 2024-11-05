import React, { useEffect, useState } from "react";
import FeatureCard from "../FeatureCard";

export default function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  if (!categories || categories.length === 0) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <FeatureCard cards={categories} />
    </div>
  );
}
