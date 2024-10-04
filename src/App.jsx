import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Graph1 from "./pages/Graph1";
import Graph2 from "./pages/Graph2";
import Graph3 from "./pages/Graph3";
import Graph4 from "./pages/Graph4";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph-1" element={<Graph1 />} />
          <Route path="/graph-2" element={<Graph2 />} />
          <Route path="/graph-3" element={<Graph3 />} />
          <Route path="/graph-4" element={<Graph4 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
