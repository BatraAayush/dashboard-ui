import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useData } from "../contexts/DataContext";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import Loader from "../components/Loader";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const Graph2 = () => {
  const { data, fetchData } = useData();
  const [chartData, setChartData] = useState(null);

  const calculatePeakTime = (data) => {
    const peakTimeData = data.reduce((acc, item) => {
      const time = moment(item.start_time).format("YYYY-MM-DD HH:00");
      if (!acc[time]) {
        acc[time] = 0;
      }
      acc[time] += 1;
      return acc;
    }, {});

    return Object.keys(peakTimeData).map((time) => ({
      time,
      usage: peakTimeData[time],
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const peakTimeData = calculatePeakTime(data);
      const labels = peakTimeData.map((entry) => entry.time);
      const usageValues = peakTimeData.map((entry) => entry.usage);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Device Usage",
            data: usageValues,
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.3,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="m-4">
      <h1>Peak Time Analysis</h1>
      <p className="fs-5">You can Zoom In and Zoom Out for detailed analysis</p>

      {chartData ? (
        <div style={{ overflowX: "scroll" }} className="mt-3">
          <div style={{ width: "300rem" }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Time",
                    },
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 50,
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Number of Devices Used",
                    },
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                      callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                  },
                  zoom: {
                    pan: {
                      enabled: true,
                      mode: "x",
                    },
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      drag: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                    },
                  },
                },
              }}
              height={400}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Graph2;
