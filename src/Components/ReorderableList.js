import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import reorderList from "./reorderList.ts";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ReorderableList(props) {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");

  const [dragged, setDragged] = useState(null);
  const [mouse, setMouse] = useState([0, 0]);
  const [closestDropZone, setClosestDropZone] = useState(0);

  useEffect(() => {
    props.updateAnswers("roommates_preferences", items);
  }, [items]);

  useEffect(() => {
    const handler = (e) => {
      if (dragged !== null) {
        e.preventDefault();
        setDragged(null);

        setItems((items) => reorderList(items, dragged, closestDropZone));
      }
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  });

  useEffect(() => {
    const handler = (e) => {
      setMouse([e.x, e.y]);
    };

    document.addEventListener("mousemove", handler);

    return () => document.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    if (dragged !== null) {
      const elements = Array.from(document.getElementsByClassName("drop-zone"));
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      if (result > dragged) result += 1;

      setClosestDropZone(result);
    }
  }, [dragged, mouse]);

  const handleAddition = () => {
    setItems([...items, item]);
  };

  return (
    <Box>
      <p style={{ fontWeight: "bold" }}>
        Choose your roommate preferences from the dropdown and add them to your
        list of preferences. Drag and drop the elements in the list to reorder
        based on preference.
      </p>
      <Box display="flex" justifyContent={"space-evenly"} alignItems={"center"}>
        <Box display="flex">
          {/* <TextField
          id="outlined-basic"
          label="Roommate Preference"
          variant="outlined"
          onChange={(e) => setItem(e.target.value)}
        /> */}
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-label">
              Roommate Preference
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item}
              label="Roommate Preference"
              onChange={(e) => setItem(e.target.value)}
            >
              <MenuItem value={"clean"}>Clean</MenuItem>
              <MenuItem value={"night-owl"}>Night Owl</MenuItem>
              <MenuItem value={"early-riser"}>Early Riser</MenuItem>
              <MenuItem value={"no-parties"}>No Parties</MenuItem>
              <MenuItem value={"willing-to-host-parties"}>Willing to host parties</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAddition}>
            Add
          </Button>
        </Box>
        <Box>
          {items.length !== 0 && <p>Most Important</p>}
          {dragged !== null && (
            <div
              className="floating list-item"
              style={{
                left: `${mouse[0]}px`,
                top: `${mouse[1]}px`,
              }}
            >
              <p>{items[dragged]}</p>
            </div>
          )}
          <div className="list">
            <div
              key={`0-drop-zone-a`}
              className={`list-item drop-zone ${
                dragged === null || closestDropZone !== 0 ? "hidden" : ""
              }`}
            />
            {items.map((v, i) => (
              <>
                {dragged !== i && (
                  <>
                    <div
                      key={v}
                      className="list-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setDragged(i);
                        setClosestDropZone(i);
                      }}
                    >
                      <p>
                        {i + 1}. {v}
                      </p>
                    </div>

                    <div
                      key={`${v}-drop-zone`}
                      className={`list-item drop-zone ${
                        dragged === null || closestDropZone !== i + 1
                          ? "hidden"
                          : ""
                      }`}
                      onMouseUp={(e) => {
                        e.preventDefault();

                        if (dragged !== null) {
                          setDragged(null);
                        }
                      }}
                    ></div>
                  </>
                )}
              </>
            ))}
          </div>
          {items.length !== 0 && <p>Least Important</p>}
        </Box>
      </Box>
    </Box>
  );
}

export default ReorderableList;
