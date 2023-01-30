const client = require('./client');
// const {attachServicesToUser} = require('/users')

async function createService({
  type,
  isremote,
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
          INSERT INTO services (type, isremote, guests, cost, location, date, notes)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
          `,
      [type, isremote, guests, cost, location, date, notes]
    );
    console.log('first create service: ', service);
    return service;
  } catch (error) {
    console.error('this is error in createservices', error);
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

async function getServiceByUser(username) {
  try {
    const { rows: service } = await client.query(
      `
    SELECT services.*
    FROM services
    JOIN users ON services.id = users."serviceId"
    WHERE username = $1;
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
    WHERE id = ${id};
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
    WHERE date = $1;
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
    WHERE name = $1;
    `,
      [name]
    );
    console.log('These are our services by service name:', service);
    return service;
  } catch (error) {
    throw error;
  }
}

async function getServiceByActive(isactive) {
  try {
    const { rows: service } = await client.query(
      `
    SELECT *
    FROM services
    WHERE isactive = $1;
    `,
      [isactive]
    );
    console.log('These are our services by if active', service);
    return service;
  } catch (error) {
    throw error;
  }
}

//getServiceIdbyUser
async function getServiceIdByUser(username) {
  try {
    const {
      rows: [service],
    } = await client.query(
      `
    SELECT "serviceId" FROM users
    WHERE username = $1;
    `,
      [username]
    );

    return service;
  } catch (error) {
    throw error;
  }
}

async function getServiceByPurchaserId(id) {
  console.log('this is the purchaser Id:', id);
  try {
    const {
      rows: [service],
    } = await client.query(
      `
    SELECT services.* FROM services
    JOIN users on services.id = users."serviceId" 
    JOIN orders on orders."purchaserId" = users.id 
    WHERE orders."purchaserId" = ${id};
    `
    );

    return service;
  } catch (error) {
    console.error(error);
  }
}

async function updateService(id, { ...fields }) {
  console.log('id:', id, 'update fields:', fields);
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

// async function destroyService(id) {
//   console.log('this is the id i am trying to delete:', id);
//   try {
//     await client.query(
//       `
//       DELETE users."serviceId" FROM users WHERE "serviceId" = $1;
//       `,
//       [id]
//     );

//     const {
//       rows: [service],
//     } = await client.query(
//       `
//     DELETE FROM services
//     WHERE id = $1
//     RETURNING *;
//     `,
//       [id]
//     );

//     console.log('These are my destroy services: ', service);
//     return service;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  createService,
  getAllServices,
  getServiceByUser,
  getServiceById,
  getServiceByName,
  getServiceByDate,
  updateService,
  getServiceByActive,
  getServiceIdByUser,
  getServiceByPurchaserId,
};
