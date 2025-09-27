const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dni: { type: String, required: true },
  birthdate: { type: Date, required: true },
  memberId: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['admin', 'employee', 'user'], 
    required: true 
  }
}, { collection: 'digitalCredential' }); 

module.exports = mongoose.model('Credential', credentialSchema);