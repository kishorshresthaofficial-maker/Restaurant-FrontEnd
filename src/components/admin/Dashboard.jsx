import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router";
import Fooditems from "./Fooditems";
import Adminmenu from "./Adminmenu";

export const Dashboard = () => {

  return (
    <div className="flex gap-10">
      {/* <Adminmenu/> */}

      <div className="pl-0 py-5 w-full h-dvh bg-gray-100">Admin Dashboard</div>

    </div>
  );
};
