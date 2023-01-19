const client = require('./client');

async function createService({
  name,
  type,
  isRemote,
  guests,
  cost,
  location,
  date,
  notes,
}) {
  try {
    const {
      rows: [service],
    } = await client.query(
      `
          INSERT INTO services (name, type, isRemote, guests, cost, location, date, notes)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
          `,
      [name, type, isRemote, guests, cost, location, date, notes]
    );
    return service;
  } catch (error) {
    throw error;
  }
}

module.exports = { createService };
