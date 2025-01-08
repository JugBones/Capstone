import React, { useEffect } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // New Achievement Icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useNavigate, useLocation } from "react-router-dom";
import "../styling/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [value, setValue] = React.useState(0);

  // Sync the value state with the current route
  useEffect(() => {
    switch (location.pathname) {
      case "/overview":
        setValue(0);
        break;
      case "/achievements":
        setValue(1);
        break;
      case "/journey":
        setValue(2);
        break;
      case "/profile":
        setValue(3);
        break;
      default:
        setValue(0); // Default to Overview
        break;
    }
  }, [location.pathname]);

  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/overview");
        break;
      case 1:
        navigate("/achievements");
        break;
      case 2:
        navigate("/journey");
        break;
      case 3:
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => handleNavigation(newValue)}
      className="bottom-nav"
    >
      <BottomNavigationAction
        label="Overview"
        icon={<HomeIcon />}
        className="nav-action"
      />
      <BottomNavigationAction
        label="Achievements"
        icon={<EmojiEventsIcon />}
        className="nav-action"
      />
      <BottomNavigationAction
        label="Journey"
        icon={<DirectionsRunIcon />}
        className="nav-action"
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        className="nav-action"
      />
    </BottomNavigation>
  );
};

export default Navbar;
