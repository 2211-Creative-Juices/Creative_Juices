const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({
  name,
  username,
  password,
  zipcode,
  email,
  serviceId,
  bundlekitId,
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, username, password, zipcode, email, "serviceId", "bundlekitId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username, email) DO NOTHING
        RETURNING *;
        `,
      [name, username, hashedPassword, zipcode, email, serviceId, bundlekitId]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM users;
    `
    );
    return rows;
  } catch (error) {
    console.log('error gettingAllUsers');
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1`,
      [username]
    );

    return user;
  } catch (error) {
    console.log('Error getting user by Username');
    throw error;
  }
}

async function getUser(username, password) {
  if (!username || !password) return;
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    let passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return;
    }
  } catch (error) {
    console.error('Error getting user');
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT id, username, zipcode, email, name
    FROM users
    WHERE id=${id}`);

    return user;
  } catch (error) {
    console.error('Error getting user by ID');
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE email = $1
    `,
      [email]
    );

    return user;
  } catch (error) {
    console.error('Error getting user by eMail');
    throw error;
  }
}

//attachServiceToUser
async function attachServicesToUser(users) {
  const usersToReturn = [...users];

  try {
    const { rows: services } = await client.query(`
    SELECT *
    FROM services
    JOIN users ON services.id = users."serviceId"
    `);

    for (const user of usersToReturn) {
      const servicesToAdd = services.filter(
        (service) => service.id === user.serviceId
      );
      user.services = servicesToAdd;
    }
    return usersToReturn;
  } catch (error) {
    throw error;
  }
}

//attachBundleToUser
async function attachBundleToUser(users) {
  const usersToReturn = [...users];

  try {
    const { rows: bundles } = await client.query(`
    SELECT *
    FROM bundlekit
    JOIN users ON bundlekit.id = users."bundlekitId"
    `);

    for (const user of usersToReturn) {
      const bundlesToAdd = bundles.filter(
        (bundle) => bundle.id === user.bundlekitId
      );
      user.bundles = bundlesToAdd;
    }
    return usersToReturn;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, { ...fields }) {
  const updatedHashedPassword = await bcrypt.hash(fields.password, saltRounds);

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(',');
  try {
    if (setString.length > 0) {
      const {
        rows: [user],
      } = await client.query(
        `
        UPDATE users
        SET ${setString}
        WHERE id = ${id}
        RETURNING * 
        `,
        Object.values(fields)
      );
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function updateUserPassword(id, password) {
  console.log('id', id, 'pass to update:', password);
  const updatedHashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const rows = await client.query(
      `
        UPDATE users
        SET password = $2
        WHERE id = $1
        RETURNING password
        `,
      [id, updatedHashedPassword]
    );

    return updatedHashedPassword;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  getUserByEmail,
  updateUser,
  updateUserPassword,
  attachServicesToUser,
  getAllUsers,
  attachBundleToUser,
};
