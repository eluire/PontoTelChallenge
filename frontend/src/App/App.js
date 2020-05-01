import React from "react";
import Nav from "../Templates/Nav/Nav";
import Routes from "../Routes";
import Footer from "../Templates/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
