import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

function PreviousMatchesPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        "& > :not(style)": {
          width: "75%",
          height: "min-content",
          marginTop: "50px",
          marginBottom: "50px",
          padding: "20px",
          // backgroundColor: "#D397F8",
          backgroundColor: "#ADD8E6",
        },
      }}
    >
      <Paper elevation={10}>
        {" "}
        <Box display={"flex"}>
          <Button variant="contained" size="large">
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/prev"
            >
              Find New Matches
            </Link>
          </Button>
        </Box>
        <h1>Your Previous Matches!</h1>
        <Box justifyContent={"center"}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProfileCard />
            </Grid>
            <Grid item xs={6}>
              <ProfileCard />
            </Grid>
            <Grid item xs={6}>
              <ProfileCard />
            </Grid>
            <Grid item xs={6}>
              <ProfileCard />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default PreviousMatchesPage;
