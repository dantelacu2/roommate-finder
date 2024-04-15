import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import MustHaves from "./MustHaves";
import ReorderableList from "./ReorderableList";
import { createProfile } from "../Axios";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Stack from "@mui/material/Stack";

const tooltipText = "Examples: clean, night owl, no parties, etc.";

function SignupPage() {
  const [formAnswers, setFormAnswers] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const updateAnswers = (label, value) => {
    setFormAnswers({ ...formAnswers, [label]: value });
  };
  const submitAnswers = () => {
    createProfile(formAnswers);
    setIsSubmitted(true);
  };

  return (
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
          backgroundColor: "#D397F8",
        },
      }}
    >
      {!isSubmitted ? (
        <Paper elevation={10}>
          <h1>Sign Up</h1>
          <Box
            Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h3>Personal Information</h3>
            <TextField
              onChange={(e) => updateAnswers("name", e.currentTarget.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => updateAnswers("age", e.currentTarget.value)}
              id="outlined-basic"
              label="Age"
              variant="outlined"
            />
            <TextField
              onChange={(e) => updateAnswers("career", e.currentTarget.value)}
              id="outlined-basic"
              label="Career"
              variant="outlined"
            />
            <TextField
              onChange={(e) =>
                updateAnswers("university", e.currentTarget.value)
              }
              id="outlined-basic"
              label="University"
              variant="outlined"
            />
            <TextField
              onChange={(e) => updateAnswers("email", e.currentTarget.value)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              onChange={(e) =>
                updateAnswers("telephone", e.currentTarget.value)
              }
              id="outlined-basic"
              label="Telephone"
              variant="outlined"
            />
          </Box>
          <Box>
            <h3>Rooming Preferences</h3>
            <Box display="flex">
              <TextField
                id="outlined-basic"
                onChange={(e) =>
                  updateAnswers("location", e.currentTarget.value)
                }
                label="Location"
                variant="outlined"
              />
              <Slider
                aria-label="Location"
                onChange={(e) =>
                  updateAnswers("location_slider", e.currentTarget.value)
                }
                defaultValue={20}
                marks={[
                  { value: 0, label: "Not important" },
                  { value: 100, label: "Need" },
                ]}
                color="secondary"
                sx={{ mx: "50px" }}
              />
            </Box>
            <Box display="flex">
              <TextField
                id="outlined-basic"
                onChange={(e) =>
                  updateAnswers("move_in_date", e.currentTarget.value)
                }
                label="Move-in Date"
                variant="outlined"
                //   type="date"
              />
              <Slider
                aria-label="Move-in Date"
                onChange={(e) =>
                  updateAnswers("move_in_date_slider", e.currentTarget.value)
                }
                defaultValue={20}
                marks={[
                  { value: 0, label: "Not important" },
                  { value: 100, label: "Need" },
                ]}
                color="secondary"
                sx={{ mx: "50px" }}
              />
            </Box>
            <Box display="flex">
              <TextField
                id="outlined-basic"
                onChange={(e) =>
                  updateAnswers("budget_range", e.currentTarget.value)
                }
                label="Budget Range"
                variant="outlined"
              />
              <Slider
                aria-label="Budget Range"
                onChange={(e) =>
                  updateAnswers("budget_range_slider", e.currentTarget.value)
                }
                defaultValue={20}
                marks={[
                  { value: 0, label: "Not important" },
                  { value: 100, label: "Need" },
                ]}
                color="secondary"
                sx={{ mx: "50px" }}
              />
            </Box>
            <MustHaves updateAnswers={updateAnswers} />
          </Box>
          <Box display={"flex"}>
            <Stack direction="row" margin="auto">
              <h3>Roommate Preferences</h3>
              <Tooltip title={tooltipText}>
                <Button sx={{ m: 1 }}>
                  <HelpIcon sx={{ color: "black" }} />
                </Button>
              </Tooltip>
            </Stack>
          </Box>
          <ReorderableList />
          <p>Other Important Notes</p>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={3}
            label="Other"
          />
          <Box display="flex" sx={{ justifyContent: "right" }}>
            <Button
              onClick={() => submitAnswers()}
              color="secondary"
              variant="contained"
            >
              <Link style={{ textDecoration: "none" }} to="/matches">
                Submit
              </Link>
            </Button>
          </Box>
        </Paper>
      ) : (
        <Box display="flex" sx={{ justifyContent: "center" }}>
          Profile Submitted
        </Box>
      )}
    </Box>
  );
}

export default SignupPage;
