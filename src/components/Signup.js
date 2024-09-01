import React, { useState } from "react";
import axios from "axios";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

export default function Signup(props) {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});


  const validateForm = () => {
    const errors = {};
    if (!fname.trim()) {
      errors.fname = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(fname)) {
      errors.fname = "First name should contain only alphabets";
    }
    
    if (!lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(lname)) {
      errors.lname = "Last name should contain only alphabets";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!userType) {
      errors.userType = "User type is required";
    }
   
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setFormErrors({ ...formErrors, userType: "" });
  };

  const formData = {
    fname,
    lname,
    email,
    password,
    address,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        const formDataWithUserType = { ...formData, userType };
        await axios.post("http://localhost:9000/signup", formDataWithUserType);
        window.location.href = "/verify-otp" ; // Assuming signup is successful, navigate to the login page
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="font-mono py-4 h-screen min-h-screen">
        <div className="container mx-auto ">
          <div className="flex justify-center px-6 ">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex my-6 ">
              <img
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                src={logo}
                alt="signup"
              />

              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => {
                          setFName(e.target.value);
                          setFormErrors({ ...formErrors, fname: "" });
                        }}
                      />
                      {formErrors.fname && (
                        <p className="text-red-500 text-xs italic">
                          {formErrors.fname}
                        </p>
                      )}
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => {
                          setLName(e.target.value);
                          setFormErrors({ ...formErrors, lname: "" });
                        }}
                      />
                      {formErrors.lname && (
                        <p className="text-red-500 text-xs italic">
                          {formErrors.lname}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setFormErrors({ ...formErrors, email: "" });
                      }}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="userType"
                    >
                      Sign up as:
                    </label>
                    <select
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="userType"
                      onChange={handleUserTypeChange}
                    >
                      <option value="">Select an option</option>
                      <option value="seller">Seller</option>
                      <option value="buyer">Buyer</option>
                    </select>
                    {formErrors.userType && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.userType}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        current-password=""
                        onChange={(e) => {
                        setPassword(e.target.value);
                        setFormErrors({ ...formErrors, password: "" });
                        }}
                        />
                        {formErrors.password && (
                        <p className="text-red-500 text-xs italic">
                        {formErrors.password}
                        </p>
                        )}
                        </div>
                        <div className="md:ml-2">
                        <label
                                             className="block mb-2 text-sm font-bold text-gray-700"
                                             htmlFor="c_password"
                                           >
                        Address
                        </label>
                        <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type="text"
                        placeholder="city / state / zip code"
                        onChange={(e) => {
                        setAddress(e.target.value);
                        setFormErrors({ ...formErrors, address: "" });
                        }}
                        />
                        {formErrors.address && (
                        <p className="text-red-500 text-xs italic">
                        {formErrors.address}
                        </p>
                        )}
                        </div>
                        </div>
                        <div className="mb-6 text-center">
                <button
                  className="bg-gray-900 w-full px-4 py-2 font-bold text-white  rounded-full hover:bg-red-400 focus:outline-none focus:shadow-outline"
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
              <hr className="mb-6 border-t" />

              <div className="text-center">
                <Link
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  to={"/login"}
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</>
);
}
                        
                        
