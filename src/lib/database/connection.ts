import { Sequelize } from "sequelize-typescript";
import sqlite3 from "sqlite3";
import path from "path";

// Models
import { Scene } from "../../../model/scene";
import { Preference } from "../../../model/preference";

const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: sqlite3,
  storage: path.join(process.cwd(), "database.sqlite"),
  models: [Scene, Preference],
  logging: false,
});

export default sequelize;
