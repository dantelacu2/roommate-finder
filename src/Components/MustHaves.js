import React from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  "Laundry in-unit",
  "Doorman",
  "Gym",
  "Dishwasher",
  "Window in room",
  "Own bathroom",
  "Air conditioning",
];

function MustHaves(props) {
  const [mustHaves, setMustHaves] = React.useState([]);
  //Update tags at the signup form state level
  React.useEffect(() => {
    props.updateAnswers("must_haves", mustHaves);
  }, [mustHaves]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMustHaves(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box display="flex" justifyContent="space-evenly">
      <Box>
        <p style={{ fontWeight: "bold" }}>Apartment Must Haves:</p>
        <p>
          Indicate what specific elements your apartment must have. Select as
          many as you would like.
        </p>
      </Box>
      <div>
        <FormControl sx={{ m: 4, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Must Haves</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={mustHaves}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {options.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={mustHaves.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}

export default MustHaves;
