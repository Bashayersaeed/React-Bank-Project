import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { users } from "../API/auth";
import { useState } from "react";
import { TransferUsers } from "../API/auth";

const Users = () => {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["Users"],
    queryFn: users,
  });
  const [amounts, setAmounts] = useState({});
  const [applySearch, setApplySearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e, username) => {
    setAmounts({
      ...amounts,
      [username]: e.target.value,
    });
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchClick = () => {
    setApplySearch(true);
  };

  const handleTransfer = async (e, amount, username) => {
    e.preventDefault();
    const response = await TransferUsers(amount, username);
  };
  const filteredUsers = applySearch
    ? data?.filter((user) =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

  return (
    <div className="Users-Page">
      <div className="Trans-Search-Box">
        <input
          type="text"
          name="Search"
          placeholder="Search for user"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="User-List">
        {filteredUsers?.map((user) => (
          <div className="User-Container">
            <form
              className="User-Form"
              onSubmit={(e) =>
                handleTransfer(e, amounts[user.username], user.username)
              }
            >
              <div className="User-Data">
                <h3>{user.username}</h3>
                <h5>Balance:{user.balance}</h5>
                <h6>Upload a Profile Pic</h6>
                <div className="Upload-Contianer">
                  <input
                    type="number"
                    name="transfer"
                    placeholder="Enter Amount"
                    value={amounts[user.username]}
                    onChange={(e) => handleChange(e, user.username)}
                    required
                  />
                  <button type="submit">Transfer</button>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
