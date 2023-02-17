import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../pages/Admin/Admin';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default RoutesApp;
