import React, { useEffect, useState } from "react";
import { useService } from "../context/ServiceContext";

const ProductDisplay = () => {
  const { fetchCategory } = useService();

  const [allData, setAllData] = useState({});

  const categoriesArray = [
    ["beauty", ["beauty", "skin-care"]],
    ["fragrances", ["fragrances"]],
    ["furniture", ["furniture", "home-decoration"]],
    ["groceries", ["groceries"]],
    ["kitchen", ["kitchen-accessories"]],
    [
      "electronics",
      ["laptops", "smartphones", "tablets", "mobile-accessories"],
    ],
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

  useEffect(() => {
    const fetchData = async () => {
      const dataMap = {};

      for (const [categoryName, subcategories] of categoriesArray) {
        let categoryProducts = [];

        for (const sub of subcategories) {
          try {
            const response = await fetchCategory(sub);
            if (response) {
              categoryProducts.push(...response);
            }
          } catch (error) {
            console.error(`Error fetching ${sub}:`, error);
          }
        }

        dataMap[categoryName] = categoryProducts;
      }

      setAllData(dataMap);
    };

    fetchData();
  }, []);


  return (
    <div>
      {categoriesArray.map(([categoryName], index) => (
        <div
          key={index}
          className="mx-2 my-4 overflow-hidden"
          style={{ height: "330px" }}
        >
          <h3 className="ms-3">{categoryName.toUpperCase()}</h3>
          <div
            className="product-grid"
            style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
          >
            {allData[categoryName]?.map((product, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  width: "200px",
                  height: "280px",
                  overflow: "auto",
                }}
              >
                <img
                  src={product.thumbnail}
                  alt="Responsive image"
                  className="img-fluid"
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div>
                  <p style={{height:'40px'}}>{product.title}</p>
                  <button className="btn btn-outline-primary">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
