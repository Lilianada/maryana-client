import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import BankDetails from "./BankDetails";

export default function Change() {
  
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
     <Profile/>
     <BankDetails />
     <ChangePassword />
      

    </div>
  );
}
