import React, { useState } from "react";
import { auth, googleProvider } from "../../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password Signup
  const signupUser = async () => {
    if (!email || !password) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Signup Successful!");
      navigate("/tasks"); // redirect to tasks after signup
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // Google Signup/Login
  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("✅ Google Signup Successful!");
      navigate("/tasks");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-center text-green-700 mb-6">
           Create an Account
        </h2>

        {/* Email Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Password Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Signup Button */}
        <button
          onClick={signupUser}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Sign Up
        </button>

        {/* Google Signup Button */}
        <button
          onClick={signupWithGoogle}
          className="w-full mt-3 flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 rounded-md transition duration-300 shadow-sm"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Redirect to Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
