import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import SearchPage from "../pages/SearchPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default AppRoutes;