import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import ".././App.css";
import { WithContext as ReactTags } from "react-tag-input";

function MustHaves() {
  const [tags, setTags] = React.useState([]);
  // Method to delete tag from Array
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  // Method to Add tag into Array
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <div id="tags">
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="bottom"
        autocomplete
        allowDragDrop={false}
        placeholder="Apartment MUST Haves"
        inline={false}
      />
    </div>
  );
}

export default MustHaves;
