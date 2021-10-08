import * as React from "react";
// Styles
import { OrderListStyle } from "./OrderList.styles";
import image from "assets/images/shop-2_large.jpg";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
// Helper
import { classes } from "helpers";
// Types
import { CatType } from "types";

type CatProps = {
  categories: CatType[];
};
type PopupProps = {
  isOpenQuickViewPopup: boolean;
  setIsOpenQuickViewPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderList = ({
  categories,
  isOpenQuickViewPopup,
  setIsOpenQuickViewPopup,
}: CatProps & PopupProps) => {
  const showHideQuickView = (value: boolean) => {
    setIsOpenQuickViewPopup(value);
  };

  return (
    <OrderListStyle className="order-list-block">
      <div className="container">
        <div className="order-list">
          {categories.map((category) => (
            <div
              className="meals-group"
              key={category.code}
              data-meal-anchor-id={category.code}
            >
              <div className="meals-group-category">
                <div className="cat-bg"></div>
                <div className="cat-title">{category.name}</div>
              </div>
              <div className="product-list">
                {category.products.map((product) => (
                  <div className="product-box" key={product.code}>
                    <div className="product-link">
                      <div className="product-img">
                        <img src={image} alt="product" />
                      </div>
                      <div className="product-details">
                        <div className="product-title">
                          <span
                            className="row-title"
                            onClick={() => {
                              showHideQuickView(true);
                            }}
                          >
                            <span> {product.name} </span>
                            <span className="quick-view icon-info">
                              <IoInformationCircleOutline />
                            </span>
                          </span>
                        </div>
                        <div className="product-introduction">
                          {product.descrition}
                        </div>
                        <div className="product-price">{product.price} €</div>
                      </div>
                      <div className="add-to-cart">
                        <span className="icon-cart-plus">
                          <FaCartPlus />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className={classes(
            { open: isOpenQuickViewPopup },
            "product-quick-view"
          )}
        >
          <div
            className="close-quick-view"
            onClick={() => {
              showHideQuickView(false);
            }}
          >
            <span className="icon-cross">
              <CgClose />
            </span>
          </div>
          <div className="quick-view-modal">
            <div className="product-img">
              <img src={image} alt="product" />
            </div>
            <div className="product-details">
              <h4 className="product-title">Chicken Soup</h4>
              <div className="product-description">
                <p>
                  Nam tempus turpis at metus scelerisque placerat nulla
                  deumantos solicitud felis. Pellentesque diam dolor, elementum
                  etos lobortis des mollis ut risus. Sedcus faucibus an
                  sullamcorper mattis drostique des commodo pharetras
                  loremos.Donec pretium egestas sapien et mollis. Lorem ipsum
                  dolor sit amet Sonsectetur...
                </p>
                <ul>
                  <li>Lorem impsum</li>
                  <li>Lorem impsum lorem</li>
                  <li>Lorem impsum</li>
                  <li>Lorem impsum lorem</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrderListStyle>
  );
};

export default OrderList;
