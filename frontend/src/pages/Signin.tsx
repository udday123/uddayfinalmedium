import { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
export function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  async  function sendrequest(data:typeof formData){
    try{
      await axios.post(`${BACKEND_URL}/api/v1/user/signin`, data);
      
      navigate("/blogs");
    } catch (error) {
      alert("User dosen't exist")
      console.error("Signup error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendrequest(formData)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-900">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
        {/* Card Header */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white">Sign in</h3>
          <p className="text-sm text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Card Content */}
          <div className="p-6 pt-0 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full h-10 rounded-md border border-gray-600 bg-gray-700 px-3 text-sm text-white focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-gray-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full h-10 rounded-md border border-gray-600 bg-gray-700 px-3 text-sm text-white focus:ring-2 focus:ring-blue-500"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center w-full h-10 border border-gray-600 rounded-md bg-gray-700 text-white hover:bg-gray-600"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Card Footer */}
          <div className="p-6 pt-0 space-y-4">
            <button type="submit" className="w-full h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign in
            </button>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}