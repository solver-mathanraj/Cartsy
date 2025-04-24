import React, { useEffect, useState } from "react";
import { useService } from "../context/ServiceContext";
import { useCart } from "../context/CartContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import AutoCarousel from "./AutoCarousel";

const categoriesArray = [
  ["beauty", ["beauty", "skin-care"]],
  ["fragrances", ["fragrances"]],
  ["furniture", ["furniture", "home-decoration"]],
  ["groceries", ["groceries"]],
  ["kitchen", ["kitchen-accessories"]],
  ["electronics", ["laptops", "smartphones", "tablets", "mobile-accessories"]],
  ["mens", ["mens-shirts", "mens-shoes", "mens-watches"]],
  [
    "womens",
    [
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
  ],
  ["sports", ["sports-accessories"]],
  ["eyewear", ["sunglasses"]],
  ["vehicles", ["motorcycle", "vehicle"]],
];


  
const ProductCard = ({ product, onClick, onAddToCart }) => (
  <div
    style={{
      padding: "8px",
      width: "200px",
      height: "280px",
      overflow: "auto",
    }}
  >
    <img
      src={product.thumbnail}
      alt={product.title}
      onClick={onClick}
      className="img-fluid"
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        cursor: "pointer",
      }}
    />
    <div>
      <p style={{ height: "40px" }}>{product.title}</p>
      <button
        onClick={onAddToCart}
        className="btn btn-outline-primary text-center"
      >
        Add to cart
      </button>
    </div>
  </div>
);

const ProductDisplay = () => {
  const { fetchCategory } = useService();
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  const handleNavigate = (id, title) => {
    navigate("/product", { state: { id, title } });
  };



  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const dataMap = {};

        await Promise.all(
          categoriesArray.map(async ([categoryName, subcategories]) => {
            const results = await Promise.all(
              subcategories.map((sub) =>
                fetchCategory(sub).catch((err) => {
                  console.error(`Error fetching ${sub}:`, err);
                  return [];
                })
              )
            );
            dataMap[categoryName] = results.flat();
          })
        );

        setAllProducts(dataMap);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);



 

  if (loading) return (
    <div className=" min-vh-100 d-flex  justify-content-center align-items-center">
      <Loader />
    </div>
  );

  return (
    <div>
      {!loading && <AutoCarousel />}

      {categoriesArray.map(([categoryName]) => (
        <div
          key={categoryName}
          className="mx-2 my-4 overflow-hidden"
          style={{ height: "330px" }}
        >
          <h3 className="ms-3">{categoryName.toUpperCase()}</h3>
          <div
            className="productss-grid"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "space-evenly",
              border: "none",
            }}
          >
            {allProducts[categoryName]?.length ? (
              allProducts[categoryName].map((product, i) => (
                <ProductCard
                  key={i}
                  product={product}
                  onClick={() => handleNavigate(product.id, product.title)}
                  onAddToCart={() =>
                    addToCart(
                      product.id,
                      product.title,
                      product.price,
                      product.discountPercentage,
                      product.thumbnail,
                      product.stock
                    )
                  }
                />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
