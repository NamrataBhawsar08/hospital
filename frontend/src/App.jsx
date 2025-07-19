import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./pages/Home";
import CancelAppointment from "./components/CancelAppointment";
import BookAppointment from "./components/Bookappointment";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cancel-appointment" element={<CancelAppointment />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/bookdetail/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
