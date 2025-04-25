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
      width: "250px",
      minWidth: "200px",
      height: "300px",
      overflow: "hidden",
      border: "1px solid #eee",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <img
      src={product.thumbnail}
      alt={product.title}
      onClick={onClick}
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    />
    <div>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          margin: "6px 0",
          height: "38px",
          overflow: "hidden",
        }}
      >
        {product.title}
      </p>
      <div className="d-flex align-items-center ">
        <div>
          <p style={{ fontSize: "13px", margin: "0" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="#2cf304"
                d="M8 3h10l-1 2h-3.26c.48.58.84 1.26 1.05 2H18l-1 2h-2a5.56 5.56 0 0 1-4.8 4.96V14h-.7l6 7H13l-6-7v-2h2.5c1.76 0 3.22-1.3 3.46-3H7l1-2h4.66C12.1 5.82 10.9 5 9.5 5H7z"
              />
            </svg>
            &nbsp;{Math.ceil(product.price)}
          </p>
          <p style={{ fontSize: "13px", margin: "0" }}>
            ⭐&nbsp;{product.rating}
          </p>
          <p style={{ fontSize: "13px", marginBottom: "6px" }}>
            Stock:&nbsp;{product.stock}
          </p>
        </div>
        <div style={{ display: "grid", placeContent: "center", width: "100%" }}>
          <button onClick={onAddToCart} className="btn btn-outline-primary">
            Add&nbsp;to&nbsp;cart
          </button>
        </div>
      </div>
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
 const getCategoryDetails=async (category)=>{
  const res = await fetchCategory(category);
   navigate("/productSearch", { state: { res } });
 }


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
          style={{
            maxHeight: "330px",
          }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <h3 className="ms-3">{categoryName.toUpperCase()}</h3>
            </div>
            <div className="text-primary fw-bold me-3" style={{cursor:'pointer',userSelect:'none'}} onClick={()=>{getCategoryDetails(categoryName);}}>
              Show more
            </div>
          </div>
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
