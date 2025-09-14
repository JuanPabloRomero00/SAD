/*const User = require('../models/User');

async function createDefaultAdmin() {
  const adminEmail = 'admin@oursad.com';
  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    const admin = new User({
      name: 'Admin',
      surname: 'Principal',
      document: 'ADMIN123',
      birthdate: new Date('1990-01-01'),
      email: adminEmail,
      password: 'adminpassword',
      role: 'admin'
    });
    await admin.save();
    console.log('Administrador por defecto creado.');
  }
}

module.exports = createDefaultAdmin;*/