// Database REQUESTS:
// Create a profile after a user clicks submit on the SignupPage
// Generate matches for a user (call our KNN complex algorithm) and save the matches to our database
// Get a users matches from the database to show on the MatchesPage

const express = require("express");
const cors = require("cors");

const { findNearestMatches } = require("./utils/matches");
const {
  insertDocument,
  getDocumentById,
  findAllOtherProfiles,
  insertMatchesIntoProfile,
} = require("./MongoClient");

const app = express();

const PORT = 8081;

app.use(cors());
app.use(express.json());

app.post("/create-profile", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const doc = await insertDocument(req.body);
  res.json({ status: 200, insertedDoc: doc });
});

app.post("/generate-matches", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const profile = await getDocumentById(req.body.id);
  const allProfiles = await findAllOtherProfiles(profile);
  const allGeneratedMatches = findNearestMatches(profile, allProfiles);
  const updatedDocument = await insertMatchesIntoProfile(
    profile._id,
    allGeneratedMatches
  );
  res.json({ status: 200, updatedDoc: updatedDocument });
});

app.post("/get-matches", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const doc = await getDocumentById(req.body);
  res.json({ status: 200, doc });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
