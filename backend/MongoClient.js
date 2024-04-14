const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()

// MongoDB Atlas connection URI
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@maincluster.l7xdik2.mongodb.net/`;
const dbName = 'roommate-matching';
const collectionName = 'profiles';

// Function to fetch one document by ID
async function getDocumentById(id) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const document = await collection.findOne({ _id: new ObjectId(id) });

        return document;
    } catch (error) {
        console.error('Error occurred: ', error);
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
        console.error('Error occurred: ', error);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = { insertDocument };