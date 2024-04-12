import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

function Signup() {
  return (
    <Box>
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
        <TextField id="outlined-basic" label="University" variant="outlined" />
      </Box>
      <Box>
        <h3>Rooming Preferences</h3>
        <Box>
          <TextField id="outlined-basic" label="Location" variant="outlined" />
          <p>How important is this to you?</p>
          <Slider aria-label="Location" />
        </Box>
        <TextField id="outlined-basic" label="Move in date" variant="outlined" />
      </Box>
      <Box>
        <h3>Roommate Preferences</h3>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Location / Neighborhood"
        />
      </Box>
    </Box>
  );
}

export default Signup;
