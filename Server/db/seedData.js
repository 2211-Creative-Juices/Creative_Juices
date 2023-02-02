const client = require('./client');
require('dotenv').config();

const adminPass = process.env.ADMIN_PASS;
const adminUser = process.env.ADMIN_USER;

const {
  createUser,
  getUserByUsername,
  getUserById,
  getUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  updateUserPassword,

  // attachServicesToUser,
  // attachBundleToUser,
} = require('./users');
const {
  createService,
  getAllServices,
  // getServiceByUser,
  getServicesByOrderId,
  getServicesByUser,
  getServiceById,
  getServiceByName,
  getServiceByDate,
  updateService,
  getServiceByActive,
  attachServicesToOrder,

  // getServiceIdByUser,
  // getServiceByPurchaserId,
} = require('./services');
const {
  createBundleKit,
  getAllBundles,
  getBundleByUser,
  getBundleByOrderId,
  getBundleById,
  updateBundle,
  attachBundleToOrder,
} = require('./bundleKits');

const {
  createOrder,
  getOrderById,
  getAllOrders,
  // attachUserToOrder,
  getAllOrdersByUser,
  getOrdersByIsNotComplete,
} = require('./orders');

async function dropTables() {
  try {
    console.log('Dropping All Tables!..');

    await client.query(`
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS services;
    DROP TABLE IF EXISTS bundlekit;
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
CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      username varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      zipcode INT NOT NULL,
      email varchar(255) NOT NULL,
      isadmin BOOLEAN DEFAULT false,
      UNIQUE (username, email)
    );

    CREATE TABLE bundlekit (
      id SERIAL PRIMARY KEY,
      bundlename varchar(255) DEFAULT 'Paint-Kit',
      quantity INT NOT NULL,
      bundlecost DECIMAL
    );
    
    CREATE TABLE services (
      id SERIAL PRIMARY KEY,
      name varchar(255) DEFAULT 'paint',
      type varchar(255) NOT NULL,
      isremote BOOLEAN DEFAULT false,
      guests INT,
      cost DECIMAL,
      location varchar(255),
      date varchar(255),
      notes TEXT,
      isactive BOOLEAN DEFAULT true
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      orderdate varchar(255),
     "purchaserId" INTEGER REFERENCES users(id),
     iscomplete BOOLEAN default false,
     incart BOOLEAN default true,
     "serviceId" INTEGER REFERENCES services(id) DEFAULT null,
     "bundlekitId" INTEGER REFERENCES bundlekit(id) DEFAULT null
    );
    `);

    console.log('All tables created!');
  } catch (error) {
    console.error('Error creating tables!');
    throw error;
  }
}

async function createFakeOrder() {
  try {
    const fakeOrder = [
      {
        orderdate: '1-12-23',
        purchaserId: 2,
        serviceId: 2,
        bundlekitId: 1,
      },
    ];
    const order = await Promise.all(fakeOrder.map(createOrder));
    console.log('Order created:');
    console.log(order);
    console.log('Finished creating Order!');
  } catch (error) {
    console.error('Error creating fakeOrder');
    throw error;
  }
}

