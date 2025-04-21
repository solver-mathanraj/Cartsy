// src/context/ServiceContext.js
import { createContext, useContext } from "react";

// Create the context
const ServiceContext = createContext();

// Custom hook to use the context
export const useService = () => useContext(ServiceContext);

// Export the context itself
export default ServiceContext;
