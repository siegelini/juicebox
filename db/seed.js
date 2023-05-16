const { client, getAllUsers, createUser, updateUser } = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS users;
        `);

    console.log("Finishined dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT true
      );
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create initial users...");

    await createUser({
      username: "albert",
      password: "bertie99",
      name: "Al Bert",
      location: "alberta",
    });
    await createUser({
      username: "sandra",
      password: "2sandy4me",
      name: "just sandra",
      location: "sandy beach",
    });
    await createUser({
      username: "glamgal",
      password: "soglam",
      name: "Frank",
      location: "glamville",
    });
    await createUser({
      username: "radam",
      password: "nerdy",
      name: "Adam",
      location: "Roanoke",
    });

    console.log("Finished creating initial users!");
  } catch (error) {
    console.error("Error creating initial users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test databases...");

    console.log("calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling updateUser on users[0}");
    const updateUserResult = await updateUser(users[0].id, {
      name: "Newname Sogood",
      location: "Lesterville, KY",
    });
    console.log("Result:", updateUserResult);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!, you done messed up!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
