
const express = require("express");
const cors = require("cors");

const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://bloodDonation:6ynWPE15cXJRnqYT@cluster0.mg3dwiq.mongodb.net/donorDb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const donorCollection = client.db("donorDb").collection("donor");

    app.post("/donor", async (req, res) => {
       {
        const newDonor = req.body;
        const result = await donorCollection.insertOne(newDonor);
        res.send(result)
      } 
    });

    const feedbackCollection = client.db("feedback").collection("feedback");

    app.post("/feedback", async (req,res) =>{
      {
      const newFeedback = req.body;
      console.log(newFeedback);
      const result = await feedbackCollection.insertOne(newFeedback);
      res.send(result)
      }
   });
   
   
   app.get("/feedback", async (req,res) =>{
    {
      const cursor = feedbackCollection.find();
      console.log(newFeedback);
      const result = await cursor.toArray();
      res.send(result)
    }
   });

    const patientCollection =client.db("patientDb").collection("patient");

    app.post("/patient", async(req,res) =>{

      const newPatient =req.body;
      
      console.log(newPatient)
      
      const result = await patientCollection.insertOne(newPatient);
      
      res.send(result)
      
      });



    app.get("/", (req, res) => {
      res.send("blood donation is running");
    });

    app.listen(port, () => {
      console.log( `blood donation server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();