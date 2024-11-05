import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
  }, [cart]);
  const handleInc = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleDec = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const removeProduct = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Remove product success", { position: "top-center" });
    navigate("/cart");
  };

  const subtotal = total;
  const taxes = (total + 1.99).toFixed(2); 
  const shipping = 0.0; 
  const grandTotal = (subtotal + 19.99 + shipping).toFixed(2);

  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <h1 className="text-2xl font-semibold mb-4">{cart?.quantity} Items</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full text-lg">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                {cart.map((item) => (
                  <tbody key={item?.id}>
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4"
                            src={item?.image}
                            alt="Product image"
                          />
                          <div className="flex flex-col">
                            <span className="font-bold">{item?.title}</span>
                            <span className="mt-2 text-base font-medium text-red-400">
                              {item?.category}
                            </span>
                            <span
                              className="mt-2  text-sm font-medium hover:underline cursor-pointer"
                              onClick={() => removeProduct(item?.id)}
                            >
                              Remove
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">${item?.price}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="border rounded-md py-2 px-4 mr-2"
                            onClick={() => handleDec(item?.id)}
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {item?.quantity}
                          </span>
                          <button
                            className="border rounded-md py-2 px-4 ml-2"
                            onClick={() => handleInc(item?.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">${item?.price * item?.quantity}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 text-base">
              <h2 className="text-lg font-bold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${taxes}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${grandTotal}</span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
