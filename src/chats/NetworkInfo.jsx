import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const NetworkInfo = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [speedHistory, setSpeedHistory] = useState([]);
  const chartRef = useRef(null);

  const testFileUrl = "/path/to/test/file.bin"; // Replace with the URL of your test file
  const testFileSize = 1024 * 1024 * 100; // 100 MB test file size
  const updateInterval = 1000; // Update interval in milliseconds (e.g., 1 second)

  const startSpeedTest = async () => {
    setIsTestRunning(true);
    setSpeedHistory([]);
    const intervalId = setInterval(async () => {
      try {
        const startTime = performance.now();
        const response = await fetch(testFileUrl);
        const endTime = performance.now();
        const downloadTime = endTime - startTime;
        const speed = (testFileSize * 8) / downloadTime / 1000000; // Mbps
        setDownloadSpeed(speed);
        setSpeedHistory((prevHistory) => {
          const newHistory = [...prevHistory, speed];
          return newHistory.length > 15 ? newHistory.slice(-15) : newHistory;
        });
      } catch (error) {
        console.error("Speed test error:", error);
        clearInterval(intervalId);
        setIsTestRunning(false);
      }
    }, updateInterval);
  };

  const stopSpeedTest = () => {
    setIsTestRunning(false);
  };

  useEffect(() => {
    if (chartRef.current) {
      const chartData = {
        labels: Array.from({ length: speedHistory.length }, () => ` `),
        datasets: [
          {
            data: speedHistory,
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 0.3,
            pointRadius: 1,
          },
        ],
      };

      const chartConfig = {
        type: "line",
        data: chartData,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          animation: {
            duration: 1,
          },
          scales: {
            y: {
              display: false,
            },
          },
        },
      };

      const chart = new Chart(chartRef.current, chartConfig);
      return () => chart.destroy();
    }
  }, [speedHistory]);

  useEffect(() => {
    return () => {
      stopSpeedTest();
    };
  }, []);

  return (
    <div>
      <button onClick={startSpeedTest} disabled={isTestRunning}>
        {isTestRunning ? "Stop Test" : "Start Test"}
      </button>
      <div className="w-3/4">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default NetworkInfo;
