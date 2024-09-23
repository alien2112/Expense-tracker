import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

// Registering the required components for Chart.js
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  // Formatting the data for the Line chart
  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: "Income",
        data: incomes.map((income) => income.amount),
        borderColor: "#00c851",
        backgroundColor: "rgba(0, 200, 81, 0.3)",
        pointBackgroundColor: "#00c851",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00c851",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        borderColor: "#ff4444",
        backgroundColor: "rgba(255, 68, 68, 0.3)",
        pointBackgroundColor: "#ff4444",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#ff4444",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart options for better UX
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "#f5f5f5",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#666",
        },
      },
    },
  };

  return (
    <ChartStyled>
      <Line data={data} options={options} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #f0f4f8;
  border: 4px solid #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;

  canvas {
    max-height: 300px; /* Ensures the chart doesn't overflow */
  }
`;

export default Chart;
