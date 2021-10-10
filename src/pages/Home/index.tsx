import * as React from "react";
import { CSSTransition } from "react-transition-group";
// import axios from "axios";
// Styles
import { MainStyle } from "./Home.styles";
// Components
import Cart from "components/Cart";
import Banner from "components/Banner";
import CategoryBar from "components/CategoryBar";
import OrderList from "components/OrderList";
import Loading from "components/Loading";

// Context
import { ScreenContext, useScreenDetected } from "contexts/screen";
// import { LoadingContext } from "contexts/loading";

// Helpers
import { classes, handleHtmlScroll } from "helpers";
// Hook

// Services
import restaurantService from "services/restaurantService";
import categoryService from "services/category/categoryService";
import productService from "services/product/productService";

// Types
import { CatType, ProdType } from "types";

const Home = () => {
  const [categories, setCategories] = React.useState<CatType[]>(
    [] as CatType[]
  );
  // eslint-disable-next-line
  const [products, setProducts] = React.useState<ProdType[] | null>(null);
  // const { loading, setLoading } = React.useContext(LoadingContext);
  const [loading, setLoading] = React.useState(true);

  const { isSmallScreen } = React.useContext(ScreenContext);
  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [isOpenQuickViewPopup, setIsOpenQuickViewPopup] = React.useState(false);
  const nodeRef = React.useRef(null);

  const getRestaurant = async () => {
    try {
      const resData = await restaurantService.getByCode();
      console.log("restaurant", resData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    const catData = await categoryService.getAll();
    const prodData = await productService.getAll();

    let cats = catData.data;
    let prods = prodData.data;

    for (let i = 0; i < prods.length; i++) {
      for (let j = 0; j < cats.length; j++) {
        if (!cats[j].products) {
          cats[j].products = [];
        }

        if (prods[i].category_code === cats[j].code) {
          cats[j].products.push(prods[i]);
        }
      }
    }
    setCategories(cats);
    setProducts(prods);
    setLoading(false);

    console.log("categories:", cats);
    console.log("products:", prods);
  };

  const closeAllPopup = () => {
    setIsOpenQuickViewPopup(false);
    setIsOpenInfoPopup(false);

    // enable html scroll
    handleHtmlScroll(false);
  };

  useScreenDetected();

  React.useEffect(() => {
    getRestaurant();
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={loading}
        timeout={300}
        classNames="loading"
        unmountOnExit
      >
        <div ref={nodeRef}>
          <Loading />
        </div>
      </CSSTransition>
      {!loading && (
        <div
          className={classes(
            {
              "small-screen": isSmallScreen,
              "disable-scroll": isOpenInfoPopup,
            },
            "body-wrapper"
          )}
        >
          <div
            className={classes(
              {
                "active-info-popup": isOpenInfoPopup,
                "active-quick-view": isOpenQuickViewPopup,
              },
              "overlay-body"
            )}
            onClick={closeAllPopup}
          ></div>
          <MainStyle>
            <Cart />
            <Banner
              isOpenInfoPopup={isOpenInfoPopup}
              setIsOpenInfoPopup={setIsOpenInfoPopup}
            />
            <section className="main-order">
              <CategoryBar categories={categories} setCatData={setCategories} />
              <OrderList
                categories={categories}
                isOpenQuickViewPopup={isOpenQuickViewPopup}
                setIsOpenQuickViewPopup={setIsOpenQuickViewPopup}
              />
            </section>
          </MainStyle>
        </div>
      )}
    </>
  );
};

export default Home;
