const client = require('./client');

async function createBundleKit({ bundlename, quantity, bundlecost }) {
  try {
    const {
      rows: [bundle],
    } = await client.query(
      `
            INSERT INTO bundlekit(bundlename, quantity, bundlecost)
            VALUES ($1, $2, $3)
         
            RETURNING *;
            `,
      [bundlename, quantity, bundlecost]
    );
    return bundle;
  } catch (error) {
    throw error;
  }
}

async function getAllBundles() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM bundlekit;
    `
    );
    return rows;
  } catch (error) {
    console.log('error gettingAllBundles');
    throw error;
  }
}

async function getBundleByUser(username) {
  try {
    const { rows: bundle } = await client.query(
      `
    SELECT *
    FROM bundlekit
    JOIN users ON bundlekit.id = users."bundlekitId"
    WHERE username = $1;
    `,
      [username]
    );
    console.log('These are our bundles by username :', bundle);
    return bundle;
  } catch (error) {
    throw error;
  }
}

async function getBundleById(id) {
  try {
    const {
      rows: [bundle],
    } = await client.query(`
    SELECT *
    FROM bundlekit
    WHERE id=${id}`);

    return bundle;
  } catch (error) {
    console.error('Error getting bundle by ID');
    throw error;
  }
}

module.exports = {
  createBundleKit,
  getAllBundles,
  getBundleByUser,
  getBundleById,
};
