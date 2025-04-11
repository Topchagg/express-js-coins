const mongoose = require('mongoose');

const CoinSchema = mongoose.Schema({
    name: String,
    description: String,
    price:Number,
    year:String,
    denomination: Number,
    country: String,
})

const Coins = mongoose.model('Coins',CoinSchema)

module.exports = Coins