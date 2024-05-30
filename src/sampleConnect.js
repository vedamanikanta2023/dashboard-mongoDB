import { MongoClient } from 'mongodb';
import { mongoDBConnectionString } from './constants.js';

export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect(); 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

 export async function executeStudentCrudOperations() {
    const uri = mongoDBConnectionString;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = await mongoClient.db('dashboard');
        // console.log('db- - ->',db);
        const collection = await db.collection("dashboard_data");
        return collection;
    } finally {
        // await mongoClient.close();
    }
 }

 executeStudentCrudOperations()