import React, { useEffect, useState } from "react";
import { Bar, Line, Scatter } from "react-chartjs-2";
import { useData } from "../contexts/DataContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loader from "../components/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Graph3 = () => {
  const { data, fetchData } = useData();
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar");

  const calculateAverageTimePerDevice = (data) => {
    const averageTimeData = data.reduce((acc, item) => {
      const device = item.device;
      const mbrtValue = item.mbrt;

      if (!acc[device]) {
        acc[device] = { total: 0, count: 0 };
      }
      acc[device].total += mbrtValue;
      acc[device].count += 1;
      return acc;
    }, {});

    return Object.keys(averageTimeData).map((device) => ({
      device,
      avgTime: averageTimeData[device].total / averageTimeData[device].count,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const averageTimeData = calculateAverageTimePerDevice(data);
      const labels = averageTimeData.map((entry) => entry.device);
      const averageTimes = averageTimeData.map((entry) => entry.avgTime);

      const scatterData = averageTimeData.map((entry, index) => ({
        x: index,
        y: entry.avgTime,
      }));

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Average Time per Device",
            data: chartType === "scatter" ? scatterData : averageTimes,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data, chartType]);

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <Bar data={chartData} options={getChartOptions()} height={400} />
        );
      case "line":
        return (
          <Line data={chartData} options={getChartOptions()} height={400} />
        );
      case "scatter":
        return (
          <Scatter data={chartData} options={getChartOptions()} height={400} />
        );
      default:
        return (
          <Bar data={chartData} options={getChartOptions()} height={400} />
        );
    }
  };

  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Devices",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Average MBRT",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  });

  return (
    <div className="m-4">
      <h1>Average Time per Device</h1>
      <div className="d-flex gap-2 mt-4">
        <button
          onClick={() => setChartType("bar")}
          className={`btn ${
            chartType === "bar" ? "btn-primary" : ""
          } border border-4 border-primary`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("line")}
          className={`btn ${
            chartType === "line" ? "btn-danger" : ""
          } border border-4 border-danger`}
        >
          Line Chart
        </button>
        <button
          onClick={() => setChartType("scatter")}
          className={`btn ${
            chartType === "scatter" ? "btn-success" : ""
          } border border-4 border-success`}
        >
          Scatter Chart
        </button>
      </div>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        {chartData ? renderChart() : <Loader />}
      </div>
    </div>
  );
};

export default Graph3;
