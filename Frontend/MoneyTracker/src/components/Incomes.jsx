import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../context/globalContext";
import Form from "./Form";
import IncomeItem from "./IncomeItem";

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <IncomeStyled>
      <h1>Incomes</h1>
      <TotalIncome>
        Total Income: <span>${totalIncome()}</span>
      </TotalIncome>
      <IncomeContent>
        <FormContainer>
          <Form />
        </FormContainer>
        <IncomesContainer>
          <AnimatePresence>
            {incomes.map((income) => (
              <motion.div
                key={income._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IncomeItem
                  id={income._id}
                  title={income.title}
                  description={income.description}
                  amount={income.amount}
                  date={income.date}
                  type={income.type}
                  category={income.category}
                  indicatorColor="#00ff00"
                  deleteItem={deleteIncome}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </IncomesContainer>
      </IncomeContent>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #fff;
  }
`;

const TotalIncome = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 255, 0, 0.2);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  gap: 0.5rem;
  span {
    font-size: 2.5rem;
    font-weight: 800;
    color: #00ff00;
  }
`;

const IncomeContent = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
`;

const IncomesContainer = styled.div`
  flex: 2;
`;

export default Income;
