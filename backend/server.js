const express = require('express');
const cors = require('cors');

const { insertDocument, getDocumentById, findAllMatches, insertMatchesIntoProfile } = require('./MongoClient');

const app = express();

const PORT = 8081;

app.use(cors());
app.use(express.json())

app.post('/create-profile', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const doc = await insertDocument(req.body);
    res.json({ status: 200, insertedDoc: doc });
});

app.post('/generate-matches', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const profile = await getDocumentById(req.body.id);
    const allGeneratedMatches = await findAllMatches(profile);
    const updatedDocument = await insertMatchesIntoProfile(profile._id, allGeneratedMatches);
    res.json({ status: 200, updatedDoc: updatedDocument })
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
