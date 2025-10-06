const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Basico', 'Standard', 'Full'], 
    required: true 
  },
  description: { type: String },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Plan', planSchema);