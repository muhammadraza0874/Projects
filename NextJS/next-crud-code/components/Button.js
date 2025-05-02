import React from "react";

function Button(props) {
  const { type, label, id, cssClass } = props;
  return (
    <>
      <button type={type} id={id} className={cssClass}>
        {label}
      </button>
    </>
  );
}

export default Button;
