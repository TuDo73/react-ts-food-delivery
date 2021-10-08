import React, { useContext } from "react";
// Components

// Context
import { ScreenContext, useScreenDetected } from "contexts/screen";
// Helper
import { classes } from "helpers";

const Payment = () => {
  const { isSmallScreen } = useContext(ScreenContext);
  useScreenDetected();

  return (
    <div className={classes({ "small-screen": isSmallScreen }, "body-wrapper")}>
      <div className="container">
        <h1>Payment</h1>
        <span></span>
      </div>
    </div>
  );
};

export default Payment;
