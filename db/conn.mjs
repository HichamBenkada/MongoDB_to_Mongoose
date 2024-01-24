import { MongoClient } from 'mongodb';
const connectStr = process.env.ATLAS_URI
const client = new MongoClient(connectStr);

let conn;
//only posible asynchronous at high level because mjs module file
try {
    conn = await client.connect();
    console.log("Success! Connected to MongoDB");
}catch(e){
    console.error(e);
}

let db = conn.db("sample_training");

export default db;