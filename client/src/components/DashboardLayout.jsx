import React, { useState } from "react";
import { Grid, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import "./style.css";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <>
      <NavBar /> {/* Top Navigation */}
      <div className="dashboard-container">
        {/* Mobile Toggle Button */}
        <div className="mobile-toggle">
          <Icon
            name="sidebar"
            size="large"
            onClick={toggleSidebar}
            style={{ cursor: "pointer" }}
          />
        </div>
        {/* Sidebar */}
        <div className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <Menu vertical fluid text className="sidebar-menu">
            <Menu.Item>
              <Link to="/dashboard">Dashboard Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/create-post">Create Post</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/managePost">Manage Posts</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/favorites">View Favorites</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/update-profile">Update Profile</Link>
            </Menu.Item>
          </Menu>
        </div>

        {/* Main content */}
        <div className="dashboard-main">
          <Grid padded stackable>
            {children}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
