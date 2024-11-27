import React, { useState, useEffect } from "react";
import axios from "axios";
import { transactions } from "../API/auth";
import { useQuery } from "@tanstack/react-query";

const Transactions = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [error, setError] = useState(null);

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["Transaction"],
    queryFn: transactions,
  });

  const getStyles = (type) => {
    switch (type) {
      case "deposit":
        return { color: "green" };
      case "withdraw":
        return { color: "red" };
      case "transfer":
        return { color: "red" };
      default:
        return { color: "black" };
    }
  };

  return (
    <div>
      <h1>My Transactions</h1>
      <ul>
        {data?.map((transaction) => {
          const { id, type, amount } = transaction;
          const { color, icon } = getStyles(type);

          return (
            <li>
              <span>{icon}</span>
              <span style={{ color: color }}>
                {type.toUpperCase()}: ${amount}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Transactions;
