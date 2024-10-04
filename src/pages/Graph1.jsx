import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { useData } from "../contexts/DataContext";

// Import and register required components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale, // For the x-axis (categories)
  LinearScale, // For the y-axis (linear values)
  BarElement, // For bar chart rendering
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loader from "../components/Loader";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph1 = () => {
  const { data, fetchData } = useData();
  const [chartData, setChartData] = useState(null);
  const [timeFrame, setTimeFrame] = useState("day"); // State for selected time frame

  const calculateAverages = (data, timeframe) => {
    const groupedData = data.reduce((acc, item) => {
      let timePeriod;
      if (timeframe === "day") {
        timePeriod = moment(item.start_time).format("YYYY-MM-DD");
      } else if (timeframe === "week") {
        timePeriod = moment(item.start_time).format("YYYY-[W]W");
      } else {
        // month
        timePeriod = moment(item.start_time).format("YYYY-MM");
      }
      if (!acc[timePeriod]) {
        acc[timePeriod] = { totalMBRT: 0, count: 0 };
      }
      acc[timePeriod].totalMBRT += item.mbrt;
      acc[timePeriod].count += 1;
      return acc;
    }, {});

    return Object.keys(groupedData).map((period) => ({
      period,
      avgMBRT: groupedData[period].totalMBRT / groupedData[period].count,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const averages = calculateAverages(data, timeFrame);
      const labels = averages.map((entry) => entry.period);
      const averageValues = averages.map((entry) => entry.avgMBRT);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Average MBRT",
            data: averageValues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data, timeFrame]); // Update chart when time frame changes

  return (
    <div className="m-4">
      <h1>Average MBRT</h1>
      <div className="d-flex gap-2 mt-4">
        <button
          onClick={() => setTimeFrame("day")}
          className={`btn ${
            timeFrame === "day" ? "btn-primary" : ""
          } border border-4 border-primary`}
        >
          Day
        </button>
        <button
          onClick={() => setTimeFrame("week")}
          className={`btn ${
            timeFrame === "week" ? "btn-danger" : ""
          } border border-4 border-danger`}
        >
          Week
        </button>
        <button
          onClick={() => setTimeFrame("month")}
          className={`btn ${
            timeFrame === "month" ? "btn-success" : ""
          } border border-4 border-success`}
        >
          Month
        </button>
      </div>

      {chartData ? (
        <div style={{ overflowX: "scroll" }} className="w-100 mt-3">
          <div style={timeFrame === "day" ? { width: "3000px" } : {}}>
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
                      text: "Average MBRT",
                    },
                    min: 0,
                    max: 2000, // Fixed max value
                    ticks: {
                      stepSize: 100, // Adjusted step size for ticks
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text:
                        timeFrame === "month"
                          ? "Month"
                          : timeFrame === "week"
                          ? "Week"
                          : "Date",
                    },
                    ticks: {
                      autoSkip: false, // Ensure all ticks (labels) are shown
                      maxTicksLimit: 103, // Limit to the expected number of data points
                      maxRotation: 45, // Rotate labels by 45 degrees
                      minRotation: 45, // Minimum rotation for better readability
                    },
                  },
                },
              }}
              height={400} // Set the height of the chart
            />
          </div>
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default Graph1;
