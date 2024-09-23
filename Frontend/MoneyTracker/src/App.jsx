import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "./context/globalContext";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard";
import Expenses from "./Expenses/Expenses";
import Incomes from "./components/Incomes";
import History from "./components/History";

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <History />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled>
      <MainWrapper>
        <Navigation active={active} setActive={setActive} />
        <ContentArea>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {displayData()}
            </motion.div>
          </AnimatePresence>
        </ContentArea>
      </MainWrapper>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: linear-gradient(120deg, #2980b9, #8e44ad);
  color: white;
  overflow: hidden;
`;

const MainWrapper = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.25rem;
  }
`;

export default App;
