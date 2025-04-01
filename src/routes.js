import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loading from "./page/loading";
import Login from "./page/login";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Loading />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
