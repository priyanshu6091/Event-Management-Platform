import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful");
      setRedirect(true);
    } catch (e) {
      setError("Registration failed. Try again.");
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-8 flex flex-col md:flex-row"
      >
        {/* Left Side - Welcome Message */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to</h2>
          <img src="../src/assets/logo1.webp" alt="Logo" className="w-48 my-4" />
          <img src="../src/assets/signuppic.svg" alt="Signup" className="w-full" />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold text-blue-600 text-center">Sign Up</h1>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

          <form className="mt-6 space-y-4" onSubmit={registerUser}>
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                className="input-field"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs absolute right-2 bottom-1">Passwords do not match</p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg shadow-md w-full hover:bg-blue-700 transition"
            >
              Create Account
            </button>

            {/* Alternative Actions */}
            <div className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>

            {/* Back Button */}
            <Link to={"/"} className="flex justify-center">
              <button className="text-gray-600 flex items-center gap-2 hover:text-blue-600 transition">
                ← Back to Home
              </button>
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
