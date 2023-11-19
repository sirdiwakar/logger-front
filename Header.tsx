import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <h3
          style={{
            color: "white",
            textAlign: "center",
            margin: "5px",
            padding: "5px",
          }}
        >
          Query You Logs Here
        </h3>
      </div>
    </>
  );
};

export default Header;
