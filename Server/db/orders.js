const client = require('./client');

async function addUsersToOrders({
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
            JOIN users ON orders."purchaserId" = users.id
            WHERE users.id = $1
            VALUES $1, $2, $3, $4, $5
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
module.exports = { addUsersToOrders };
