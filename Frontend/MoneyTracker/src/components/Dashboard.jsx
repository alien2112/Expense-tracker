import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../context/globalContext";
import Button from "./Button/Button";
import Chart from "./Chart/Chart";
import History from "./History"; // Ensure History is correctly imported
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
  }
`;

const NeonText = styled.span`
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0ff,
    0 0 35px #0ff, 0 0 40px #0ff, 0 0 50px #0ff, 0 0 75px #0ff;
`;

function Dashboard() {
  const {
    totalIncome,
    totalExpense,
    totalBalance,
    getIncomes,
    getExpense,
    incomes,
    expenses,
    transactionHistory,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);

  // Handling possible empty array scenarios
  const minIncome =
    incomes.length > 0 ? Math.min(...incomes.map((item) => item.amount)) : 0;
  const maxIncome =
    incomes.length > 0 ? Math.max(...incomes.map((item) => item.amount)) : 0;
  const minExpense =
    expenses.length > 0 ? Math.min(...expenses.map((item) => item.amount)) : 0;
  const maxExpense =
    expenses.length > 0 ? Math.max(...expenses.map((item) => item.amount)) : 0;

  return (
    <DashboardStyled>
      <div className="header">
        <h1>
        Dashboard
        </h1>
        {/* <div className="actions">
          <Button name="Add Income" icon="+" onClick={} primary />
          <Button name="Add Expense" icon="-" onClick={} />
        </div> */}
      </div>

      <div className="stats">
        <GlassCard className="stat-card">
          <h3>Total Balance</h3>
          <p className="amount">
            ${totalBalance()}
          </p>
        </GlassCard>
        <GlassCard className="stat-card">
          <h3>Total Income</h3>
          <p className="amount positive">${totalIncome()}</p>
        </GlassCard>
        <GlassCard className="stat-card">
          <h3>Total Expense</h3>
          <p className="amount negative">${totalExpense()}</p>
        </GlassCard>
      </div>

   
       <div className="chart-container">
        <GlassCard>
          <h2>
          Income vs Expense
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <Chart />
          </ResponsiveContainer>
        </GlassCard>
      </div> 

      <div className="bottom-section">
        <GlassCard className="history-section">
          <History />
        </GlassCard>
        <GlassCard className="summary-section">
         Summary
          <div className="summary-item">
            <h3>Income Range</h3>
            <p>Min: ${minIncome}</p>
            <p>Max: ${maxIncome}</p>
          </div>
          <div className="summary-item">
            <h3>Expense Range</h3>
            <p>Min: ${minExpense}</p>
            <p>Max: ${maxExpense}</p>
          </div>
        </GlassCard>
      </div>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  min-height: 100vh;
  background: linear-gradient(45deg, #0f0c29, #302b63, #24243e);
  color: #fff;
  padding: 2rem;
  font-family: "Roboto", sans-serif;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      color: #0ff; // Neon color for the header
      text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .stat-card {
      text-align: center;

      h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #fff;
      }

      .amount {
        font-size: 2.5rem;
        font-weight: bold;

        &.positive {
          color: #00f2fe;
        }
        &.negative {
          color: #ff9a9e;
        }
      }
    }
  }

  .chart-container {
    margin-bottom: 2rem;
  }

  .bottom-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;

    .summary-section {
      .summary-item {
        margin-bottom: 1rem;

        h3 {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: #0ff; // Neon color for summary titles
          text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .bottom-section {
      grid-template-columns: 1fr;
    }
  }
`;

export default Dashboard;
