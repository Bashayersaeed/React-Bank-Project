import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {users } from "../API/auth";

const Users = () => {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["Users"],
    queryFn: users(),
  });

  return ( <div>{data?.map((user) => (
    <div className="Profile-Container">
      <form className="Profile-Form">
        <div className="Profile-Data">
          <h1>{user.username}</h1>
          <h4>Balance:{user.balance}</h4>
          <h6>Upload a Profile Pic</h6>
          <div className="Upload-Contianer">
            <input
              type="number"
              name="transfer"
              placeholder="Enter Amount"
            //   onChange={handleFileChange}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  ))}</div>);
};

export default Users;


