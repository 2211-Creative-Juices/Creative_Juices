// const APIURL = `https://creative-juices.fly.dev/api`;
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

export const getOrderByPurchaserId = async (token, purchaserId) => {
  try {
    const response = await fetch(`${BASE_API}/orders/${purchaserId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    console.log('this is results in ordersapi', results);
    return results;
  } catch (error) {
    console.error(error);
  }
};