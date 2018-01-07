// MongoDB
'use strict';

const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

/*
    Module that connects to MongoDB and performs crud
*/

module.exports = (dsn, collection) => {
    var db;
    var col;

    /*Connect to the database and use the specified collection*/
    async function connect() {
        db  =  await mongo.connect(dsn);
        col = await db.collection(collection);
    }


    return {
        /* Get all documents from the collection */
        async getAll() {
            await connect();
            const res = await col.find().toArray();

            await db.close();
            return res;
        },

        /* Add a document to the collection */
        async create(object) {
            await connect();
            col.insert(object);
            await db.close();
        },

        /* Get a document from the collection */
        async find(id) {
            await connect();
            const result = await col.find({"_id": ObjectId(id)}).toArray();

            await db.close();
            return result;
        },

        /* Update a document from the collection */
        async update(id, object) {
            await connect();
            col.update({  "_id": ObjectId(id) }, object);
            await db.close();
        },

        /* Delete a document from the collection */
        async delete(id) {
            await connect();
            col.remove({  "_id": ObjectId(id) });
            await db.close();
        },

        /* Delete everything in the collection */
        async deleteAll() {
            await connect();
            col.remove();
            await db.close();
        }
    };
};
