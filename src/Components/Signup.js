import React from "react"; 
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import MustHaves from "./MustHaves";
import ReorderableList from "./ReorderableList";
import { createProfile } from "../Axios";

function Signup() {
  const [formAnswers, setFormAnswers] = React.useState({});
  const updateAnswers = (label, value) => {
    setFormAnswers({...formAnswers, [label]: value});
  }
  const submitAnswers = () => {
    console.log("submitting", formAnswers);
    createProfile(formAnswers);
  }

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
          <TextField onChange={(e) => updateAnswers("name", e.currentTarget.value)} id="outlined-basic" label="Name" variant="outlined" />
          <TextField onChange={(e) => updateAnswers("age", e.currentTarget.value)} id="outlined-basic" label="Age" variant="outlined" />
          <TextField onChange={(e) => updateAnswers("career", e.currentTarget.value)} id="outlined-basic" label="Career" variant="outlined" />
          <TextField
            onChange={(e) => updateAnswers("university", e.currentTarget.value)}
            id="outlined-basic"
            label="University"
            variant="outlined"
          />
          <TextField onChange={(e) => updateAnswers("email", e.currentTarget.value)} id="outlined-basic" label="Email" variant="outlined" />
          <TextField onChange={(e) => updateAnswers("telephone", e.currentTarget.value)} id="outlined-basic" label="Telephone" variant="outlined" />
        </Box>
        <Box>
          <h3>Rooming Preferences</h3>
          <Box display="flex">
            <TextField
              id="outlined-basic"
              onChange={(e) => updateAnswers("location", e.currentTarget.value)}
              label="Location"
              variant="outlined"
            />
            <Slider
              aria-label="Location"
              onChange={(e) => updateAnswers("location_slider", e.currentTarget.value)}
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
              onChange={(e) => updateAnswers("move_in_date", e.currentTarget.value)}
              label="Move-in Date"
              variant="outlined"
              //   type="date"
            />
            <Slider
              aria-label="Move-in Date"
              onChange={(e) => updateAnswers("move_in_date_slider", e.currentTarget.value)}
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
              onChange={(e) => updateAnswers("budget_range", e.currentTarget.value)}
              label="Budget Range"
              variant="outlined"
            />
            <Slider
              aria-label="Budget Range"
              onChange={(e) => updateAnswers("budget_range_slider", e.currentTarget.value)}
              defaultValue={20}
              marks={[
                { value: 0, label: "Not important" },
                { value: 100, label: "Need" },
              ]}
              color="secondary"
              sx={{ mx: "50px" }}
            />
          </Box>
          {/* <Box display="flex"> */}
          <MustHaves updateAnswers={updateAnswers} />
          {/* </Box> */}
        </Box>
        <h3>Roommate Preferences</h3>
        <ReorderableList />
        {/* <Box display="flex"></Box> */}
        <p>Other Important Notes</p>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          label="Other"
        />
        <Box display="flex" sx={{ justifyContent: 'right' }}>
          <Button onClick={() => submitAnswers()} color="secondary" variant="outlined">Submit</Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Signup;
