import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Verify(props) {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isVerified, setIsVerified] = useState(false); // New state variable

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!otp.trim()) {
      errors.otp = "OTP is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResendOTP = async () => {
    if (!email.trim()) {
      setFormErrors({ email: "Email is required" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/resend-otp", {
        email,
      });
      console.log(response.data);
      // Display a success message or visual indicator to the user
    } catch (error) {
      console.log(error);
      // Handle the error and display an appropriate message to the user
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const otpData = { email, otp };
        const response = await axios.post(
          "http://localhost:9000/verify",
          otpData
        );
        console.log(response.data);
        setIsVerified(true); // Update the verification status
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          setFormErrors({ ...formErrors, otp: error.response.data.message });
        } else {
          setFormErrors({
            ...formErrors,
            otp: "An error occurred during OTP verification. Please try again.",
          });
        }
      }
    }
  };

  // Redirect to login page if verification is complete
  useEffect(() => {
    if (isVerified) {
      navigate("/login");
    }
  }, [isVerified, navigate]);


  return (
    <>
     {!isVerified && (
        <section className="font-mono py-4 h-screen min-h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center px-6">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex my-6">
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h2>OTP Verification</h2>
                <p>
                 Check your email inbox that you used to signup if you didn't receive an otp code type email below and click resesnd otp
                </p>
                <form>
                  <div className="mb-4 flex">
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-l shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                   <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-52 h-10 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleResendOTP}
                  >
                    Resend Otp
                  </button>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="otp"
                    >
                      OTP
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => {
                        setOTP(e.target.value);
                        setFormErrors({ ...formErrors, otp: "" });
                      }}
                    />
                    {formErrors.otp && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.otp}
                      </p>
                    )}
                  </div>

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmitOTP}
                  >
                    Verify OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
      
    </>
  );
}
