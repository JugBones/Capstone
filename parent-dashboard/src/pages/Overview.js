import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProgressChart from "../components/ProgressChart";
import Recommendation from "../components/Recommendation";
import Appreciation from "../components/Appreciation";
import Achievement from "../components/Achievement";
import Participation from "../components/Participation";
import { Grid, Box } from "@mui/material";
import "../styling/Overview.css";

const Overview = () => {
  return (
    <Box className="App">
      <Header />
      <Box className="overview-container">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ProgressChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <Participation />
          </Grid>
          <Grid item xs={12} md={6}>
            <Achievement />
          </Grid>
          <Grid item xs={12} md={6}>
            <Recommendation />
          </Grid>
          <Grid item xs={12}>
            <Appreciation />
          </Grid>
        </Grid>
      </Box>
      <Navbar /> {/* Bottom Navigation */}
    </Box>
  );
};

export default Overview;
