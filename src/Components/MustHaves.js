import React from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import { WithContext as ReactTags } from "react-tag-input";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import HelpIcon from "@mui/icons-material/Help";

const suggestions = [
  { id: "1", text: "Laundry in-unit" },
  { id: "2", text: "Doorman" },
  { id: "3", text: "Gym" },
];

function MustHaves(props) {
  const [tags, setTags] = React.useState([]);
  // Method to delete tag from Array
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  // Method to Add tag into Array
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  // Update tags at the signup form state level
  React.useEffect(() => {
    props.updateAnswers("tags", tags);
  }, [tags]);

  const tooltipText = "Examples: laundry in-unit, doorman, etc.";

  return (
    <Box display={"flex"}>
      <p>Apartment Must Haves:</p>
      <Tooltip title={tooltipText}>
        <Button sx={{ m: 1 }}>
          <HelpIcon sx={{ color: "black" }} />
        </Button>
      </Tooltip>
      <div id="tags">
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="top"
          autocomplete
          allowDragDrop={false}
        />
      </div>
    </Box>
  );
}

export default MustHaves;
