import React from "react";
import styled from "styled-components";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../utils/Icons";
import Button from "./Button/Button";
import { dateFormat } from "../utils/dateFormat";

const IncomeItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) => {
  const getCategoryIcon = () => {
    const icons = {
      salary: money,
      freelancing: freelance,
      investments: stocks,
      stocks: users,
      bitcoin: bitcoin,
      other: piggy,
      bank: card,
      youtube: yt,
      education: book,
      groceries: food,
      health: medical,
      subscriptions: tv,
      takeaways: takeaway,
      clothing: clothing,
      travelling: freelance,
      default: circle,
    };
    return type === "expense" ? icons[category] || icons.default : icons[category] || "";
  };

  return (
    <StyledIncomeItem indicator={indicatorColor}>
      <div className="icon">{getCategoryIcon()}</div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment} {description}
            </p>
          </div>
          <div className="btn-cont">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color)"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </StyledIncomeItem>
  );
};

const StyledIncomeItem = styled.div`
  background: linear-gradient(135deg, #fcf6f9, #e0e0e0);
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #222260;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.15);
  }

  .icon {
    width: 90px;
    height: 90px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    transition: background 0.3s ease;

    &:hover {
      background: #e0e0e0;
    }

    i {
      font-size: 2.8rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h5 {
      font-size: 1.4rem;
      padding-left: 2rem;
      position: relative;
      font-weight: bold;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        align-items: center;
        gap: 2rem;

        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.9;
          font-size: 1rem;
        }
      }
    }
  }
`;

export default IncomeItem;


