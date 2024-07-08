import React from "react";

const CustomLeftNav = (onClick, disabled) => (
  <button
    type="button"
    className="image-gallery-custom-nav"
    style={{ display: "none" }} // Hide the button
    onClick={onClick}
    disabled={disabled}
  >
    ◀
  </button>
);

const CustomRightNav = (onClick, disabled) => (
  <button
    type="button"
    className="image-gallery-custom-nav"
    style={{ display: "none" }} // Hide the button
    onClick={onClick}
    disabled={disabled}
  >
    ▶
  </button>
);

export { CustomLeftNav, CustomRightNav };
