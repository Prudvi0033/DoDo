import React, { useState } from 'react';
import { EyeIcon, EyeOff, Key, Loader, User } from 'lucide-react';
import { useAuthStore } from '../stote/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import GridComponent from '../components/GridComponent';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isRegistering, register } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error('Username is required');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      await register(formData);
    }
  };

  return (
    <div className="flex items-center justify-center text-white h-screen bg-black overflow-hidden montserrat">
      <div className="absolute inset-0 z-0">
        <GridComponent />
      </div>
      <form onSubmit={handleRegister} className="flex rounded-lg flex-col gap-3 p-10 px-16 bg-zinc-700 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 backdrop-saturate-50 backdrop-contrast-100">

        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-2xl font-semibold">Join Us!</h1>
          <p className="mb-4 text-sm font-light text-gray-400">Create an account to start writing</p>
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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <div className="flex items-center gap-2 input input-bordered">
            <Key size={18} strokeWidth={1} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full outline-none bg-transparent"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}  // ✅ Added missing state update
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button
          className="text-md text-white btn glass bg-purple-500"
          disabled={isRegistering}
        >
          {isRegistering ? <Loader className="animate-spin" /> : "Register"}
        </button>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Register;
