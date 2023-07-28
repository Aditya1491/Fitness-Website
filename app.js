const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

// Replace the connection string with your MongoDB Atlas connection string
const atlasConnectionString = 'mongodb+srv://ady:aditya1234@cluster0.3uzawjw.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err.message);
    });

const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS
app.use('/static/', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // Helps bring the data to the server

// PUG
app.set('view engine', 'pug'); // For serving template engine
app.set('views', path.join(__dirname, 'views')); // Set Views Directory

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("Item saved to the database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the database");
    });
});

// START SERVER
app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
