const client = require('./client');

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
  SELECT *
  FROM orders;
  `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createOrder({
  orderdate,
  purchaserId,
  iscomplete,
  incart,
  totalamount,
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders (orderdate, "purchaserId", iscomplete, incart, totalamount)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
      [orderdate, purchaserId, iscomplete, incart, totalamount]
    );
    console.log('this is the order:', order);
    return order;
  } catch (error) {
    console.log('this is error in adduserstoorders:', error);
    throw error;
  }
}

async function getOrderById(orderid) {
  try {
    const { rows: order } = await client.query(`
    SELECT *
    FROM orders
    WHERE id = ${orderid};
    `);
    console.log('this is our get order by id:', order);
    return order;
  } catch (error) {
    throw error;
  }
}

async function attachUserToOrder(orders) {
  const ordersToReturn = [...orders];
  try {
    const { rows: usersinfo } = await client.query(`
        SELECT *
        FROM users
        JOIN orders ON users.id = orders."purchaserId"
        `);

    for (const order of ordersToReturn) {
      const usersToAdd = usersinfo.filter(
        (user) => user.id === order.purchaserId
      );
      order.usersinfo = usersToAdd;
      console.log('this is the user to add:', usersToAdd);
    }

    console.log('this is the order to return:', ordersToReturn);
    return ordersToReturn;
  } catch (error) {
    console.log('this is the attach user to order error:', error);
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrderById,
  attachUserToOrder,
  getAllOrders,
};
