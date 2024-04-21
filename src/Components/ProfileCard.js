import Box from "@mui/material/Box";
import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";

function ProfileCard() {
  return (
    <Card variant="outlined" sx={{ mx: 8 }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            Kara Siegel
          </Typography>
          <Avatar>H</Avatar>
        </Stack>
        {/* <Typography color="text.secondary" variant="body2">
              Description of Kara
            </Typography> */}
      </Box>
      <Divider />
      <Box>
        <p>Instagram: ksiegel</p>
        <p>Phone number:</p>
      </Box>
      <Button
        variant="contaned"
        fullWith
        color="primary"
        sx={{ backgroundColor: "#1976d2", color: "white", mb: 2 }}
      >
        View Full Profile
      </Button>
    </Card>
  );
}

export default ProfileCard;
