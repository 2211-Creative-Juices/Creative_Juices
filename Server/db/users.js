const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({ name, username, password, zipcode, email }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, username, password, zipcode, email)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username, email) DO NOTHING
        RETURNING id, name, username, zipcode, email
        `,
      [name, username, hashedPassword, zipcode, email]
    );
    return user;
  } catch (error) {
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

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;

    return user;
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
    } = await client.query(`
    SELECT id, username, zipcode, email, name
    FROM users
    WHERE email=${email}`);

    return user;
  } catch (error) {
    console.error('Error getting user by eMail');
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  getUserByEmail,
};
