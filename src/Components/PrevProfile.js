import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import TinderCard from "react-tinder-card";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
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
import Divider from "@mui/material/Divider";

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

function PrevProfile(...props) {
  console.log(props);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const character = props[0].character;
  console.log(character);

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
      <Box display={"flex"}>
        <Button variant="contained" size="large" onClick={props[0].onClick}>
          Go Back
        </Button>
      </Box>
      <div className="cardContainer">
        <div className="card">
          <h1>{character.name}</h1>
          {character.city && <p>Location: {character.city}</p>}
          <h4>Rooming Preferences:</h4>
          {character.move_in_date && (
            <>
              <p>
                Move-in Date: {new Date(character.move_in_date).getMonth()}/
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
              <p>Lease Length: {character.lease_length.toString()}</p>
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
                  character.budget_importance ? character.budget_importance : 2
                }
                readOnly
              />
            </>
          )}
          {character.neighborhoods && (
            <>
              <p>Neighborhoods: {character.neighborhoods.join(", ")}</p>
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
          <TableContainer component={Paper} sx={{ marginBottom: "15px" }}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableBody>
                {character.roommates_preferences.map((row, index) => (
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
            <Box>
              <Box display="flex" margin="10px" alignItems={"center"}>
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
                  Working as a {character.career} at {character.employer}
                </Typography>
              </Box>
            </Box>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default PrevProfile;
