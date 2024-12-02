import React from "react";
import { withdraw } from "../API/auth";
import { deposit } from "../API/auth";
import { profile } from "../API/auth";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const [amount, setAmount] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const queryClient = useQueryClient();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["Profile"],
    queryFn: profile,
  });
  const depositMutation = useMutation({
    mutationKey: ["deposit"],
    mutationFn: (data) => deposit(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["Profile"]);
    },
  });
  const withdrawMutation = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: (data) => withdraw(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["Profile"]);
    },
  });
  const handleToggle = () => {
    setIsDeposit((prev) => !prev);
  };
  const handleChange = (e) => {
    setAmount(e.target.value);
  }
  const handleSave = () => {
    const trimmedAmount = amount.trim(); 
    const parsedAmount = parseFloat(trimmedAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    console.log("km");
    if (isDeposit) {
      depositMutation.mutate(parsedAmount);
    } else {
      withdrawMutation.mutate(parsedAmount);
    }
    setAmount("");
  };
  return (
    <div className="Home-Container">
      <div className="Balance-Container">
        <h1>Your available Balance:</h1>
        <h2>{data?.balance}</h2>
      </div>
      <div className="Home-Trans-Container">
        <div className="Dep-With-Container">
          <h4>Deposite</h4>
          <label class="switch">
            <input
              type="checkbox"
              checked={!isDeposit}
              onChange={handleToggle}
            ></input>
            <span class="slider round"></span>
          </label>
          <h4>Withdraw</h4>
        </div>
        <div className="Amount-Box">
          <input
            type="text"
            name="amount"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleChange}
            required
          />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Home;