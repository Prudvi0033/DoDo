import React, { useState } from 'react'
import { EyeIcon, EyeOff, Key, Loader, User } from 'lucide-react'
import { useAuthStore } from '../stote/useAuthStore'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import GridComponent from '../components/GridComponent';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingIn, authUser, login } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error('Email is required');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      await login(formData);
    }
  };

  return (
    <div className='flex items-center justify-center text-white h-screen bg-black overflow-hidden montserrat '>
      <div className="absolute inset-0 z-0">
        <GridComponent />
      </div>
      <form onSubmit={handleLogin} className='flex rounded-lg flex-col gap-3 p-10 bg-zinc-700 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 backdrop-saturate-50 backdrop-contrast-100 '>

        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-2xl font-semibold">Welcome Back!</h1>
          <p className="mb-4 text-sm font-light text-gray-400">Login to continue your Writings</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <div className="flex items-center gap-2 input input-bordered">
            <User size={18} strokeWidth={1} />
            <input
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="uchiha@00"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="flex items-center gap-2 input input-bordered">
            <Key size={18} strokeWidth={1} />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full outline-none bg-transparent"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button
          className='text-md text-white btn glass bg-purple-500'
          disabled={isLoggingIn}
        >
          {isLoggingIn ? <Loader className="animate-spin" /> : "Login"}
        </button>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Login;
