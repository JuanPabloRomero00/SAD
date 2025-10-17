const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  days: [{ type: Number, required: true,  min: 1, max: 7 }], // 1 (Lunes) a 7 (Domingo)
  time: { type: String, required: true },
  location: { type: String },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }],
  pastParticipants: [
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    removedAt: { type: Date, default: Date.now },
  },
],
  img: { type: String }, // <-- nuevo campo
});

module.exports = mongoose.model("Activity", ActivitySchema);
