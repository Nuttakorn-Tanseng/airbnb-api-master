var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://admin:admin@cluster0-shard-00-00-faqqw.gcp.mongodb.net:27017,cluster0-shard-00-01-faqqw.gcp.mongodb.net:27017,cluster0-shard-00-02-faqqw.gcp.mongodb.net:27017/sample_airbnb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, client) {
    const collection = client.db("sample_airbnb").collection("listingsAndReviews");
    var query = { property_type: "House" };
    collection.find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
    });
});