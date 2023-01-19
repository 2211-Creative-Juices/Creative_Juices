const client = require('./client');

async function createUser({ name, username, password, zipcode, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, username, password, zipcode, email)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username, email) DO NOTHING
        RETURNING id, name, username, zipcode, email
        `,
      [name, username, password, zipcode, email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser };
