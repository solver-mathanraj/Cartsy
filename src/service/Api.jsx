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

  async function fetchAllData() {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/"
      );
      return response.data.products;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      <ServiceContext.Provider value={{ searchData, fetchAllData}}>
        {children}
      </ServiceContext.Provider>
    </div>
  );
};

export default Api;

