const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({
  name,
  username,
  password,
  zipcode,
  email,
  serviceId,
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, username, password, zipcode, email, "serviceId")
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (username, email) DO NOTHING
        RETURNING *;
        `,
      [name, username, hashedPassword, zipcode, email, serviceId]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM users;
    `
    );
    return rows;
  } catch (error) {
    console.log('error gettingAllUsers');
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1`,
      [username]
    );

    return user;
  } catch (error) {
    console.log('Error getting user by Username');
    throw error;
  }
}

async function getUser(username, password) {
  if (!username || !password) return;
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    let passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return;
    }
  } catch (error) {
    console.error('Error getting user');
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT id, username, zipcode, email, name
    FROM users
    WHERE id=${id}`);

    return user;
  } catch (error) {
    console.error('Error getting user by ID');
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE email = $1
    `,
      [email]
    );

    return user;
  } catch (error) {
    console.error('Error getting user by eMail');
    throw error;
  }
}

async function updateUser(id, { ...fields }) {
  const updatedHashedPassword = await bcrypt.hash(fields.password, saltRounds);

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(',');
  try {
    if (setString.length > 0) {
      const {
        rows: [user],
      } = await client.query(
        `
        UPDATE users
        SET ${setString}
        WHERE id = ${id}
        RETURNING * 
        `,
        Object.values(fields)
      );
      return user;
    }
  } catch (error) {
    throw error;
  }
}

// async function updateUserPassword(id, password) {
//   console.log('id', id, 'pass to update:', password);

//   try {
//     const rows = await client.query(
//       `
//         UPDATE users
//         SET password
//         WHERE id = ${id}
//         RETURNING *
//         `,
//       [id, password]
//     );

//     // const updatedHashedPassword = await bcrypt.hash(password, saltRounds);

//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  getUserByEmail,
  updateUser,
  // updateUserPassword,
  getAllUsers,
};
