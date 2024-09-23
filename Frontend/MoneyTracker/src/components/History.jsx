import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../context/globalContext";

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const HistoryStyled = styled(GlassCard)`
  h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
  }

  .transactions {
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.6);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
  }

  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .type {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
      text-transform: uppercase;

      &.income {
        background: rgba(0, 255, 0, 0.3);
        color: #00ff00;
      }

      &.expense {
        background: rgba(255, 0, 0, 0.3);
        color: #ff0000;
      }
    }

    .title {
      flex: 1;
      margin: 0 1rem;
      font-weight: 500;
      color: #fff; // Ensure text is readable
    }

    .amount {
      font-weight: bold;
      color: #fff; // Ensure amount is readable
    }
  }
`;

function History() {
  const { transactionHistory } = useGlobalContext();
  const history = transactionHistory() || []; // Ensure default array if undefined

  return (
    <HistoryStyled>
      <h2>Recent Transactions</h2>
      <div className="transactions">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={item._id || index}
              className="transaction-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={`type ${item.type}`}>{item.type}</span>
              <span className="title">{item.title}</span>
              <span className="amount">
                {item.type === "expense" ? "-" : "+"}
                {item.amount}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </HistoryStyled>
  );
}

export default History;
