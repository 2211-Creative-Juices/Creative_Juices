const client = require('./client');

async function dropTables() {
  try {
    console.log('Dropping All Tables!..');

    await client.query(`
    `);

    console.log('All Tables Dropped!..');
  } catch (error) {
    console.log('Error dropping tables!..');
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...');

    await client.query(``);

    console.log('All tables created!');
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    //await initial stuff
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
