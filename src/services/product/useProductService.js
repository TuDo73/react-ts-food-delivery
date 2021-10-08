import { useState, useEffect } from "react";
// API
// import API from "./API";
import productService from "./productService";
// Context
// import { LoadingContext } from "contexts/loading";
// const BASE_PATH = `md_category`;

export const useProductService = () => {
  const [products, setProducts] = useState(undefined);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);
  // const { setLoading } = useContext(LoadingContext);

  const getProducts = async () => {
    try {
      // const url = `${BASE_PATH}/selectall?restaurant_code=${"RES0001"}`;
      // const result = await API.get(`${url}`);
      const result = await productService.getAll();
      setProducts(result.data);
      console.log("products:", result.data);
    } catch (error) {
      setError(error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return { products, error, setProducts };
};
