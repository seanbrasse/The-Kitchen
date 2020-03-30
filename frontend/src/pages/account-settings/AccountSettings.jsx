import React from "react";
import { Link } from "react-router-dom";
import "./AccountSettings.css";

export default function AccountSettings() {
  return (
    <main>
      <div className="TheBox">
        <h1 className= "Header">ACCOUNT SETTINGS</h1>
        <Link to="/forgot-password" className="ChangePassword">
          {" "}
          Change Your Password{" "}
        </Link>
        <br />
        <Link to="" className="ChangeUsername">
          {" "}
          Change Your Username
        </Link>
      </div>
    </main>
  );
}
