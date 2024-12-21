import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../custom-hooks/reduxHook";
import { setLoading, setError, loginWithEmail } from "../../redux/feature/authSlice";
import { RootState } from "../../redux/store/store";
import logo from '../../assets/logo_transparent.png';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error, isNavigate } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isNavigate) {
      navigate('/');
    }
  }, [isNavigate]);

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      dispatch(setError("Both fields are required"));
      return;
    }

    // Basic Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      dispatch(setError("Please enter a valid email address"));
      return;
    }

    dispatch(setLoading(true));
    try {
      await dispatch(loginWithEmail(email, password));
    } catch (err: any) {
      dispatch(setError(err.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="border border-gray-400 rounded-md m-10 p-5 md:w-[50%] w-full mx-auto">
        <h1 className="text-xl font-bold text-slate-600 text-center">Login</h1>
        <div className="flex justify-center items-center mt-2">
          <img className="w-32 md:w-48" src={logo} alt="logo" />
        </div>

        {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        <div className="mt-4">
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
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
