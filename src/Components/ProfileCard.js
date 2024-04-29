import Box from "@mui/material/Box";
import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Modal } from "@mui/material";
import Rating from '@mui/material/Rating';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '& > legend': { mt: 2 },
};

function ProfileCard({ ...props }) {
  const [rateModalOpen, setRateModalOpen] = React.useState(false);
  const [ratings, setRatings] = React.useState({});

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
          onClick={() => setRateModalOpen(true)}
          fullWith
          color="primary"
          sx={{ backgroundColor: "orange", color: "white", m: 1 }}
        >
          Rate Match
        </Button>
        <Modal
          open={rateModalOpen}
          onClose={() => setRateModalOpen(false)}
        >
          <Box sx={modalStyle}>
            <Typography id="rate-match-title" variant="h6" component="h2">
              How good of a match was {props.match.name}?
            </Typography>
            <Typography component="legend">How likely would you live with this person?</Typography>
            <Rating
              name="simple-controlled"
              value={ratings['live_with_rating']}
              onChange={(event, newValue) => {
                setRatings({...ratings, live_with_rating: newValue});
              }}
            />
            <Typography component="legend">How well did this persons apartment must-haves align with yours?</Typography>
              <Rating
                name="simple-controlled"
                value={ratings['must_haves']}
                onChange={(event, newValue) => {
                  setRatings({...ratings, must_haves: newValue});
                }}
            />
            <Typography component="legend">How well did this persons roommate qualities align with yours?</Typography>
              <Rating
                name="simple-controlled"
                value={ratings['roommate_qualities']}
                onChange={(event, newValue) => {
                  setRatings({...ratings, roommate_qualities: newValue});
                }}
            />
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setRateModalOpen(false)} sx={{ backgroundColor: "orange", color: "white", m: 1 }}>
              Save
            </Button>
          </Box>
          </Box>
        </Modal>
      </Box>
    </Card>
  );
}

export default ProfileCard;
