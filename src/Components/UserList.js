import React from "react";
import { useState } from "react";

const UserList = ({ user }) => {
  const [Data, setData] = useState({ user });
  return (
    <div className="Profile-Container">
      <form className="Profile-Form">
        <div className="Profile-Data">
          <h1>{Data.username}</h1>
          <h4>Balance:{Data.balance}</h4>
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
  );
};

export default UserList;
