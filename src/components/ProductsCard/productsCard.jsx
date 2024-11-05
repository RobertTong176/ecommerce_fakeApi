import { Link } from "react-router-dom";


export default function ProductsCard({ products = [] }) {

  if (!products || products.length === 0) {
    return <div>No products available</div>; 
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              className="lg:w-1/4 md:w-1/2 p-4 w-full border border-opacity-50 mb-4 cursor-pointer"
              key={product.id}
            >
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt={product.title} // updated to product.title for accessibility
                  className="object-contain object-center w-full h-full block"
                  src={product.image}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.title}
                </h2>
                <p className="mt-1">{product.price} $</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
