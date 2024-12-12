import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useNavigate } from "react-router-dom";
import "../styling/Navbar.css";

const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/overview");
        break;
      case 1:
        navigate("/syllabus");
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
        label="Syllabus"
        icon={<BookIcon />}
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