async function createFakeBundle() {
  try {
    const fakeBundle = [
      {
        bundlename: 'Paint Kit: Spring',
        quantity: 1,
        bundlecost: 50.0,
      },
      {
        bundlename: 'Paint Kit: Summer',
        quantity: 1,
        bundlecost: 20.0,
      },
    ];
    const bundle = await Promise.all(fakeBundle.map(createBundleKit));
    console.log('Bundle created:');
    console.log(bundle);
    console.log('Finished creating Bundle!');
  } catch (error) {
    console.error('Error creating fakeBundle');
    throw error;
  }
}
async function createFakeServices() {
  try {
    const fakeServices = [
      {
        type: 'adult',
        isremote: false,
        guests: 8,
        cost: 160.0,
        location: 'brewery',
        date: '2023-02-05',
        notes: 'would love to have this at my local brewery!',
      },
      {
        type: 'kids',
        isremote: false,
        guests: 4,
        cost: 80.0,
        location: 'home',
        date: '2023-05-13',
        notes: 'its my sons birthday',
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
        name: 'ashley',
        username: 'ashley',
        password: 'ashley1!',
        zipcode: '80504',
        email: 'ashley@gmail.com',
      },
      {
        name: 'megan',
        username: 'megan',
        password: 'megan1!',
        zipcode: '80521',
        email: 'megan@gmail.com',
      },
      {
        name: 'chelsea',
        username: 'chelsea',
        password: 'chelsea1!',
        zipcode: '73049',
        email: 'chelsea@gmail.com',
      },
      {
        name: 'philip',
        username: 'philip',
        password: 'philip1!',
        zipcode: '70001',
        email: 'philip@gmail.com',
      },
      {
        name: 'shelley',
        username: `${adminUser}`,
        password: `${adminPass}`,
        isadmin: true,
        zipcode: '80504',
        email: 'shelley@gmail.com',
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
    //*******************BUNDLE KIT TEST********************//

    console.log('starting to test bundle kit');
    const allBundles = await getAllBundles();
    console.log('testing get all bundles', allBundles);

    // const userBund = await getBundleByUser('chelsea');
    // console.log('testing getBundleByUser', userBund);

    const idBund = await getBundleById(1);
    console.log('testing getBundleById', idBund);

    const bundleByOrderId = await getBundleByOrderId(1);
    console.log('testing getServiceIdByUser', bundleByOrderId);

    const updatedBund = await updateBundle(allBundles[0].id, {
      bundlename: 'fall fun!',
      quantity: 2,
      bundlecost: 90.0,
    });
    console.log('testing update bundle at index 0', updatedBund);

    //*******************SERVICES TESTS******************//

    console.log('starting to test services');
    const allServices = await getAllServices();
    console.log('testing getAllServices', allServices);

    const serviceByUser = await getServicesByUser(2);
    console.log('testing getServiceByUser', serviceByUser);

    const serviceById = await getServiceById(1);
    console.log('testing getServiceById', serviceById);

    const serviceByDate = await getServiceByDate('2023-02-05');
    console.log('testing getServiceByDate', serviceByDate);

    const serviceByName = await getServiceByName('Sip n Paint');
    console.log('testing getServiceByName', serviceByName);

    const serviceByActive = await getServiceByActive(true);
    console.log('testing getServiceByActive', serviceByActive);

    const serviceIdByOrderId = await getServicesByOrderId(1);
    console.log('testing getServicesByOrderId', serviceIdByOrderId);

    // const updatedService = await updateService(allServices[0].id, {
    //   name: 'Paint n Sip',
    //   type: 'kid',
    //   isremote: true,
    //   guests: 10,
    //   cost: 160.0,
    //   location: 'home',
    //   date: '2023-02-09',
    //   notes: 'would love to have this at my cozy home!',
    //   isactive: false,
    // });
    // console.log('testing update service at index 0', updatedService);

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

    // const updatedUser = await updateUser(allUsers[3].id, {
    //   name: 'sandy',
    //   username: 'rockstar',
    //   password: 'lemons!',
    //   zipcode: '12324',
    //   email: 'sandy@gmail.com',
    // });
    // console.log('testing updateUsers', updatedUser);

    // const attachedUserServ = await attachServicesToUser(allUsers);
    // console.log(
    //   'these are all the users w services attached:',
    //   attachedUserServ[4].services
    // );

    // const attachedUserBundle = await attachBundleToUser(allUsers);
    // console.log(
    //   'these are all the users w bundles attached:',
    //   attachedUserBundle
    // );
    // console.log(
    //   'these are all the users w bundles attached BUNDLES:',
    //   attachedUserBundle[3].bundles
    // );

    // const updatedPassword = await updateUserPassword(1, 'melons');
    // console.log('this is my updated password', updatedPassword);

    //*******************ORDER TEST********************//

    console.log('starting to test order');
    const allOrders = await getAllOrders();
    console.log('testing get all orders:', allOrders);

    const orderById = await getOrderById(1);
    console.log('testing get order by id:', orderById);

    const allMyOrders = await getAllOrdersByUser('ashley');
    console.log('testing get all orders:', allMyOrders);

    // const orderBundle = await attachBundleToOrder(allOrders);
    // console.log('testing attach bundle to order:', orderBundle);

    const attachServiceOrder = await attachServicesToOrder(allOrders);
    console.log('testing attach services to order:', attachServiceOrder);
    console.log(
      'these are all the orders w services attached',
      attachServiceOrder[0]
    );

    const attachBundlesOrder = await attachBundleToOrder(allOrders);
    console.log('testing attach bundles to order:', attachBundlesOrder);
    console.log(
      'these are all the orders w bundles attached',
      attachBundlesOrder[0]
    );
    // const ordersbyUser = await getAllOrdersByUser('shelleyadmin');
    // console.log('this is getall orders by username', ordersbyUser);
    // const ordersbyMegan = await getAllOrdersByUser('megan');
    // console.log('this is getall orders by username', ordersbyMegan);
    // const ordersbyChelsea = await getAllOrdersByUser('Chelsea');
    // console.log('this is getall orders by username', ordersbyChelsea);
    // const ordersbyPhilip = await getAllOrdersByUser('philip');
    // console.log('this is getall orders by username', ordersbyPhilip);
    // const ordersbySandy = await getAllOrdersByUser('rockstar');
    // console.log('this is getall orders by username', ordersbySandy);

    // const serviceByPurOrd = await getServiceByPurchaserId(2);
    // console.log('this is the service by purchaser id', serviceByPurOrd);

    // const bundByPurOrd = await getBundleByPurchaserId(2);
    // console.log('this is the bundle kit by purchaser id', bundByPurOrd);

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
    await createFakeUsers();
    await createFakeBundle();
    await createFakeServices();
    await createFakeOrder();

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
