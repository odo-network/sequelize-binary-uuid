import Sequelize from "sequelize";
import { withBinaryUUID } from "./p9/models/bin";

const {
  SQL_DB_NAME,
  SQL_DB_HOST,
  SQL_DB_PORT,
  SQL_DB_USERNAME,
  SQL_DB_PASSWORD
} = process.env;

const sql = new Sequelize(SQL_DB_NAME, SQL_DB_USERNAME, SQL_DB_PASSWORD, {
  dialect: "mysql",
  host: SQL_DB_HOST,
  port: SQL_DB_PORT,
  operatorsAliases: false
});

/*
  with no arguments it creates
  {
    id: {
      type: BINARY(16),
      defaultValue() {
        return getBinaryUUID()
      },
      primaryKey: true,
      allowNull: false
    },
    uuid: {
      type: new Sequelize.DataTypes.VIRTUAL(...),
      get() {
        // ...
      }
    }
  }
*/
const User = sql.define("User", withBinaryUUID());

sql
  .sync({ force: true })
  .then(() => Promise.all([User.create(), User.create(), User.create()]))
  .then(() => User.findAll())
  .then(users => users.map(user => user.get({ plain: true })))
  .then(console.log);
