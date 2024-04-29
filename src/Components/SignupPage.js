import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MustHaves from "./MustHaves";
import ReorderableList from "./ReorderableList";
import { createProfile, createMatches } from "../Axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { MuiTelInput } from "mui-tel-input";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SignupPage() {
  const [formAnswers, setFormAnswers] = React.useState({});
  const [phone, setPhone] = React.useState("");
  const navigate = useNavigate();

  const updateAnswers = (label, value) => {
    setFormAnswers({ ...formAnswers, [label]: value });
  };
  const submitAnswers = () => {
    createProfile(formAnswers).then((doc) => {
      createMatches(doc?.insertedDoc?.insertedId?.toString()).then((_) => {
        navigate(`/matches/${doc?.insertedDoc?.insertedId?.toString()}`);
      });
    });
  };

  const updatePhone = (newValue) => {
    setPhone(newValue);
    updateAnswers("phone", newValue);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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

  const neighborhoodTooltipText = "Select as many neighborhoods as you like!";

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
          // backgroundColor: "#D397F8",
          backgroundColor: "#ADD8E6",
        },
      }}
    >
      <Paper elevation={10}>
        <h1>Create a Profile</h1>
        <Box
          Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Personal Information</h2>
          <TextField
            onChange={(e) => updateAnswers("name", e.currentTarget.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <TextField
            onChange={(e) =>
              updateAnswers("age", parseInt(e.currentTarget.value))
            }
            id="outlined-basic"
            label="Age"
            variant="outlined"
            type="number"
          />
          <FormControl sx={{ marginTop: 1 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              sx={{ minWidth: 150 }}
              labelId="gender-select"
              id="g-select"
              value={formAnswers["gender"]}
              label="gender"
              onChange={(e) => updateAnswers("gender", e.target.value)}
            >
              {["Male", "Female", "Non-Binary"].map((name) => {
                return <MenuItem value={name}>{name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => updateAnswers("university", e.currentTarget.value)}
            id="outlined-basic"
            label="University"
            variant="outlined"
          />
          <TextField
            onChange={(e) => updateAnswers("career", e.currentTarget.value)}
            id="outlined-basic"
            label="Career"
            variant="outlined"
          />
          <TextField
            onChange={(e) => updateAnswers("employer", e.currentTarget.value)}
            id="outlined-basic"
            label="Employer"
            variant="outlined"
          />
          <TextField
            onChange={(e) => updateAnswers("email", e.currentTarget.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <MuiTelInput
            label="Phone"
            value={phone}
            onChange={updatePhone}
            defaultCountry="US"
          />
          <TextField
            onChange={(e) => updateAnswers("instagram", e.currentTarget.value)}
            id="outlined-basic"
            label="Instagram"
            variant="outlined"
          />
          <FormControl sx={{ marginTop: 1 }}>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formAnswers["city"]}
              sx={{ minWidth: 150 }}
              label="City"
              onChange={(e) => updateAnswers("city", e.target.value)}
            >
              {["NYC", "SF", "Boston", "Chicago", "Austin"].map((name) => {
                return <MenuItem value={name}>{name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          margin="auto"
        >
          Upload Photo
          <VisuallyHiddenInput type="file" />
        </Button>
        <h2>Rooming Preferences</h2>
        <p style={{ fontWeight: "bold" }}>
          In this section respond to each question and indicate how important
          this choice is to you when selecting an apartment using the
          correspondng rating scale on the right. The current ratings are
          default ratings and should be changed.
        </p>
        <Box marginRight={"100px"} marginLeft="75px">
          <Box display="flex" justifyContent={"space-between"}>
            <TextField
              sx={{ width: "25ch" }}
              id="outlined-basic"
              onChange={(e) =>
                updateAnswers(
                  "move_in_date",
                  new Date(e.currentTarget.value).valueOf()
                )
              }
              label="Move-in Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <Box display={"flex"}>
              <p>Not Important</p>
              <StyledRating
                name="simple-controlled"
                icon={<PriorityHighIcon fontSize="inherit" />}
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                size="large"
                value={formAnswers["move_in_date_importance"]}
                onChange={(event) => {
                  updateAnswers(
                    "move_in_date_importance",
                    parseInt(event.target.value)
                  );
                }}
              />
              <p>Very Important</p>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent={"space-between"}
            marginTop={"15px"}
          >
            <TextField
              id="outlined-basic"
              onChange={(e) =>
                updateAnswers("lease_length", e.currentTarget.value)
              }
              label="Lease Length (in years)"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "25ch" }}
            />
            <Box display={"flex"}>
              <p>Not Important</p>
              <StyledRating
                name="simple-controlled"
                icon={<PriorityHighIcon fontSize="inherit" />}
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                size="large"
                value={formAnswers["lease_length_importance"]}
                onChange={(event) => {
                  updateAnswers(
                    "lease_length_importance",
                    parseInt(event.target.value)
                  );
                }}
              />
              <p>Very Important</p>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent={"space-between"}
            marginTop={"15px"}
          >
            <TextField
              id="outlined-basic"
              onChange={(e) =>
                updateAnswers("num_roommates", e.currentTarget.value)
              }
              label="Ideal # of Roommates (including you)"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              type="number"
              sx={{ width: "25ch" }}
            />
            <Box display={"flex"}>
              <p>Not Important</p>
              <StyledRating
                name="simple-controlled"
                icon={<PriorityHighIcon fontSize="inherit" />}
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                size="large"
                value={formAnswers["num_roommates_importance"]}
                onChange={(event) => {
                  updateAnswers(
                    "num_roommates_importance",
                    parseInt(event.target.value)
                  );
                }}
              />
              <p>Very Important</p>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent={"space-between"}
            marginTop={"15px"}
          >
            <TextField
              id="outlined-basic"
              onChange={(e) => updateAnswers("budget", e.currentTarget.value)}
              label="Budget Range (per-person, monthly)"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "25ch" }}
            />
            <Box display={"flex"}>
              <p>Not Important</p>
              <StyledRating
                name="simple-controlled"
                icon={<PriorityHighIcon fontSize="inherit" />}
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                size="large"
                value={formAnswers["budget_importance"]}
                onChange={(event) => {
                  updateAnswers(
                    "budget_importance",
                    parseInt(event.target.value)
                  );
                }}
              />
              <p>Very Important</p>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent={"space-between"}
            marginTop={"15px"}
          >
            <Box>
              <FormControl sx={{ marginTop: 1 }}>
                <InputLabel id="neighborhoods-label">Neighborhoods</InputLabel>
                <Select
                  sx={{ minWidth: 200, width: "25ch" }}
                  labelId="neighborhoods-select"
                  id="n-select"
                  multiple
                  value={
                    Array.isArray(formAnswers["neighborhoods"])
                      ? formAnswers["neighborhoods"]
                      : []
                  }
                  label="neighborhoods"
                  onChange={(e) =>
                    updateAnswers("neighborhoods", e.target.value)
                  }
                >
                  {[
                    "West Side",
                    "East Side",
                    "Uptown",
                    "Downtown",
                    "Brookyln",
                    "Jersey City",
                  ].map((name) => {
                    return <MenuItem value={name}>{name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <Tooltip title={neighborhoodTooltipText}>
                <Button sx={{ m: 1 }}>
                  <HelpIcon sx={{ color: "black" }} />
                </Button>
              </Tooltip>
            </Box>
            <Box display={"flex"}>
              <p>Not Important</p>
              <StyledRating
                name="simple-controlled"
                icon={<PriorityHighIcon fontSize="inherit" />}
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                emptyIcon={<PriorityHighIcon fontSize="inherit" />}
                size="large"
                value={formAnswers["neighborhoods_importance"]}
                onChange={(event) => {
                  updateAnswers(
                    "neighborhoods_importance",
                    parseInt(event.target.value)
                  );
                }}
              />
              <p>Very Important</p>
            </Box>
          </Box>
          <MustHaves updateAnswers={updateAnswers} />
        </Box>

        <Box display={"flex"}>
          <Stack direction="row" margin="auto">
            <h2>Roommate Preferences</h2>
          </Stack>
        </Box>
        <ReorderableList updateAnswers={updateAnswers} />
        <h2>Other Important Notes</h2>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          label="Other"
          fullWidth
        />
        <Box display="flex" sx={{ justifyContent: "right" }}>
          <Button
            onClick={() => submitAnswers()}
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignupPage;
