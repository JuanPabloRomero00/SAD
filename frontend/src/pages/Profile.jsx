
import React from "react";
import { useAuth } from "../context/useAuth";
import UserProfile from "../components/UserProfile/UserProfile";
import AdminProfile from "../components/AdminProfile/AdminProfile";
const Profile = () => {
  const { user } = useAuth(); 

  return (
    <>
      {user.role === "user" ? (<><UserProfile /></>) : (<><AdminProfile /></>)}
    </>
  );
};
export default Profile;
