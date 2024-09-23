import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useGlobalContext } from "../context/globalContext";
import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const { addIncome, getIncomes } = useGlobalContext();
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    getIncomes();
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <h2>Add New Income</h2>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Income Title"
          onChange={handleInput("title")}
          required
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="number"
          name="amount"
          placeholder="Income Amount"
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
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">YouTube</option>
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
        <button type="submit">Add Income</button>
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
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
        border-color: #00c851;
        box-shadow: 0 0 5px rgba(0, 200, 81, 0.2);
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
      background: #00c851;
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #009f3c;
        transform: scale(1.05);
      }
    }
  }
`;

export default Form;
