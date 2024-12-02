import React, { useState, useEffect } from "react";
import axios from "axios";
import { deposit, transactions } from "../API/auth";
import { useQuery } from "@tanstack/react-query";

const Transactions = () => {
  const [transaction, setTransaction] = useState([]);

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["Transaction"],
    queryFn: transactions,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [applySearch, setApplySearch] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState(data);
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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setFilters({
        all: false,
        deposit: false,
        withdraw: false,
        transfer: false,
        byDate: false,
        [name]: true,
      });
    }
      setApplySearch(false);
      setSearchQuery("");
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

  const handleSearchClick = () => {
    setApplySearch(true);
    const filtered = data?.filter((trans) => {
      const { type, amount } = trans;
      const isSearchValid =
        searchQuery === "" ||
        amount.toString().includes(searchQuery) ||
        type.toLowerCase().includes(searchQuery.toLowerCase());
      return isSearchValid;
    });

    setFilteredTransactions(filtered);
  };

  const filtered = data?.filter((trans) => {
    const { type, createdAt } = trans;
    const transactionDate = createdAt.split("T")[0];

    const isTypeValid =
      filters.all ||
      (filters.deposit && type === "deposit") ||
      (filters.withdraw && type === "withdraw") ||
      (filters.transfer && type === "transfer") ||
      (filters.byDate &&
        new Date(transactionDate) >= new Date(dateRange.from) &&
        new Date(transactionDate) <= new Date(dateRange.to));

    return isTypeValid;
  });

  const transList = filteredTransactions?.map((trans) => {
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
      <div className="Trans-Op" key={createdAt}>
        <div className="Operation" style={{ color: color }}>
          {operation}
        </div>
        <div className="Date">{dateOnly}</div>
        <div className="Type">{type}</div>
      </div>
    );
  });

  const transListByFilter = filtered?.map((trans) => {
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
      <div className="Trans-Op" key={createdAt}>
        <div className="Operation" style={{ color: color }}>
          {operation}
        </div>
        <div className="Date">{dateOnly}</div>
        <div className="Type">{type}</div>
      </div>
    );
  });
  return (
    <div className="Trans-Page">
      <div className="Trans-Container">
        <div className="Trans-Search-Box">
          <input
            type="text"
            name="Search"
            placeholder="Search by Amount or Type"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchClick}>Search</button>
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
            <span className="checkmark"></span>
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
        <div className="Trans-Details">
          {!applySearch ? transListByFilter : transList}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
