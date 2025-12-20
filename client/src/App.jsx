import React from "react";
import Queue from "./components/Queue";
import Service from "./components/Service.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/service" element={<Service />} />
        </Routes>
        <div className="bg-black h-screen flex flex-col items-center justify-center">
          <Queue />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
