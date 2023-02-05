const mongoClient = require("mongodb").MongoClient;
const dboper = require("./operations");

const url = "mongodb://127.0.0.1:27017/";
const dbname = "conFusion";

mongoClient.connect(url).then((client)=>{
    console.log("Connected to the server successfully!");

    const db = client.db(dbname);
    
    dboper.insertDocument(db,{name : "Vadonut",description : "Test"},"dishes")
        .then((result)=>{
            console.log("Insert Document:\n",result.ops);
            return dboper.findDocuments(db,"dishes");
            }
        ).then((docs)=>{
            console.log("Found documents:\n", docs);
            return dboper.updateDocument(db,{name : "Vadonut"},{description : "Updated Test"},"dishes");
            }
        ).then((result)=>{
            console.log("Updated Document:\n", result.result);
            return dboper.findDocuments(db,"dishes");
            }
        ).then((docs)=>{
            console.log("Found Updated Documents:\n", docs);
            return db.dropCollection("dishes");
            }
        ).then((result)=>{
                console.log("Dropped Collection: ",result);
                return client.close();
                }
        ).catch((err)=>{
            console.log("Error Occured: " + err);
            }
        );
}).catch((err)=>{
    console.log("Error Occured: " + err);
});