import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import PrevProfile from "./PrevProfile";

let previousMatches = [
  {
    name: "Daniel Jackson",
    age: 61,
    city: "Boston",
    gender: "Male",
    university: "Oxford",
    career: "Professor",
    employer: "MIT",
    email: "djackson@gmail.com",
    phone: "+1 212 555 6432",
    instagram: "danieljackson",
    move_in_date: 1720742400000,
    move_in_date_importance: 5,
    lease_length: "1",
    lease_length_importance: 2,
    num_roommates: "2",
    num_roommates_importance: 4,
    budget: "3500",
    budget_importance: 4,
    neighborhoods: ["Back Bay"],
    neighborhoods_importance: 3,
    must_haves: ["Doorman", "Laundry in-unit"],
    roommates_preferences: ["Clean", "No parties"],
  },
  {
    name: "Sam Smith",
    age: 30,
    city: "NYC",
    gender: "Male",
    university: "Harvard",
    career: "SWE",
    employer: "Google",
    email: "ss@gmail.com",
    phone: "+1 212 432 9873",
    instagram: "samsmith",
    move_in_date: 1720742400000,
    move_in_date_importance: 5,
    lease_length: "1",
    lease_length_importance: 2,
    num_roommates: "2",
    num_roommates_importance: 4,
    budget: "3500",
    budget_importance: 4,
    neighborhoods: ["Uptown", "East Side"],
    neighborhoods_importance: 3,
    must_haves: ["Doorman", "Laundry in-unit"],
    roommates_preferences: ["Clean", "No parties"],
  },
];

function PreviousMatchesPage() {
  let navigate = useNavigate();
  const [profile, setProfile] = React.useState(null);

  const onViewProfile = (e) => {
    console.log(e.target.name);
    previousMatches.forEach((match) => {
      if (match.name === e.target.name) {
        setProfile(match);
      }
    });
  };
  const onGoBack = () => {
    setProfile(null);
  };
  console.log(profile);
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
        {!profile ? (
          <div>
            <Box display={"flex"}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(-1)}
              >
                Find New Matches
              </Button>
            </Box>
            <h1>Your Previous Matches!</h1>
            <Box justifyContent={"center"}>
              <Grid container spacing={2}>
                {previousMatches.map((match, index) => (
                  <Grid item xs={6}>
                    <ProfileCard match={match} onViewProfile={onViewProfile} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        ) : (
          <PrevProfile character={profile} onClick={onGoBack} />
        )}
      </Paper>
    </Box>
  );
}

export default PreviousMatchesPage;
