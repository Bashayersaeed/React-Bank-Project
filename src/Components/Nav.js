import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <nav></nav>
      <nav className="Header">
        <NavLink to='/Home'>Home</NavLink>
        <NavLink to='/Transactions'>Transactions</NavLink>
        <NavLink to='/Users'>Users</NavLink>
        <NavLink to='/Profile'>Profile</NavLink>
      </nav>
      <nav className="Left-Header">
        <NavLink>SignOut</NavLink>
      </nav>
    </nav>
  );
};

export default Nav;
