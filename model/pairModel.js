const mongoose = require("mongoose");

const pairrModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = mongoose.model("pairs", pairrModel);