import React from "react";

const Loader = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '40vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
