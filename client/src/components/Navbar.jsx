import React, { useState, useContext } from "react";
import { Container, Icon, Menu, Grid, Button } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import "./style.css";

function Navbar() {
  const [dropdownMenuStyle, setDropMenuStyle] = useState({ display: "none" });
  const [user, setUSer] = useContext(UserContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropMenuStyle((prev) => ({
      display: prev.display === "none" ? "flex" : "none",
    }));
  };

  const handleLogout = () => {
    axios.get("/api/user/logout").then(() => {
      setUSer(null);
      navigate("/");
    });
  };

  return (
    <>
      <Grid padded className="tablet computer only">
        <Container>
          <Menu borderless inverted fluid fixed="top">
            <Menu.Item header as={Link} to="/">
              IT Hub
            </Menu.Item>
            <Menu.Item as={Link} to="/home">
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/dashboard">
              Dashboard
            </Menu.Item>
            <Menu.Item position="right">
              {user ? (
                <>
                  <span style={{ color: "white", marginRight: "1em" }}>
                    Welcome, <strong>{user.name}</strong>
                  </span>
                  <Button
                    inverted
                    style={{ marginLeft: "0.5em" }}
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login" inverted>
                    Log in
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    inverted
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Menu.Item>
          </Menu>
        </Container>
      </Grid>

      {/* Mobile View */}
      <Grid className="mobile only">
        <Menu inverted borderless fluid size="huge" fixed="top">
          <Menu.Item header as={Link} to="/">
            IT Hub
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button icon basic inverted toggle onClick={toggleDropdown}>
                <Icon name="content" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
          <Menu vertical borderless inverted fluid style={dropdownMenuStyle}>
            <Menu.Item as={Link} to="/home">
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/dashboard">
              Dashboard
            </Menu.Item>
            {user ? (
              <>
                <Menu.Item disabled>
                  Welcome, <strong>{user.name}</strong>
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>Sign Out</Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item as={Link} to="/login">
                  Login
                </Menu.Item>
                <Menu.Item as={Link} to="/signup">
                  SignUp
                </Menu.Item>
              </>
            )}
          </Menu>
        </Menu>
      </Grid>
    </>
  );
}

export default Navbar;
