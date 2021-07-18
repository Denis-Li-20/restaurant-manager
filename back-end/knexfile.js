/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://swxzwikzwkvwms:303f6f19f2b4bbe9f4f44ff411ca9f82ae0d9095ca6b7e7c343bbd36e344246e@ec2-52-86-25-51.compute-1.amazonaws.com:5432/d1p7htqug02cpd",
  DATABASE_URL_DEVELOPMENT = "postgres://swxzwikzwkvwms:303f6f19f2b4bbe9f4f44ff411ca9f82ae0d9095ca6b7e7c343bbd36e344246e@ec2-52-86-25-51.compute-1.amazonaws.com:5432/d1p7htqug02cpd",
  DATABASE_URL_TEST = "postgres://swxzwikzwkvwms:303f6f19f2b4bbe9f4f44ff411ca9f82ae0d9095ca6b7e7c343bbd36e344246e@ec2-52-86-25-51.compute-1.amazonaws.com:5432/d1p7htqug02cpd",
  DATABASE_URL_PREVIEW = "postgres://swxzwikzwkvwms:303f6f19f2b4bbe9f4f44ff411ca9f82ae0d9095ca6b7e7c343bbd36e344246e@ec2-52-86-25-51.compute-1.amazonaws.com:5432/d1p7htqug02cpd",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
	},
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
	},
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
	},
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
	},
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
