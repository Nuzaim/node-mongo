const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://127.0.0.1:27017/";
const dbname = "conFusion";

mongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);

    console.log("Connected to the server successfully!");

    const db = client.db(dbname);
    const collection = db.collection("dishes");

    collection.insertOne(
        {
            "name" : "nuzaim",
            "description" : "something"
        },
        (err,result)=>{
            assert.equal(err,null);
            console.log("After Insert\n");
            console.log(result.ops);

            collection.find({}).toArray((err,docs)=>{
                assert.equal(err,null);
                console.log("Found\n");
                console.log(docs);

                db.dropCollection("dishes",(err,result)=>{
                    assert.equal(err,null);
                    client.close();
                });
            });
        }
    );
});