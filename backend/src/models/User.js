const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dni: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "employee", "user"],
    default: "user",
    required: true,
  },
  plan: {
    type: String,
    enum: ["basico", "completo", "premium"],
    required: function () {
      return this.role === "user";
    },
  },
  active: { type: Boolean, default: true },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
});

module.exports = mongoose.model("User", userSchema);
