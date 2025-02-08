import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useContext(UserContext);

  //! Fetch remembered credentials
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPass = localStorage.getItem("rememberedPass");
    if (storedEmail) {
      setEmail(storedEmail);
      setPassword(storedPass);
    }
  }, []);

  //! Handle Login
  async function loginUser(ev) {
    ev.preventDefault();

    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login success");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPass", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPass");
      }

      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-8 flex flex-col md:flex-row"
      >
        {/* Left Side - Welcome Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <img src="../src/assets/logo1.webp" alt="Logo" className="w-48 my-4" />
          <img src="../src/assets/signinpic.svg" alt="Sign In" className="w-full" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold text-blue-600 text-center">Sign In</h1>

          <form className="mt-6 space-y-4" onSubmit={loginUser}>
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <Link to="/forgotpassword" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg shadow-md w-full hover:bg-blue-700 transition"
            >
              Sign In
            </button>

            {/* Sign Up & Back Button */}
            <div className="text-center text-gray-600 text-sm">
              New here?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create an account
              </Link>
            </div>

            <Link to="/" className="flex justify-center">
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
