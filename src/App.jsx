import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import ProductDisplay from "./components/ProductDisplay";
import Card404 from "./components/Card404";
import ProductPage from "./components/ProductPage";
import { useEffect } from "react";
import CartView from "./components/CartView";
import SearchViewProduct from "./components/SearchViewPoduct";
import ProductSearch from "./components/ProductSearch";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleConnectionChange = () => {
      if (!navigator.onLine) {
        navigate("/offline");
      }
    };

    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDisplay" element={<ProductDisplay />} />
        <Route path="/offline" element={<Card404 />} />
        <Route path="*" element={<Card404 />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/viewCart" element={<CartView />} />
        <Route path="/searchViewProduct" element={<SearchViewProduct/>} />
        <Route path="/productSearch" element={<ProductSearch/>} />


      </Routes>
    </>
  );
}

export default App;
