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
    "username": process.env.DB_USERNAME_PROD,
    "password": process.env.DB_PASSWORD_PROD,
    "database": process.env.DB_DATABASE_PROD,
    "host": process.env.DB_HOST_PROD,
    "dialect": "mysql",
    "logging": false,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false,
        "minVersion": "TLSv1.2"
      },
      "authPlugins": {
        "mysql_clear_password": () => Buffer.from(process.env.DB_PASSWORD_PROD + '\0')
      },
       "timezone": "Z"
    }
  }
};