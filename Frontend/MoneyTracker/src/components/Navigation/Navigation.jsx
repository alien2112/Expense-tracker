import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaChartPie,
  FaHistory,
  FaPlus,
  FaMinus,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  { id: 1, title: "Dashboard", icon: <FaChartPie /> },
  { id: 2, title: "History", icon: <FaHistory /> },
  { id: 3, title: "Incomes", icon: <FaPlus /> },
  { id: 4, title: "Expenses", icon: <FaMinus /> },
];

function Navigation({ active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavStyled isOpen={isOpen}>
      <MenuToggle onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </MenuToggle>
      <UserInfo>
        <UserAvatar src="/path-to-your-avatar.jpg" alt="Your Photo" />
        <UserText>
          <h2>Your Name</h2>
          <p>Your Money</p>
        </UserText>
      </UserInfo>
      <MenuItems>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setIsOpen(false);
            }}
            className={active === item.id ? "active" : ""}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {item.icon}
              <span>{item.title}</span>
            </motion.div>
          </MenuItem>
        ))}
      </MenuItems>
      <SignOut>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <FaSignOutAlt /> Sign Out
        </motion.div>
      </SignOut>
    </NavStyled>
  );
}

const NavStyled = styled(motion.nav)`
  width: 250px;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? "0" : "-250px")};
    z-index: 100;
  }
`;

const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 101;
  }

  span {
    height: 3px;
    width: 25px;
    background: white;
    margin-bottom: 4px;
    border-radius: 2px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
`;

const UserText = styled.div`
  h2 {
    font-size: 1.2rem;
    color: white;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const MenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const MenuItem = styled.li`
  margin-bottom: 0.5rem;

  div {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 12px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &.active div {
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;
  }

  svg {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const SignOut = styled.div`
  div {
    display: flex;
    align-items: center;
    color: #ff6b6b;
    cursor: pointer;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 107, 107, 0.1);
    }

    svg {
      margin-right: 1rem;
      font-size: 1.2rem;
    }
  }
`;

export default Navigation;
