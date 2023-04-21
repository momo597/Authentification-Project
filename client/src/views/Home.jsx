import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state/authSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <div className="flex flex-col h-4/6 w-5/6 my-10 items-center justify-between">
      <h1 className="w-2/6 text-4xl text-center">Welcome {user.firstName}</h1>
      <button
        className="w-1/6 h-10 rounded-2xl drop-shadow-md bg-buttonBg mt-10"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
