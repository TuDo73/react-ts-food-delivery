import { useState, useEffect } from "react";
// API
// import API from "./API";
import categoryService from "./categoryService";
// Context
// import { LoadingContext } from "contexts/loading";
// const BASE_PATH = `md_category`;

export const useCategoryService = () => {
  const [categories, setCategories] = useState(undefined);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);
  // const { setLoading } = useContext(LoadingContext);

  const getCategories = async () => {
    try {
      // const url = `${BASE_PATH}/selectall?restaurant_code=${"RES0001"}`;
      // const result = await API.get(`${url}`);
      const result = await categoryService.getAll();
      setCategories(result.data);
      console.log("categories:", result.data);
    } catch (error) {
      setError(error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return { categories, error, setCategories };
};
