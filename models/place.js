const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
    _id: String,
    listing_url: String,
    name: String,
    summary: String,
    description: String,
    price: Number,
    amenities: [String],
    images : {
        picture_url : String
    }
})

const PlaceModel = mongoose.model('listingsAndReviews', placeSchema, 'listingsAndReviews')

module.exports = PlaceModel