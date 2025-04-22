import React from "react";
import axios from "axios";
import ServiceContext from "../context/ServiceContext.jsx";

const Api = ({ children }) => {
  async function searchData(query) {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      return response.data.products;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchCategory(category) {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}?limit=5`
      );
      return response.data.products;
    } catch (error) {
      if(!response.data.products){
        console.error("Error fetching data:", error);
      }
    }
  }

  async function fetchTitle() {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      <ServiceContext.Provider
        value={{ searchData, fetchCategory, fetchTitle }}
      >
        {children}
      </ServiceContext.Provider>
    </div>
  );
};

export default Api;
