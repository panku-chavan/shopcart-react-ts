import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../custom-hooks/reduxHook";
import { setLoading, setError, registerWithEmail } from "../../redux/feature/authSlice";
import { RootState } from "../../redux/store/store";
import logo from '../../assets/logo_transparent.png';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {  loading, error, isNavigate } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (isNavigate) {
      navigate('/login');
    }
  }, [isNavigate]);

  // Handle registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    if (!email || !password || !confirmPassword || !firstName || !lastName || !mobileNumber) {
      dispatch(setError("All fields are required"));
      return;
    }

    // Basic Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      dispatch(setError("Please enter a valid email address"));
      return;
    }

    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      dispatch(setError("Please enter a valid 10-digit mobile number"));
      return;
    }

    dispatch(setLoading(true));
    try {
      await dispatch(registerWithEmail(email, password,firstName,lastName,mobileNumber));
      // Add any additional steps for saving user details like firstName, lastName, and mobileNumber in the database
    } catch (err: any) {
      dispatch(setError(err.message || "Registration failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="border border-gray-400 rounded-md m-10 p-5 md:w-[50%] w-full mx-auto">
        <h1 className="text-xl font-bold text-slate-600 text-center">Register User</h1>
        <div className="flex justify-center items-center mt-2">
          <img className="w-32 md:w-48" src={logo} alt="logo" />
        </div>

        {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        <div className="mt-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
