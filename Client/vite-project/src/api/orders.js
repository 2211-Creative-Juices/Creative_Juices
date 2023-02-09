// const BASE_API = `https://creative-juices.fly.dev/api`;
const BASE_API = `/api`;

export const getAllOrders = async () => {
  try {
    const response = await fetch(`${BASE_API}/orders`);
    const results = await response.json();

    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTheOrdersByUser = async (token, username) => {
  try {
    const response = await fetch(`${BASE_API}/orders/${username}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();

    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTheOrdersByUserWithBundKit = async (token, username) => {
  try {
    const response = await fetch(
      `${BASE_API}/orders/${username}/orders/bundles`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const results = await response.json();

    return results;
  } catch (error) {
    console.error(error);
  }
};

export const createNewOrder = async (
  token,
  orderDate,
  purchaserId,
  serviceId,
  bundlekitId
) => {
  try {
    const response = await fetch(`${BASE_API}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderDate,
        purchaserId,
        serviceId,
        bundlekitId,
      }),
    });
    const newOrder = await response.json();

    return newOrder;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async (
  token,
  orderId,
  orderdate,
  purchaserId,
  iscomplete,
  incart,
  serviceId,
  bundlekitId,
  paypalid
) => {
  console.log(
    'THREEEEE THINGS:',
    token,
    orderId,
    orderdate,
    purchaserId,
    iscomplete,
    incart,
    serviceId,
    bundlekitId,
    paypalid
  );
  try {
    const response = await fetch(`${BASE_API}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderdate,
        purchaserId,
        iscomplete,
        incart,
        serviceId,
        bundlekitId,
        paypalid,
      }),
    });
    const updatedOrder = await response.json();

    return updatedOrder;
  } catch (error) {
    console.error(error);
  }
};
