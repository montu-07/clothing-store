export default {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "clothing_store"
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
