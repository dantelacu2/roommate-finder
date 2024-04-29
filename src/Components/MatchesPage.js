import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import TinderCard from "react-tinder-card";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import { getMatches } from "../Axios";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

// This file is our "View Potential Matches" Page
// It is part of our instantiation of the Matches Concept
// On the page we showcase a series of profile cards and users can swipe left or right on the cards

const db = [
  {
    name: "Richard Hendricks",
    url: "./headshot2.jpeg",
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./img/dinesh.jpg",
  },
];
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function MatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [matches, setMatches] = useState([]);
  // Here is where we are passing the global state of which user is logged in
  // We use a profile ID so that we can reference this user in our Mongo database
  const { profileId } = useParams();

  useEffect(() => {
    getMatches(profileId).then((resp) => {
      if (Array.isArray(resp?.doc?.matches)) {
        setMatches(resp?.doc?.matches);
      }
    });
  }, [profileId]);

  const currentIndexRef = useRef(currentIndex);
  const [showPersonal, setShowPersonal] = React.useState(false);

  const handleClick = () => {
    setShowPersonal(!showPersonal);
  };

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  // The functions below allow us to create a Tinder-like swipe on our profile cards
  // This is a benefit of using React as we were able to build these functions from the React Tinder Cards library
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    // setLastDirection(direction);
    updateCurrentIndex(index - 1);
    setShowPersonal(false);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          "& > :not(style)": {
            width: "75%",
            marginTop: "50px",
            marginBottom: "50px",
            padding: "20px",
            backgroundColor: "#ADD8E6",
          },
        }}
      >
        <Paper elevation={10}>
          <Box
            display="flex"
            justifyContent={"space-between"}
            textAlign={"center"}
            marginTop="25px"
          >
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                alert(
                  "We are so sorry. Your profile was created too recently to update. Please wait 10 minutes and try again."
                )
              }
            >
              Update Profile
            </Button>
            <Button variant="contained" size="large">
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/prev"
              >
                View Previous Matches
              </Link>
            </Button>
          </Box>
          <h1>Potential Matches!</h1>
          <div className="buttons">
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              Swipe left to reject!
            </button>
            <button
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo swipe!
            </button>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
            >
              Swipe right to match!
            </button>
          </div>
          <div className="cardContainer">
            {matches.map(
              (character, index) => (
                console.log(character),
                (
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={character.name}
                    onSwipe={(dir) => swiped(dir, character.name, index)}
                    onCardLeftScreen={() => outOfFrame(character.name, index)}
                  >
                    <div className="card">
                      <h1>{character.name}</h1>
                      {character.city && <p>Location: {character.city}</p>}
                      <h4>Rooming Preferences:</h4>
                      {character.move_in_date && (
                        <>
                          <p>
                            Move-in Date:{" "}
                            {new Date(character.move_in_date).getMonth()}/
                            {new Date(character.move_in_date).getFullYear()}
                          </p>
                          <StyledRating
                            name="simple-controlled"
                            icon={<PriorityHighIcon fontSize="inherit" />}
                            defaultValue={2}
                            getLabelText={(value) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                            size="large"
                            value={
                              character.move_in_date_importance
                                ? character.move_in_date_importance
                                : 2
                            }
                            readOnly
                          />
                        </>
                      )}
                      {character.lease_length && (
                        <>
                          <p>
                            Lease Length: {character.lease_length.toString()}
                          </p>
                          <StyledRating
                            name="simple-controlled"
                            icon={<PriorityHighIcon fontSize="inherit" />}
                            defaultValue={2}
                            getLabelText={(value) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                            size="large"
                            value={
                              character.lease_length_importance
                                ? character.lease_length_importance
                                : 2
                            }
                            readOnly
                          />
                        </>
                      )}
                      {character.budget && (
                        <>
                          <p>Budget: ${character.budget.toString()}</p>
                          <StyledRating
                            name="simple-controlled"
                            icon={<PriorityHighIcon fontSize="inherit" />}
                            defaultValue={2}
                            getLabelText={(value) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                            size="large"
                            value={
                              character.budget_importance
                                ? character.budget_importance
                                : 2
                            }
                            readOnly
                          />
                        </>
                      )}
                      {character.neighborhoods && (
                        <>
                          <p>
                            Neighborhoods: {character.neighborhoods.join(", ")}
                          </p>
                          <StyledRating
                            name="simple-controlled"
                            icon={<PriorityHighIcon fontSize="inherit" />}
                            defaultValue={2}
                            getLabelText={(value) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                            size="large"
                            value={
                              character.neighborhoods_importance
                                ? character.neighborhoods_importance
                                : 2
                            }
                            readOnly
                          />
                        </>
                      )}
                      <h4>Apartment Must Haves:</h4>
                      {character.must_haves &&
                        character.must_haves.map((must_have, index) => (
                          <Chip label={must_have} variant="outlined" />
                        ))}
                      <h4>Roommate Preferences</h4>
                      <TableContainer
                        component={Paper}
                        sx={{ marginBottom: "15px" }}
                      >
                        <Table sx={{ minWidth: 650 }} size="small">
                          <TableBody>
                            {character.roommates_preferences.map(
                              (row, index) => (
                                <TableRow
                                  key={row}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>
                                    {index + 1}. {row}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Button
                        // color="secondary"
                        variant="outlined"
                        onClick={handleClick}
                      >
                        {!showPersonal ? "Show" : "Hide"} Personal Information
                      </Button>
                      {showPersonal ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent={"center"}
                        >
                          <Card sx={{ maxWidth: "75%", marginTop: "10px" }}>
                            <Box>
                              <Box
                                display="flex"
                                margin="10px"
                                alignItems={"center"}
                              >
                                <Avatar sx={{ bgcolor: "#1f6cfa" }}>
                                  {character.name.charAt(0)}
                                </Avatar>
                                <Typography
                                  sx={{
                                    p: 2,
                                    textTransform: "capitalize",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {character.name}
                                </Typography>
                              </Box>
                              <Divider style={{ background: "black" }} />
                              <Box paddingX="10px" margin="10px">
                                <Typography>
                                  {character.gender}, {character.age} years old
                                </Typography>
                                <Typography>
                                  Graduate of {character.university} university
                                </Typography>
                                <Typography>
                                  Working as a {character.career} at{" "}
                                  {character.employer}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </div>
                  </TinderCard>
                )
              )
            )}
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default MatchesPage;
