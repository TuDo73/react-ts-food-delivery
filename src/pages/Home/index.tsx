import * as React from "react";
import { CSSTransition } from "react-transition-group";
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
// Helpers
import { classes, handleHtmlScroll } from "helpers";
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
  const [products, setProducts] = React.useState<ProdType[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { isSmallScreen } = React.useContext(ScreenContext);
  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [isOpenQuickViewPopup, setIsOpenQuickViewPopup] = React.useState(false);
  const nodeRef = React.useRef(null);

  const getRestaurant = async () => {
    try {
      const resData = await restaurantService.getByCode();
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    const catData = await categoryService.getAll();
    const prodData = await productService.getAll();

    let cats: CatType[] = catData.data;
    let prods: ProdType[] = prodData.data;

    cats.map((category) => {
      const product = prods.filter(
        (product) => product.category_code === category.code
      );

      if (product) {
        category.products = product;
      }
      return category;
    });

    setCategories(cats);
    setProducts(prods);
    setLoading(false);
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
