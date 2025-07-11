const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(cors());

// Connect once and reuse client
client.connect().then(() => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const notesCollection = db.collection('secureNotes');
   

  //PASSWORDS
  app.get('/', async (req, res) => {
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  });

  app.post('/', async (req, res) => {
    const password = req.body;
    const result = await collection.insertOne(password);
    res.send({ success: true, result });
  });

  app.put('/', async (req, res) => {
    const { id, site, username, password } = req.body;
    const result = await collection.updateOne(
      { id },
      { $set: { site, username, password } }
    );
    res.send({ success: true, result });
  });

  app.delete('/', async (req, res) => {
    const { id } = req.body;
    const result = await collection.deleteOne({ id });
    res.send({ success: true, result });
  });

//SECURE NOTES
// GET all secure notes
  app.get('/notes', async (req, res) => {
    try {
      const notes = await notesCollection.find({}).toArray();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
  });

  // POST a new secure note
  app.post('/notes', async (req, res) => {
    try {
      const note = req.body;
      const result = await notesCollection.insertOne(note);
      res.send({ success: true, result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save note' });
    }
  });

  // DELETE a note by custom ID
  app.delete('/notes/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await notesCollection.deleteOne({ id });
      res.send({ success: true, result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete note' });
    }
  });


  // 🔐 SECURITY AUDIT METRICS
  app.get('/audit', async (req, res) => {
    try {
      const passwords = await collection.find({}).toArray();

      const seen = new Set();
      let reused = 0;
      let weak = 0;
      let strong = 0;

      for (const item of passwords) {
        const pass = item.password || '';

        if (pass.length < 8) {
          weak++;
        } else if (pass.length >= 12 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
          strong++;
        } else {
          weak++;
        }

        const combo = `${item.site}-${item.username}-${pass}`;
        if (seen.has(combo)) {
          reused++;
        } else {
          seen.add(combo);
        }
      }

      const total = passwords.length;
      const score = total === 0 ? 0 : Math.max(0, Math.min(100, Math.round(((strong * 2 - weak - reused) / total) * 100)));

      res.json({
        total,
        weakPasswords: weak,
        reusedPasswords: reused,
        strongPasswords: strong,
        securityScore: score,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to analyze passwords' });
    }
  });




  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});




