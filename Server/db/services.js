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

async function getAllServices() {
  try {
    const { rows: service } = await client.query(`
    SELECT *
    FROM services
    `);
    console.log('These are our all our services :', service);
    return service;
  } catch (error) {
    throw error;
  }
}

async function getServiceByUser({ username }) {
  try {
    const { rows: service } = await client.query(
      `
    SELECT *
    FROM services
    JOIN users ON services.id = users."serviceId"
    WHERE username = $1
    `,
      [username]
    );
    console.log('These are our services by username :', service);
    return service;
  } catch (error) {
    throw error;
  }
}

async function getServiceById(id) {
  try {
    const { rows: service } = await client.query(
      `
    SELECT *
    FROM services
    WHERE id = ${id}
    `
    );
    console.log('These are our services by id:', service);
    return service;
  } catch (error) {
    throw error;
  }
}

async function getServiceByDate(date) {
  try {
    const { rows: service } = await client.query(
      `
    SELECT *
    FROM services
    WHERE date = $1
    `,
      [date]
    );
    console.log('These are our services by date:', service);
    return service;
  } catch (error) {
    throw error;
  }
}

async function getServiceByName(name) {
  try {
    const { rows: service } = await client.query(
      `
    SELECT *
    FROM services
    WHERE name = $1
    `,
      [name]
    );
    console.log('These are our services by service name:', service);
    return service;
  } catch (error) {}
}

async function updateService({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    const {
      rows: [service],
    } = await client.query(
      `
    UPDATE services
    SET ${setString}
    WHERE id = ${id}
    RETURNING *;
    `,

      Object.values(fields)
    );
    console.log('These are my update services: ', service);
    return service;
  } catch (error) {
    throw error;
  }
}

async function destroyService(id) {
  try {
    const {
      rows: [service],
    } = await client.query(
      `
    DELETE FROM services
    WHERE id = $1
    RETURNING *,
    `,
      [id]
    );
    console.log('These are my destroy services: ', service);
    return service;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createService,
  getAllServices,
  getServiceByUser,
  getServiceById,
  getServiceByName,
  getServiceByDate,
  updateService,
  destroyService,
};
