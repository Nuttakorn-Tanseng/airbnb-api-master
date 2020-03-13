const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //comment
const mongoose = require('mongoose');
const Place = require('./models/place');

const uri = "mongodb://admin:admin@cluster0-shard-00-00-xwype.gcp.mongodb.net:27017,cluster0-shard-00-01-xwype.gcp.mongodb.net:27017,cluster0-shard-00-02-xwype.gcp.mongodb.net:27017/sample_airbnb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).
    then(() => console.log('Connected')).
    catch(err => console.log('Caught', err.stack));

app.use(express.json());
app.get('/', (req, res) => res.send("Hello, World"));

app.get('/api/airbnb/listings', async (req, res) => {

    // Get data from MongoDB
    const query = {};
    const places = await Place.find(query).limit(20);
    console.log(places);
    res.json(places);
})

// Get listing by ID
app.get('/api/airbnb/listings/:id', async (req, res) => {

    // Get data from MongoDB
    console.log(req.params.id);
    const query = { _id: req.params.id };
    const places = await Place.find(query);
    console.log(places);
    res.json(places);

})

// Get listing by city name
app.get('/api/airbnb/listings/city/:cityname', async (req, res) => {

    // Get data from MongoDB
    console.log(req.params.cityname);
    const query = { "address.market": req.params.cityname };
    const places = await Place.find(query);
    console.log(places);
    res.json(places);
})

// Get listing by rating
app.get('/api/airbnb/listings/rating/:min', async (req, res) => {

    // Get data from MongoDB
    console.log(req.params.review_scores_rating);
    const query = { "review_scores.review_scores_rating": {$gt : parseInt(req.params.min)}};
    const places = await Place.find(query).select({"reviews": 0, "host":0});
    console.log(places);
    res.json(places);
})


app.listen(port, (req, res) => console.log(`Example app listening on port ${port}!`));

