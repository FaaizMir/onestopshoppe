import React from "react";
import { Link } from "react-router-dom";
import { Home, PlusCircle, Archive, LogOut } from "react-feather";
import seller from "../assets/seller.png";
export default function SellerDashboard() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const userType = localStorage.getItem("usertype");
  const firstname = localStorage.getItem('fname')
  const lastName = localStorage.getItem('lname')

  const name = firstname + ' ' + lastName

  if (userType !== "seller") {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div className="flex ">
      {/* Sidebar */}
      <aside class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <h1 class="mx-2 mt-2 font-bold text-2xl text-gray-800 dark:text-gray-200">
          OneStopShoppe
        </h1>

        <div class="flex flex-col items-center mt-6 -mx-2">
          <p className="font-large font-bold text-white"> WELCOME</p>
          <h4 class="mx-2 mt-2 font-normal text-gray-800 dark:text-gray-200">
             {name.toUpperCase()} 
          </h4>
     
        </div>

        <div class="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <Link
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
              to="/seller"
            >
              <Home className="w-5 h-5" />
              <span className="mx-4 font-medium">Home</span>
            </Link>

            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              to="/upload-product"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="mx-4 font-medium">Publish New Product</span>
            </Link>

            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              to="/show-all-products"
            >
              <Archive className="w-5 h-5" />
              <span className="mx-4 font-medium">All Products</span>
            </Link>

            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="mx-4 font-medium">Logout</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-5/6 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="container  mx-auto lg:mt-10 p-5">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={seller}
            ></img>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-4xl title-font text-white tracking-widest">
                OneStopShoppe
              </h1>
              <br />

              <p className="leading-relaxed text-white tracking-widest">
                 Our seller platform empowers
                you to take full control of your products and listings. Easily
                insert, delete, create, and publish your products to showcase
                them on our website. Maximize your
                business potential and watch your sales soar as you leverage our
                platform to showcase your products to the world. 
              </p>
              <button className="bg-green-600 mt-6 rounded border-3px h-10 text-white w-40">
                <Link to={"/upload-product"}>Create Product</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
