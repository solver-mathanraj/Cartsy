import React, { useEffect, useState } from "react";
import { useService } from "../context/ServiceContext";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useCart } from "../context/CartContext";

const truncate = (text, max = 60) =>
  text.length > max ? text.slice(0, max) + "..." : text;

const ProductSearch = () => {
  const { searchData } = useService();
  const [allData, setAllData] = useState([]);
  const location = useLocation();
  const userData = location.state;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.query) {
        const result = await searchData(userData.query);
        setAllData(result);
      } else {
        setAllData(userData.res);
      }
    };

    fetchData();
  }, [userData, searchData]);
 const handleNavigate = (id, title) => {
   navigate("/product", { state: { id, title } });
 };
  return (
    <div>
      <Header />
      <h4 className="m-3 ms-4" style={{ color: "rgb(255, 104, 108)" }}>
        Result: Based on your Choice
      </h4>
      <div className="container mt-4">
        <div className="row">
          {allData && allData.length > 0 ? (
            allData.map((product, index) => {
              if (typeof product !== "object") return null;
              return (
                <div
                  className="col-12 col-sm-6 col-lg-3 mb-4"
                  key={product.id || index}
                >
                  <div className="card h-100 shadow-sm">
                    <img
                      onClick={() => {
                        handleNavigate(product.id, product.title);
                      }}
                      src={product.thumbnail}
                      className="card-img-top object-fit-contain"
                      alt={product.title}
                      style={{ height: "180px", objectFit: "cover",cursor:'pointer' }}
                    />
                    <div className="card-body p-3 d-flex flex-column">
                      <h6 className="card-title">
                        {truncate(product.title, 40)}
                      </h6>
                      <p className="card-text text-muted small mb-2">
                        {truncate(product.description, 60)}
                      </p>
                      <div className="d-flex">
                        <div className="small text-dark mt-auto">
                          <p className="mb-1">
                            <strong>Price:</strong> ₹{Math.ceil(product.price)}
                          </p>
                          <p className="mb-1">
                            <strong>Rating:</strong> {product.rating} ⭐
                          </p>
                          <p className="mb-1">
                            <strong>Status:</strong>{" "}
                            {product.availabilityStatus}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => {
                              addToCart(
                                product.id,
                                product.title,
                                product.price,
                                product.discountPercentage,
                                product.thumbnail,
                                product.stock
                              );
                            }}
                          >
                            {" "}
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No products found for your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
