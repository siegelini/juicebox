const { client, getAllUsers, createUser } = require("./index");

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
        password varchar(255) NOT NULL
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

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });

    console.log(albert);

    const sandra = await createUser({
      username: "sandra",
      password: "2sandy4me",
    });

    console.log(sandra);

    const glamgal = await createUser({
      username: "glamgal",
      password: "soglam",
    });

    console.log(glamgal);

    const radam = await createUser({ username: "radam", password: "nerdy" });

    console.log(radam);

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

    const users = await getAllUsers();

    console.log("getAllUsers:", users);

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
