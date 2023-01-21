const client = require('./client');
const {
  createUser,
  getUserByUsername,
  getUserById,
  getUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  attachServicesToUser,
} = require('./users');
const {
  createService,
  getAllServices,
  getServiceByUser,
  getServiceById,
  getServiceByName,
  getServiceByDate,
  updateService,
  getServiceByActive,
  getServiceIdByUser,
} = require('./services');

async function dropTables() {
  try {
    console.log('Dropping All Tables!..');

    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS services;
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

    await client.query(`
    CREATE TABLE services (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      type varchar(255) NOT NULL,
      isremote BOOLEAN DEFAULT false,
      guests INT,
      cost DECIMAL,
      location varchar(255),
      date DATE,
      notes TEXT,
      isactive BOOLEAN DEFAULT true
    );

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      username varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      zipcode INT NOT NULL,
      email varchar(255) NOT NULL,
      "serviceId" INTEGER REFERENCES services(id),
      UNIQUE (username, email)
    );
    `);

    console.log('All tables created!');
  } catch (error) {
    console.error('Error creating tables!');
    throw error;
  }
}

async function createFakeServices() {
  try {
    const fakeServices = [
      {
        name: 'Sip n Paint',
        type: 'adult',
        isremote: false,
        guests: 8,
        cost: 160.0,
        location: 'brewery',
        date: '2023-02-05',
        notes: 'would love to have this at my local brewery!',
        isactive: true,
      },
      {
        name: 'Painting for family',
        type: 'kids',
        isremote: false,
        guests: 4,
        cost: 80.0,
        location: 'home',
        date: '2023-05-13',
        notes: 'its my sons birthday',
        isactive: true,
      },
    ];
    const service = await Promise.all(fakeServices.map(createService));
    console.log('Services created:');
    console.log(service);
    console.log('Finished creating services!');
  } catch (error) {
    console.error('Error creating services!');
    throw error;
  }
}

async function createFakeUsers() {
  try {
    const fakeUsers = [
      {
        serviceId: 2,
        name: 'ashley',
        username: 'ashley',
        password: 'ashley1!',
        zipcode: '80504',
        email: 'ashley@gmail.com',
      },
      {
        serviceId: 1,
        name: 'megan',
        username: 'megan',
        password: 'megan1!',
        zipcode: '80521',
        email: 'megan@gmail.com',
      },
      {
        serviceId: 1,
        name: 'chelsea',
        username: 'chelsea',
        password: 'chelsea1!',
        zipcode: '73049',
        email: 'chelsea@gmail.com',
      },
      {
        serviceId: 2,
        name: 'philip',
        username: 'philip',
        password: 'philip1!',
        zipcode: '70001',
        email: 'philip@gmail.com',
      },
    ];
    const users = await Promise.all(fakeUsers.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function testDB() {
  try {
    //*******************SERVICES TESTS******************//
    console.log('starting to test services');
    const allServices = await getAllServices();
    console.log('testing getAllServices', allServices);

    const serviceByUser = await getServiceByUser('megan');
    console.log('testing getServiceByUser', serviceByUser);

    const serviceById = await getServiceById(1);
    console.log('testing getServiceById', serviceById);

    const serviceByDate = await getServiceByDate('2023-02-05T07:00:00.000Z');
    console.log('testing getServiceByDate', serviceByDate);

    const serviceByName = await getServiceByName('Sip n Paint');
    console.log('testing getServiceByName', serviceByName);

    const serviceByActive = await getServiceByActive(true);
    console.log('testing getServiceByActive', serviceByActive);

    const serviceIdByUser = await getServiceIdByUser('ashley');
    console.log('testing getServiceIdByUser', serviceIdByUser);

    const updatedService = await updateService(allServices[0].id, {
      name: 'Paint n Sip',
      type: 'kid',
      isremote: true,
      guests: 10,
      cost: 160.0,
      location: 'home',
      date: '2023-02-09',
      notes: 'would love to have this at my cozy home!',
      isactive: false,
    });
    console.log('testing update service at index 0', updatedService);

    // *******************USER TESTS******************//

    const userByUsername = await getUserByUsername('ashley');
    console.log('testing getUserByUsername', userByUsername);

    const allUsers = await getAllUsers();
    console.log('These are all the users!', allUsers);

    const userById = await getUserById(1);
    console.log('testing getUserById', userById);

    const userByUser = await getUser('ashley', 'ashley1!');
    console.log('testing getUser', userByUser);

    const userByEmail = await getUserByEmail('ashley@gmail.com');
    console.log('testing getUserByemail', userByEmail);

    const updatedUser = await updateUser(allUsers[0].id, {
      name: 'sandy',
      username: 'rockstar',
      password: 'lemons!',
      zipcode: '12324',
      email: 'sandy@gmail.com',
    });
    console.log('testing updateUsers', updatedUser);

    const attachedUserServ = await attachServicesToUser(allUsers);
    console.log(
      'these are all the users w services attached:',
      attachedUserServ
    );

    // const updatedPassword = await updateUserPassword(1, 'melons');
    // console.log('this is my updated password', updatedPassword);

    console.log('finished testing database!');
  } catch (error) {
    console.log('error testing database');
    console.error(error);
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createFakeServices();
    await createFakeUsers();

    await testDB();
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
