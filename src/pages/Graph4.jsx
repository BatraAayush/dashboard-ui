import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useData } from "../contexts/DataContext";
import Loader from "../components/Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph4 = () => {
  const { data, fetchData } = useData(); // Fetch data from context
  const [chartData, setChartData] = useState(null);
  const [isStacked, setIsStacked] = useState(true);

  const [selectedDevice, setSelectedDevice] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to parse the JSON data in data_extra
  const parseDataExtra = (data) => {
    return data.map((item) => {
      const extraData = JSON.parse(item.data_extra);
      return {
        device: item.device,
        start_time: new Date(item.start_time),
        w1: Number(extraData["1"]) || 0,
        w2: Number(extraData["2"]) || 0,
        f1: Number(extraData["3"]) || 0,
        f2: Number(extraData["4"]) || 0,
        l1: Number(extraData["5"]) || 0,
        l2: Number(extraData["6"]) || 0,
        complete: Number(extraData["7"]) || 0, // This can be optional
      };
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to apply filters to the parsed data
  const applyFilters = (parsedData) => {
    let filteredData = parsedData;

    if (selectedDevice !== "All") {
      filteredData = filteredData.filter((item) => item.device === selectedDevice);
    }

    if (startDate) {
      filteredData = filteredData.filter((item) => new Date(item.start_time) >= new Date(startDate));
    }

    if (endDate) {
      filteredData = filteredData.filter((item) => new Date(item.start_time) <= new Date(endDate));
    }

    return filteredData;
  };

  // Function to reset filters
  const resetFilters = () => {
    setSelectedDevice("All");
    setStartDate("");
    setEndDate("");
  };

  // Update chart data when new data is fetched or filters change
  useEffect(() => {
    if (data && data.length > 0) {
      const parsedData = parseDataExtra(data);
      const filteredData = applyFilters(parsedData);

      const labels = filteredData.map((entry) => entry.device);
      const datasets = [
        {
          label: "Weight 1 (w1)",
          data: filteredData.map((entry) => entry.w1),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Weight 2 (w2)",
          data: filteredData.map((entry) => entry.w2),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
          label: "Force 1 (f1)",
          data: filteredData.map((entry) => entry.f1),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
        {
          label: "Force 2 (f2)",
          data: filteredData.map((entry) => entry.f2),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Length 1 (l1)",
          data: filteredData.map((entry) => entry.l1),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
        {
          label: "Length 2 (l2)",
          data: filteredData.map((entry) => entry.l2),
          backgroundColor: "rgba(255, 159, 64, 0.6)",
        },
        {
          label: "Completion Status",
          data: filteredData.map((entry) => entry.complete),
          backgroundColor: "rgba(201, 203, 207, 0.6)",
        },
      ];

      setChartData({ labels, datasets });
    }
  }, [data, selectedDevice, startDate, endDate]);

  // Render component
  return (
    <div className="m-4">
      <h1>Device Success Rate Breakdown</h1>

      {/* Filters */}
      <div className="d-flex gap-3 mb-4">
        <div>
          <label>Device:</label>
          <select
            className="form-select"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            <option value="All">All</option>
            {/* You can dynamically generate device options if needed */}
            {data && [...new Set(data.map((item) => item.device))].map((device, idx) => (
              <option key={idx} value={device}>
                {device}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Reset Filters Button */}
        <div className="d-flex align-items-end">
          <button onClick={resetFilters} className="btn btn-secondary">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Chart Toggle Buttons */}
      <div className="d-flex gap-2 mt-4">
        <button
          onClick={() => setIsStacked(true)}
          className={`btn ${isStacked ? "btn-primary" : ""} border border-4 border-primary`}
        >
          Stacked Chart
        </button>
        <button
          onClick={() => setIsStacked(false)}
          className={`btn ${!isStacked ? "btn-danger" : ""} border border-4 border-danger`}
        >
          Grouped Chart
        </button>
      </div>

      {/* Chart */}
      {chartData ? (
        <div style={{ overflowX: "scroll" }} className="w-100 mt-3">
          <div style={{ width: "30000px" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Values",
                    },
                  },
                  x: {
                    stacked: isStacked, // Use the isStacked state
                    title: {
                      display: true,
                      text: "Devices",
                    },
                    barPercentage: 0.7, // Adjust bar width
                    categoryPercentage: 0.5, // Adjust space between bars
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom", // Keep the legend at the bottom
                    align: "start", // Align legend to the left
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || "";
                        const value = context.raw;
                        return `${label}: ${value}`;
                      },
                    },
                  },
                },
              }}
              height={400} // Set the height of the chart
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Graph4;
