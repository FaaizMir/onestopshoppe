import React, { useState, useEffect } from "react";
import home from "../assets/home.png";
import about from "../assets/about.png";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import PaymentFormModal from "./PaymentFormModal";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSelectedProductModal, setShowSelectedProductModal] =
    useState(false); // New state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch("http://localhost:9000/api/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.productCategory === selectedCategory
        );

  const onViewProduct = (product) => {
    setSelectedProduct(product);
    setShowSelectedProductModal(true);
  };

  const onCloseModal = () => {
    setSelectedProduct(null);
    setShowSelectedProductModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleOrder = async (formData) => {
    // Add code to send the payment request to the server and handle the response
    try {
      const response = await fetch("http://localhost:9000/payment-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Payment request successful, you can handle the response here if needed
        console.log("Payment request successful");
      } else {
        // Payment request failed, you can handle the error here if needed
        console.error("Payment request failed");
      }
    } catch (error) {
      console.error("Error sending payment request:", error);
    }
  };

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <h1 className="text-xl font-bold text-gray-900">OneStopShoppe</h1>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a
              href="#home"
              className="mr-5 hover:text-gray-900"
              onClick={() => scrollToSection("home")}
            >
              Home
            </a>
            <a
              href="#about"
              className="mr-5  hover:text-gray-900"
              onClick={() => scrollToSection("about")}
            >
              About Us
            </a>
            <a
              href="#products"
              className="mr-5   hover:text-gray-900"
              onClick={() => scrollToSection("how-it-works")}
            >
              Featured Products
            </a>
            <Link to="/shoe-model" className="mr-5   hover:text-gray-900">
              Shoe Model Configurator
            </Link>
            <Link to="/lady-model" className="mr-5   hover:text-gray-900">
              Female Try on Model
            </Link>
          </nav>
          <button
            className="inline-flex items-center bg-gray-900 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-300 hover:text-white rounded text-base mt-4 md:mt-0"
            onClick={handleLogout}
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      <div id="home" className="h-screen bg-grey-100 ml-12 lg:mt-12">
        <section className="text-gray-600 body-font mt-[-20px]">
          <div className="container mx-auto flex flex-col-reverse px-5  md:flex-row items-center">
            <div className="lg:max-w-xl lg:w-full md:w-1/2 w-full md:pr-16 flex flex-col items-start text-center md:text-left mb-16 md:mb-0">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Welcome to <span className="text-gray-900">OneStopShoppe</span>
              </h1>
              <p className="mb-8 lg:mt-4 leading-relaxed">
                Welcome to our E-commerce Wonderland! Step into the world of
                seamless online shopping with our centralized e-commerce
                platform. Here, multiple companies converge to offer a diverse
                and vibrant marketplace for buyers like you. Browse through an
                extensive catalog of products, from trendy fashion pieces and
                everything in between. Our user-friendly interface ensures
                effortless navigation, making it easy to find what you need in
                no time.{" "}
              </p>
              <div className="flex justify-center md:text-center"></div>
            </div>
            <div className="lg:w-1/2 w-full">
              <img
                className="object-cover object-center rounded lg:w-[500px] h-auto"
                alt="hero"
                src={home}
              />
            </div>
          </div>
        </section>
      </div>
      <br />
      <div id="about">
        <section class="bg-white">
          <div class="container px-6  mx-auto">
            <div class="lg:-mx-6 lg:flex lg:items-center">
              <img
                class="bject-cover object-center lg:w-[500px] lg:mx-6 w-full h-64 lg:h-[24rem] rounded-lg"
                src={about}
                alt=""
              />

              <div class="mt-4 lg:ml-10 lg:w-1/2 lg:px-6 lg:mt-0">
                <h1 class="text-2xl font-semibold text-gray-800  lg:text-3xl lg:w-96">
                  About Us
                </h1>

                <p class="max-w-lg mt-6  text-black ">
                  Welcome to our centralized e-commerce platform, where multiple
                  companies list their products, creating a diverse and vibrant
                  marketplace for buyers and sellers alike.{" "}
                </p>
                <p className="max-w-lg mt-6 text-black">
                  {" "}
                  We offer a seamless shopping experience with a wide range of
                  products. Personalize your footwear with our 3D shoe
                  customizer and experiment with different looks using our
                  female model customizer.
                </p>
                <p className="max-w-lg mt-6 text-black">
                  Join us on this exciting journey to redefine the way you shop
                  and sell in the digital age. Happy shopping!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="products" className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Featured Products
          </h2>
          <div className="flex justify-center mb-8">
            <button
              className={`px-4 py-2 rounded-md mr-2 ${
                selectedCategory === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md mr-2 ${
                selectedCategory === "pants"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleCategoryChange("pants")}
            >
              Pants
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                selectedCategory === "shirts"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleCategoryChange("shirt")}
            >
              Shirts
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={() => onViewProduct(product)}
                />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>

      {showSelectedProductModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-full max-h-screen max-w-4xl mx-auto overflow-y-auto">
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-8 mx-auto">
                <div className="mx-auto flex flex-wrap">
                  <img
                    alt="ecommerce"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                    src={selectedProduct.imageUrl}
                  />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      NAME : {selectedProduct.productName}
                    </h1>
                    <p className="leading-relaxed">
                      DESCRIPTION : {selectedProduct.productDescription}
                    </p>
                    <p className="leading-relaxed">
                      CATEGORY : {selectedProduct.productCategory}
                    </p>
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        {" "}
                        PRICE : PKR {selectedProduct.productPrice}
                      </span>
                    </div>
                    <button
                      className="flex lg:mt-6 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={() => {
                        setShowSelectedProductModal(false); // Close the selectedProduct modal
                        setShowPaymentForm(true); // Open the PaymentFormModal
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={onCloseModal}
                >
                  Close
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      <footer class="bg-white">
        <div class="container px-6 py-8 mx-auto">
          <div class="flex flex-col items-center text-center">
            <div class="flex flex-wrap justify-center mt-6 -mx-4">
              <a
                href="#home"
                class="mx-4 text-sm text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                {" "}
                Home{" "}
              </a>

              <a
                href="#about"
                class="mx-4 text-sm text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                {" "}
                About{" "}
              </a>

              <a
                href="#products"
                class="mx-4 text-sm text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                Featured Products{" "}
              </a>

              <Link
                to={"/shoe-model"}
                class="mx-4 text-sm text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                Shoe Configurator{" "}
              </Link>

              <Link
                to={"/lady-model"}
                class="mx-4 text-sm text-black transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Reddit"
              >
                Lady Virtual Try On
              </Link>
            </div>
          </div>

          <hr class="my-6 border-teal-400 md:my-10 " />

          <div class="flex flex-col items-center lg:text-center justify-center sm:flex-row sm:justify-between">
            <p class="text-sm text-blue-500 text-center font-bold ">
              © Copyright 2023. OneStopShoppe.
            </p>
          </div>
        </div>
      </footer>
      {showPaymentForm && selectedProduct && (
        <PaymentFormModal
          productId={selectedProduct.id}
          capturedImage={selectedProduct.imageUrl}
          productName={selectedProduct.productName}
          productDescription={selectedProduct.productDescription}
          productCategory={selectedProduct.productCategory}
          productPrice={selectedProduct.productPrice}
          onClose={() => setShowPaymentForm(false)}
          onSubmit={handleOrder}
        />
      )}
    </>
  );
}
