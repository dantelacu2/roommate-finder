import React, { useState, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import TinderCard from "react-tinder-card";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
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
    // color: "#FFFF00",
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    // color: "#FFFF00",
    color: "#ff3d47",
  },
});

const rows = ["No smoking", "Night owl", "Very clean"];

function MatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  // const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

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
            // m: 1,
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
          <Box
            display="flex"
            justifyContent={"space-between"}
            textAlign={"center"}
            marginTop="25px"
          >
            <Button variant="contained" size="large">
              Edit Your Profile
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
            {db.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.name}
                onSwipe={(dir) => swiped(dir, character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
              >
                <div className="card">
                  <h1>{character.name}</h1>
                  <h4>Rooming Preferences:</h4>
                  <p>Move-in Date: August 2024</p>
                  <StyledRating
                    name="simple-controlled"
                    icon={<PriorityHighIcon fontSize="inherit" />}
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                    size="large"
                    // value="value"
                    readOnly
                  />
                  <p>Lease Length</p>
                  <StyledRating
                    name="simple-controlled"
                    icon={<PriorityHighIcon fontSize="inherit" />}
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                    size="large"
                    // value="value"
                    readOnly
                  />
                  <p>Budget Range: $2000-$2,500</p>
                  <StyledRating
                    name="simple-controlled"
                    icon={<PriorityHighIcon fontSize="inherit" />}
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                    size="large"
                    // value="value"
                    readOnly
                  />
                  <p>City: New York City</p>
                  <StyledRating
                    name="simple-controlled"
                    icon={<PriorityHighIcon fontSize="inherit" />}
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                    size="large"
                    // value="value"
                    readOnly
                  />
                  <p>Neighborhoods: Chelsea, SOHO, NOHO</p>
                  <StyledRating
                    name="simple-controlled"
                    icon={<PriorityHighIcon fontSize="inherit" />}
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                    size="large"
                    // value="value"
                    readOnly
                  />

                  <h4>Apartment Must Haves:</h4>
                  <Chip label="Laundry in-unit" variant="outlined" />
                  <Chip label="Doorman" variant="outlined" />
                  <h4>Roommate Preferences</h4>
                  <TableContainer
                    component={Paper}
                    sx={{ marginBottom: "15px" }}
                  >
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow
                            key={row}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              {index + 1}. {row}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    // color="secondary"
                    variant="outlined"
                    onClick={handleClick}
                  >
                    Show Personal Information
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Box display="flex" margin="3px">
                      <Avatar>H</Avatar>
                      <Typography sx={{ p: 2 }}>Dineshi Chugtai</Typography>
                    </Box>
                  </Popover>
                </div>
              </TinderCard>
            ))}
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default MatchesPage;
