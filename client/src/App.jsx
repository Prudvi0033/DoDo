import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Notes from './pages/Notes';
import { useAuthStore } from './stote/useAuthStore';
import { Loader } from 'lucide-react';

const App = () => {
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen bg-black'>
        <span className='animate-spin'><Loader size={40} /></span>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={authUser ? <Navigate to="/notes" /> : <Register />} />
        <Route path='/login' element={authUser ? <Navigate to="/notes" /> : <Login />} />
        <Route path='/notes' element={authUser ? <Notes /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;
