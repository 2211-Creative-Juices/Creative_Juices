const APIURL = `http://localhost:8000/api`;

export const authenticateUser = async (
  username,
  password,
  method,
  name,
  zipcode,
  email
) => {
  console.log('authenticating user! methode type: ', username, 'and', password);

  if (method === 'login') {
    try {
      const response = await fetch(`${APIURL}/users/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (!result.token) {
        return;
      } else {
        console.log('this is result.token', result.token);
        window.localStorage.setItem(`juice-token`, result.token);
        return await me();
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await fetch(`${APIURL}/users/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          username,
          password,
          zipcode,
          email,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (!result.token) {
        return;
      } else {
        console.log('this is result.token', result.token);
        window.localStorage.setItem(`juice-token`, result.token);
        return await me();
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const me = async () => {
  try {
    const token = window.localStorage.getItem('juice-token');

    if (token) {
      const response = await fetch(`${APIURL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const { username, id } = await response.json();
      console.log('hey look it is me: ', username, id);
      return { username, id };
    }
    return;
  } catch (error) {
    console.error(error);
  }
};
