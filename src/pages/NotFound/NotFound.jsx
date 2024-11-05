import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-500">
      <h1 className="text-9xl italic">404</h1>
      <div className="text-4xl font-bold mb-5">Oops! Page not found</div>
      <p className="inline-block p-4 border border-gray-500 shadow-[5px_-5px] cursor-pointer">
        <Link to="/" className="font-bold hover:underline">
          Return Home
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
