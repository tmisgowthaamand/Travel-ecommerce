import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import RentalsPage from "./pages/RentalsPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:destination" element={<DestinationsPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/experiences/:category" element={<ExperiencesPage />} />
          <Route path="/rentals" element={<RentalsPage />} />
          <Route path="/rentals/:id" element={<RentalsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
