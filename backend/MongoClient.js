// IN THIS FILE WE CONNECT TO OUR MONGODB ATLAS (OUR DATABASE STORING PROFILES AND MATCHES)

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

// MongoDB Atlas connection URI
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@maincluster.l7xdik2.mongodb.net/`;
const dbName = "roommate-matching";
const collectionName = "profiles";

async function findAllOtherProfiles(baseProfile) {
  const client = new MongoClient(uri);
  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Don't include a match with yourself
    const query = { _id: { $nin: [baseProfile._id] } };

    const options = {
      // Sort returned documents in ascending order by name (A->Z)
      sort: { name: 1 },
    };

    // Execute query
    const cursor = collection.find(query, options);

    // Print a message if no documents were found
    if ((await collection.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    const docs = [];
    for await (const doc of cursor) {
      docs.push(doc);
    }
    return docs;
  } catch (error) {
    console.error("Error occurred: ", error);
    throw error;
  } finally {
    await client.close();
  }
}

// Function to fetch one document by ID
async function getDocumentById(id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const document = await collection.findOne({ _id: new ObjectId(id) });

    return document;
  } catch (error) {
    console.error("Error occurred: ", error);
    throw error;
  } finally {
    await client.close();
  }
}

async function insertMatchesIntoProfile(id, matchesIds) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const filter = { _id: new ObjectId(id) };

    // Specify the update to set a value for the matches field
    const updateDoc = {
      $set: {
        matches: matchesIds,
      },
    };
    // Update the first document that matches the filter
    const updatedDocument = await collection.updateOne(filter, updateDoc);
    return updatedDocument;
  } catch (error) {
    console.error("Error occurred: ", error);
    throw error;
  } finally {
    await client.close();
  }
}

async function insertDocument(docInput) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const document = await collection.insertOne(docInput);

    return document;
  } catch (error) {
    console.error("Error occurred: ", error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = {
  insertDocument,
  getDocumentById,
  findAllOtherProfiles,
  insertMatchesIntoProfile,
};
