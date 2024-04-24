import React from "react";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import BankDetails from "./BankDetails";
import Document from "./Document";

export default function Change() {
  
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
     <Profile/>
     <BankDetails />
      <Document/>
     <ChangePassword />
    </div>
  );
}
