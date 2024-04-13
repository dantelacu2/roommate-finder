import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import reorderList from "./reorderList.ts";
import { TextField, Button } from "@mui/material";

function ReorderableList() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");

  const [dragged, setDragged] = useState(null);
  const [mouse, setMouse] = useState([0, 0]);
  const [closestDropZone, setClosestDropZone] = useState(0);

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
      <p>
        Type a Roomate Preference and then drag to order them based on
        importance:
      </p>
      <Box display="flex">
        <TextField
          id="outlined-basic"
          label="Roommate Preference"
          variant="outlined"
          onChange={(e) => setItem(e.target.value)}
        />
        <Button onClick={handleAddition}>Add</Button>
        <>
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
                      <p>{v}</p>
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
        </>
      </Box>
    </Box>
  );
}

export default ReorderableList;
