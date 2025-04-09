import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import Loading from "./page/loading"; // Loading page
import Login from "./page/login"; // Login page
import Layout from "./page/layout"; // Import Layout component

const AppRoutes = () => (
  <Routes>
      {/* Route for Loading page */}
      <Route path="/" element={<Loading />} />

      {/* Route for Login page */}
      <Route path="/login" element={<Login />} />

      {/* Main Layout for the application */}
      <Route path="/layout/*" element={<Layout />} />
  </Routes>
);

export default AppRoutes;
