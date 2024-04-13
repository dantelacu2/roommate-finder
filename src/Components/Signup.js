import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import MustHaves from "./MustHaves";
import ReorderableList from "./ReorderableList";

function Signup() {
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
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <TextField id="outlined-basic" label="Age" variant="outlined" />
          <TextField id="outlined-basic" label="Career" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="University"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Telephone" variant="outlined" />
        </Box>
        <Box>
          <h3>Rooming Preferences</h3>
          <Box display="flex">
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
            />
            <Slider
              aria-label="Location"
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
              label="Move-in Date"
              variant="outlined"
              //   type="date"
            />
            <Slider
              aria-label="Move-in Date"
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
              label="Budget Range"
              variant="outlined"
            />
            <Slider
              aria-label="Budget Range"
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
          <MustHaves />
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
      </Paper>
    </Box>
  );
}

export default Signup;
