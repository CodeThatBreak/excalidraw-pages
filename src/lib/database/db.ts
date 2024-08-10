import sequelize from "./connection";

const isDev = process.env.NODE_ENV === "development";

const dbInit = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { dbInit };
