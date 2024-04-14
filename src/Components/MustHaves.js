import React from "react";
import Box from "@mui/material/Box";
import ".././App.css";
import { WithContext as ReactTags } from "react-tag-input";

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

  return (
    <Box display={"flex"}>
      <p>Apartment Must Haves:</p>
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
