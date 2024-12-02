import React from "react";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { profile } from "../API/auth";

const Profile = () => {
  // const [Data, setData] = useState({
  //   username: "",
  //   password: "",
  //   image: "",
  // });

  const {
    data: profileData,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: profile,
  });

  // const handleFileChange = (e) => {
  //   setData({ ...Data, image: e.target.file[0] });
  // };
  return (
    <div className="Profile-Container">
      <form className="Profile-Form">
        <div className="Profile-Data">
          <h1>{profileData?.username}</h1>
          <h4>Balance:{profileData?.balance}</h4>
          <h6>Upload a Profile Pic</h6>
          <div className="Upload-Contianer">
            <input
              type="file"
              name="image"
              accept="image/*"
              // onChange={handleFileChange}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
