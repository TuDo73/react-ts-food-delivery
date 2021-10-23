import * as React from "react";
import { useHistory } from "react-router-dom";
// Components
import Cart from "components/Cart";
import Banner from "components/Banner";
// Styles
import { MainStyle } from "./Payment.styles";
import { IoIosArrowBack } from "react-icons/io";
import { BsClockFill } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";
import { BsChevronDown } from "react-icons/bs";
import image from "assets/images/ta-cash.svg";
import image2 from "assets/images/payment_61.png";
// Context
import { ScreenContext, useScreenDetected } from "contexts/screen";
// Helper
import { classes, handleHtmlScroll } from "helpers";
// Hooks
import useCalculateCartHeight from "hooks/useCalculateCartHeight";

const Payment = () => {
  const { isSmallScreen } = React.useContext(ScreenContext);

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [isOpenDeliveryPopup, setIsOpenDeliveryPopup] = React.useState(false);
  const [isOpenPaymentPopup, setIsOpenPaymentPopup] = React.useState(false);
  const [shipMethod, setShipMethod] = React.useState("delivery");
  const [isInCheckout, setIsInCheckout] = React.useState(true);
  const { calculateCartHeight } = useCalculateCartHeight();
  let history = useHistory();

  const closeAllPopup = () => {
    setIsOpenInfoPopup(false);
    setIsOpenDeliveryPopup(false);
    setIsOpenPaymentPopup(false);

    // enable html scroll
    handleHtmlScroll(false);
  };

  const backToOrder = () => {
    history.push("/");
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShipMethod(e.target.value);
    setTimeout(() => {
      calculateCartHeight();
    }, 100);
  };

  const showHideDeliveryPopup = (value: boolean) => {
    setIsOpenDeliveryPopup(value);
  };

  const showHidePaymentPopup = (value: boolean) => {
    setIsOpenPaymentPopup(value);
  };

  useScreenDetected();

  return (
    <>
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
              "active-delivery-popup": isOpenDeliveryPopup,
              "active-payment-popup": isOpenPaymentPopup,
            },
            "overlay-body"
          )}
          onClick={closeAllPopup}
        ></div>
        <MainStyle>
          <Cart isInCheckout={isInCheckout} />
          <Banner
            isOpenInfoPopup={isOpenInfoPopup}
            setIsOpenInfoPopup={setIsOpenInfoPopup}
          />
          <section className="main-checkout">
            <div className="container">
              <h2>
                <span className="checkout-heading">Checkout</span>
                <div className="back">
                  <div className="back-btn" onClick={backToOrder}>
                    <span className="back-icon icon-navigate_before">
                      <IoIosArrowBack />
                    </span>
                    <span>Back</span>
                  </div>
                </div>
              </h2>
              <div className="shipping-methods">
                <div className="shipping-select-wrap">
                  <h4>Shipping methods</h4>
                  <select
                    className="shipping-select"
                    value={shipMethod}
                    onChange={(e) => handleChangeSelect(e)}
                  >
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </div>
              </div>
              <div className="shipping-info-form">
                {shipMethod === "delivery" && (
                  <div className="delivery-address">
                    <h4>Delivery Address</h4>
                    <div className="form-list">
                      <div className="form-item">
                        <div className="form-heading">Street name</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type street name"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">House number</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type house number"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">Postcode</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type your postal code"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">City</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type your city"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">Entrance (optional)</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type entrance"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">Floor (optional)</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type floor number"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">Door (optional)</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type door"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">
                          Company name (optional)
                        </div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="Type company name"
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="form-heading">Add note (optional)</div>
                        <div className="wrap-input">
                          <input
                            className="form-input"
                            type="text"
                            placeholder="ie: Please don't ring the bell. Baby is sleeping."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="personal-details">
                  <h4>Personal Details</h4>
                  <div className="form-list">
                    <div className="form-item">
                      <div className="form-heading">First and last name</div>
                      <div className="wrap-input">
                        <input
                          className="form-input"
                          type="text"
                          placeholder="Type your first and last name"
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <div className="form-heading">E-mail</div>
                      <div className="wrap-input">
                        <input
                          className="form-input"
                          type="text"
                          placeholder="youremail@email.com"
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <div className="form-heading">Phone Number</div>
                      <div className="wrap-input">
                        <input
                          className="form-input"
                          type="text"
                          placeholder="Type your phone number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="checkout-row delivery-time"
                onClick={() => {
                  showHideDeliveryPopup(true);
                }}
              >
                <div className="row-content">
                  <span className="col-icon icon-clock">
                    <BsClockFill />
                  </span>
                  <div className="col-content">
                    <h5>Delivery time</h5>
                    <p>11:00</p>
                  </div>
                  <div className="row-icon">
                    <div className="row-icon-wrap">
                      <span className="icon-checkmark">
                        <ImCheckmark />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="checkout-row pay-with"
                onClick={() => {
                  showHidePaymentPopup(true);
                }}
              >
                <div className="row-content">
                  <img src={image} alt="icon" />
                  <div className="col-content">
                    <h5>Pay with</h5>
                    <p>Cash</p>
                  </div>
                  <div className="row-icon">
                    <div className="row-icon-wrap">
                      <span className="icon-checkmark">
                        <ImCheckmark />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-rule">
                By clicking on ORDER & PAY WITH CASH you agree with the contents
                of the shopping cart, the data you filled out
              </div>
              <div className="order-btn">Order & pay with Cash (30.00 €)</div>
            </div>
            <div
              className={classes(
                { open: isOpenDeliveryPopup },
                "checkout-popup delivery-popup"
              )}
            >
              <div className="popup-content">
                <h3 className="popup-heading">
                  Delivery time
                  <div
                    className="close-popup"
                    onClick={() => {
                      showHideDeliveryPopup(false);
                    }}
                  >
                    <span className="icon-close"></span>
                  </div>
                </h3>
                <div className="popup-content-wrap">
                  <div className="select-wrap">
                    <select className="delivery-time-select">
                      <option>As soon as possible</option>
                      <option>12:00</option>
                      <option>13:00</option>
                      <option>14:00</option>
                      <option>15:00</option>
                      <option>16:00</option>
                    </select>
                    <span className="icon-chevron-down">
                      <BsChevronDown />
                    </span>
                  </div>
                  <div className="popup-action">
                    <div className="popup-btn">Done</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classes(
                { open: isOpenPaymentPopup },
                "checkout-popup payment-popup"
              )}
            >
              <div className="popup-content">
                <h3 className="popup-heading">
                  Payment methods
                  <div
                    className="close-popup"
                    onClick={() => {
                      showHidePaymentPopup(false);
                    }}
                  >
                    <span className="icon-close"></span>
                  </div>
                </h3>
                <div className="popup-content-wrap">
                  <div className="payment-methods-box">
                    <div className="method-opt">
                      <img src={image} alt="icon" />
                      <p>Cash</p>
                      <span className="icon-checkmark">
                        <ImCheckmark />
                      </span>
                    </div>
                    <div className="method-opt">
                      <img src={image2} alt="icon" />
                      <p>Card</p>
                    </div>
                  </div>
                  <div className="popup-action">
                    <div className="popup-btn">Done</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </MainStyle>
      </div>
    </>
  );
};

export default Payment;
