import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/globalContext";
import Button from "../components/Button/Button";
import { plus } from "../utils/Icons";

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Expense Title"
          onChange={handleInput("title")}
          required
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="number"
          name="amount"
          placeholder="Expense Amount"
          onChange={handleInput("amount")}
          required
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Select Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, date })}
          required
        />
      </div>
      <div className="input-control">
        <select
          value={category}
          name="category"
          onChange={handleInput("category")}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Description"
          onChange={handleInput("description")}
          rows="3"
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name="Add Expense"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent)"
          color="#fff"
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #222260;
    text-align: center;
  }

  .error {
    color: red;
    text-align: center;
    margin-bottom: 1rem;
  }

  .input-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input,
    select,
    textarea {
      padding: 0.75rem 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f9f9f9;
      color: #333;

      &:focus {
        border-color: #ff4444;
        box-shadow: 0 0 5px rgba(255, 68, 68, 0.2);
        background: #fff;
      }
    }

    input[type="number"] {
      -moz-appearance: textfield; /* Hide number input arrows */
    }

    select {
      appearance: none;
      background: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
        no-repeat right 1rem center;
      background-size: 10px;
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      padding: 0.75rem 2rem;
      background: #ff4444;
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #cc0000;
        transform: scale(1.05);
      }
    }
  }
`;

export default ExpenseForm;
