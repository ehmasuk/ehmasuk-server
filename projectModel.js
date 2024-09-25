const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    liveLink: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("projects", projectSchema);
