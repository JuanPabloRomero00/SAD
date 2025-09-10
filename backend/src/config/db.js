require('dotenv').config();

console.log("🌍 URI desde .env:", process.env.MONGODB_URI);

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

(async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    process.exit(1);
  }
})();