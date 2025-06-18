module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "hospital_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql",
    "logging": false,
    "dialectOptions": { // <--- AÑADÍ ESTE BLOQUE
      "authPlugins": {
        "mysql_clear_password": () => () => Buffer.from(process.env.DB_PASSWORD + '\0'),
      },
      "flags": "-FOUND_ROWS"
    }
  }
};