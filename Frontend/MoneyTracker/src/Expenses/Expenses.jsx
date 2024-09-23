import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../context/globalContext";
import IncomeItem from "../components/IncomeItem";
import ExpenseForm from "./ExpenseForm";

function Expenses() {
  const { expenses, getExpense, deleteExpense, totalExpense } =
    useGlobalContext();

  useEffect(() => {
    getExpense();
  }, []);

  return (
    <ExpenseStyled>
      <h1>Expenses</h1>
      <TotalExpense>
        Total Expense: <span>${totalExpense()}</span>
      </TotalExpense>
      <ExpenseContent>
        <FormContainer>
          <ExpenseForm />
        </FormContainer>
        <ExpensesContainer>
          <AnimatePresence>
            {expenses.map((expense) => (
              <motion.div
                key={expense._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IncomeItem
                  id={expense._id}
                  title={expense.title}
                  description={expense.description}
                  amount={expense.amount}
                  date={expense.date}
                  type={expense.type}
                  category={expense.category}
                  indicatorColor="#ff0000"
                  deleteItem={deleteExpense}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </ExpensesContainer>
      </ExpenseContent>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #fff;
  }
`;

const TotalExpense = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 0, 0, 0.2);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  gap: 0.5rem;
  span {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ff0000;
  }
`;

const ExpenseContent = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
`;

const ExpensesContainer = styled.div`
  flex: 2;
`;

export default Expenses;
