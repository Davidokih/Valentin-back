const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    paired: {
        type: Boolean,
    },
    pair: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pairs"
    } ]
});

module.exports = mongoose.model("users", userModel);