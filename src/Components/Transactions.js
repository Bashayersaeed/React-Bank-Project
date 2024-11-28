import React, { useState, useEffect } from "react";
import axios from "axios";
import { deposit, transactions } from "../API/auth";
import { useQuery } from "@tanstack/react-query";

const Transactions = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [error, setError] = useState(null);

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["Transaction"],
    queryFn: transactions,
  });

  const [filters, setFilters] = useState({
    all: true,
    deposit: false,
    withdraw: false,
    transfer: false,
    byDate: false,
  });
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setFilters({
        all: false,
        deposit: false,
        withdraw: false,
        transfer: false,
        byDate: false,
      });
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked,
      }));
    }
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };
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

  const transList = data?.map((trans) => {
    const { type, amount, createdAt } = trans;
    const { color } = getStyles(type);
    const dateOnly = createdAt.split("T")[0];
    let operation;

    if (type === "deposit") {
      operation = `+${amount}`;
    } else {
      operation = `-${amount}`;
    }

    return (
      <div className="Trans-Op" >
        
          <div style={{color:color}}>{operation}</div>
          <div>{dateOnly}</div>
            <div>{type}</div>
        
      </div>
    );
  });

  return (
    <div className="Trans-Page">
      <div className="Trans-Container">
        <div className="Trans-Search-Box">
          <input type="text" name="Search" placeholder="Search" />
          <button>Search</button>
        </div>
        <div className="Trans-Filter">
          <h4>Filter:</h4>
          <label className="Container-Label">
            All
            <input
              type="checkbox"
              name="all"
              checked={filters.all}
              onChange={handleCheckboxChange}
            />
            <span class="checkmark"></span>
          </label>
          <label className="Container-Label">
            Deposit
            <input
              type="checkbox"
              name="deposit"
              checked={filters.deposit}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="Container-Label">
            Withdraw
            <input
              type="checkbox"
              name="withdraw"
              checked={filters.withdraw}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="Container-Label">
            Transfer
            <input
              type="checkbox"
              name="transfer"
              checked={filters.transfer}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="Container-Label">
            By Date
            <input
              type="checkbox"
              name="byDate"
              checked={filters.byDate}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="Select-Date">
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
          />
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
          />
        </div>
        <div className="Trans-Details">{transList}</div>
      </div>
    </div>
  );
};

export default Transactions;

// <h1>My Transactions</h1>
//       <ul>
//         {data?.map((transaction) => {
//           const { id, type, amount } = transaction;
//           const { color, icon } = getStyles(type);

//           return (
//             <li>
//               <span>{icon}</span>
//               <span style={{ color: color }}>
//                 {type.toUpperCase()}: ${amount}
//               </span>
//             </li>
//           );
//         })}
//       </ul>
