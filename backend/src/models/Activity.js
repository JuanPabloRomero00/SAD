const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number },
  location: { type: String },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // <-- nuevo campo
});

module.exports = mongoose.model("Activity", ActivitySchema);
