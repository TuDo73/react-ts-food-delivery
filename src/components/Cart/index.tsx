import React, { useState, useEffect, useContext } from "react";
// Styles
import { CartStyle } from "./Cart.styles";
import { IoMdClose } from "react-icons/io";
import image from "assets/images/shop-2_large.jpg";
import { ImPencil } from "react-icons/im";
import { ImBin } from "react-icons/im";
import { ImCart } from "react-icons/im";
// Helpers
import { classes, handleBodyScroll, isInViewport } from "helpers";
// Context
import { ScreenContext } from "contexts/screen";

const Cart = () => {
  const initialCartList = [
    {
      id: 1,
      name: "Chicken Soup 1",
      price: 4.35,
      quantity: 1,
      note: "",
    },
    {
      id: 2,
      name: "Chicken Soup 2",
      price: 4.35,
      quantity: 1,
      note: "",
    },
    {
      id: 3,
      name: "Chicken Soup 3",
      price: 4.35,
      quantity: 1,
      note: "",
    },
    {
      id: 4,
      name: "Chicken Soup 4",
      price: 4.35,
      quantity: 1,
      note: "",
    },
    {
      id: 5,
      name: "Chicken Soup 5",
      price: 4.35,
      quantity: 1,
      note: "",
    },
    {
      id: 6,
      name: "Chicken Soup 6",
      price: 4.35,
      quantity: 1,
      note: "",
    },
  ];

  const [cartList] = useState(initialCartList);
  const [selectedNoteItem, setSelectedNoteItem] = useState<number | null>(null);
  const [isShowCart, setIsShowCart] = useState(false);
  const [heightCart, setHeightCart] = useState("");
  const { isSmallScreen } = useContext(ScreenContext);

  const showHideProductNote = (id: number | null) => {
    setSelectedNoteItem(id);
  };

  const showHideCartDevice = (value: boolean) => {
    setIsShowCart(value);
    handleBodyScroll(value);
  };

  useEffect(() => {
    const calculateCartHeight = () => {
      if (!isSmallScreen) {
        let footer = document.querySelector("footer")!;
        let topFooter = footer.getBoundingClientRect().top;
        let calHeight = window.innerHeight - topFooter;
        if (isInViewport(footer)) {
          setHeightCart(`calc(100vh - ${calHeight}px)`);
        } else {
          setHeightCart("");
        }
      }
    };

    window.addEventListener("scroll", calculateCartHeight);

    return () => {
      window.removeEventListener("scroll", calculateCartHeight);
    };
  }, [isSmallScreen]);

  return (
    <CartStyle>
      <div className="cart-wrapper">
        <div className="cart-device" onClick={() => showHideCartDevice(true)}>
          <div className="cart-device-box">
            <div className="cart-icon-wrap">
              <div className="cart-icon">
                <span className="icon-cart">
                  <ImCart />
                </span>
                <span className="cart-numb">1</span>
              </div>
            </div>
            <div className="cart-device-text">
              <span className="text-title">Cart </span>
              <span className="cart-total">(10.00 €)</span>
            </div>
          </div>
        </div>
        <div
          className={classes({ show: isShowCart }, "shopping-cart-bar")}
          style={{ height: heightCart }}
        >
          <div className="shopping-cart-data">
            <h4>
              Shopping Cart
              <span onClick={() => showHideCartDevice(false)}>
                <IoMdClose />
              </span>
            </h4>
            <div className="has-data">
              <ul className="summary-list">
                {cartList.map((item) => (
                  <li className="summary-list-item" key={item.id}>
                    <div className="item-wrap">
                      <div className="item-img">
                        <img src={image} alt="product" />
                      </div>
                      <div className="item-details">
                        <div className="row-detail item-name">{item.name}</div>
                        <div className="row-detail item-method">
                          <div className="quantity-number">
                            <div className="quantity-btn dec-btn">
                              <span>-</span>
                              <div className="overlay-btn"></div>
                            </div>
                            <div className="quantity-input">
                              {item.quantity}
                            </div>
                            <div className="quantity-btn inc-btn">
                              <span>+</span>
                              <div className="overlay-btn"></div>
                            </div>
                          </div>
                          <div
                            className="note-btn"
                            onClick={() => {
                              showHideProductNote(item.id);
                            }}
                          >
                            <ImPencil />
                          </div>
                          <div className="delete-item">
                            <ImBin />
                          </div>
                        </div>
                        <div className="row-detail item-total-price">
                          <span>{item.price} €</span>
                        </div>
                        <div className="note-text">{item.note}</div>
                        {selectedNoteItem === item.id && (
                          <div className="note-detail">
                            <fieldset>
                              <legend>Add note</legend>
                              <textarea
                                cols={0}
                                rows={3}
                                maxLength={160}
                                className="note-textarea"
                                placeholder='E.g. "Without onions"'
                              ></textarea>
                            </fieldset>
                            <div className="note-detail-button">
                              <span
                                className="button-item cancel-btn"
                                onClick={() => {
                                  showHideProductNote(null);
                                }}
                              >
                                Cancel
                              </span>
                              <span className="button-item save-btn">Save</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total">
                <div className="total-col">
                  <span>Sub-total</span>
                  <span>18.35 €</span>
                </div>
                <div className="total-col">
                  <span>Delivery costs</span>
                  <span>4.35 €</span>
                </div>
                <div className="total-col total-price">
                  <span>Total</span>
                  <span>30.00 €</span>
                </div>
              </div>
              <div className="cart-rule">
                You have reached the minimum order amount of 30.00 € to
                checkout.
              </div>
            </div>
            <div className="shopping-cart-action">
              <div className="action-btn btn-checkout">Checkout</div>
            </div>
          </div>
        </div>
      </div>
    </CartStyle>
  );
};

export default Cart;
