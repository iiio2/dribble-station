const bcrypt = require('bcrypt');

const salt = await bcrypt.genSalt(10);

bcrypt.hash();
