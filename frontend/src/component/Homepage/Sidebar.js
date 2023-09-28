import React from "react";
import "./css/Sidebar.css";
import PublicIcon from "@material-ui/icons/Public";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link to="/">Home</Link>
          </div>
          <div className="sidebar-option">
            <p>PUBLIC</p>
            <div className="link">
              <div className="link-tag">
              <PublicIcon />
                <Link to="/">Question</Link>
              </div>
              <div className="tags">
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
