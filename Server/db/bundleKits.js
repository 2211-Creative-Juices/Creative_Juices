const client = require('./client');

async function createBundleKit({ name, quantity, cost }) {
  try {
    const {
      rows: [bundle],
    } = await client.query(
      `
            INSERT INTO bundlekit(name, quantity, cost)
            VALUES ($1, $2, $3)
         
            RETURNING *;
            `,
      [name, quantity, cost]
    );
    return bundle;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBundleKit,
};
