import Box from "@mui/material/Box";
import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";

function ProfileCard({ ...props }) {
  return (
    <Card variant="outlined" sx={{ mx: 8 }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            {props.match.name}
          </Typography>
          <Avatar>{props.match.name.charAt(0)}</Avatar>
        </Stack>
      </Box>
      <Divider />
      <Box>
        <p>
          <strong>Instagram:</strong> @{props.match.instagram}
        </p>
        <p>
          <strong>Phone number:</strong> {props.match.phone}
        </p>
        <p>
          <strong>Email:</strong> {props.match.email}
        </p>
      </Box>
      <Box sx={{ m: 2 }}>
        <Button
          variant="contaned"
          fullWith
          color="primary"
          sx={{ backgroundColor: "#1976d2", color: "white", m: 1 }}
          onClick={props.onViewProfile}
          name={props.match.name}
        >
          View Full Profile
        </Button>
        <Button
          variant="contaned"
          fullWith
          color="primary"
          sx={{ backgroundColor: "orange", color: "white", m: 1 }}
        >
          Rate Match
        </Button>
      </Box>
    </Card>
  );
}

export default ProfileCard;
