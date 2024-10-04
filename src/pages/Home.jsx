import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="m-4 d-flex flex-column gap-3">
      <h2>
        Welcome to <strong>Device Dashbord</strong>
      </h2>
      <div className="d-flex flex-column gap-2">
        <p className="fs-5">
          You can analyse data in pictorial form here with the following graphs
        </p>
        <ul className="list-group">
          <button className="list-group-item d-flex align-items-center gap-2" onClick={() => navigate('/graph-1')}>
            <span className="fw-bold">Graph 1:</span>
            <span>Daily Average MBRT</span>
          </button>
          <button className="list-group-item d-flex align-items-center gap-2" onClick={() => navigate('/graph-2')}>
            <span className="fw-bold">Graph 2:</span>
            <span>Peak Time Analysis</span>
          </button>
          <button className="list-group-item d-flex align-items-center gap-2" onClick={() => navigate('/graph-3')}>
            <span className="fw-bold">Graph 3:</span>
            <span>Average Time per Device</span>
          </button>
          <button className="list-group-item d-flex align-items-center gap-2" onClick={() => navigate('/graph-4')}>
            <span className="fw-bold">Graph 4:</span>
            <span>Device Success Rate Breakdown</span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Home;
