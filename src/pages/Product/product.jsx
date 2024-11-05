import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching product",
          { position: "top-center" }
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleCart = (product, redirect) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductExist = cart.find((item) => item?.id === product?.id);

    if (isProductExist) {
      const updatedCart = cart.map((item) => {
        if (item?.id === product?.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }])
      );
    }
    toast.success('Add product to cart!', {position: 'top-center'})
    if (redirect) {
      navigate("/cart");
    }
  };

  if (!Object.keys(product).length && !isLoading)
    return <div>Product Not Found</div>;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt={product?.image || product?.title}
                className="lg:w-1/2 w-full lg:h-auto h-64 max-h-[400px] object-contain object-center rounded"
                src={product?.image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                  {product?.category}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product?.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {/* Star ratings here */}
                    <span className="text-gray-600 ml-3">
                      {product?.rating?.rate} reviews
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    {/* Social icons */}
                  </span>
                </div>
                <p className="leading-relaxed text-sm">
                  {product?.description}
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex items-center justify-center">
                    <span className="mr-3">Color</span>
                    {/* Color options */}
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      {/* Dropdown arrow */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${product?.price}
                  </span>
                  <div className="flex items-center justify-center">
                    <button
                      className="flex text-xs font-bold py-3 px-4 text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={() => handleCart(product, true)}
                    >
                      Buy it now
                    </button>
                    <button
                      className="flex text-xs font-bold ml-1 py-3 px-4 border border-indigo-500 focus:outline-none hover:bg-indigo-600 hover:text-white rounded"
                      onClick={() => handleCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    {/* Favorite icon */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
