import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDisplay from "./components/ProductDisplay";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDisplay" element={<ProductDisplay />} />
      </Routes>
    </>
  );
}

export default App;
