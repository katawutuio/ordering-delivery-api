const mySequelize = require('./MySequelize')
require('dotenv').config();

const DB_BRANCH_CONNECTION = {
  host: process.env.DB_BRANCH_HOST,
  user: process.env.DB_BRANCH_USER,
  password: process.env.DB_BRANCH_PASSWORD,
  database: '',
  charset: process.env.DB_BRANCH_CHARSET,
  connectionLimit: process.env.DB_BRANCH_CONN_LIMIT,
  options: {
    host: process.env.DB_BRANCH_HOST,
    dialect: process.env.DB_BRANCH_OPTIONS_DIALECT,
    pool: {
        max: parseInt(process.env.DB_BRANCH_POOL_MAX),
        min: parseInt(process.env.DB_BRANCH_POOL_MIN),
        acquire: process.env.DB_BRANCH_POOL_ACQUIRE,
        idle: process.env.DB_BRANCH_POOL_IDLE
    }
  }
}

const DB_CENTER_CONNECTION = {
  host: process.env.DB_CENTER_HOST,
  user: process.env.DB_CENTER_USER,
  password: process.env.DB_CENTER_PASSWORD,
  database: process.env.DB_CENTER_DATABASE,
  charset: process.env.DB_CENTER_CHARSET,
  connectionLimit: process.env.DB_CENTER_CONN_LIMIT,
  options: {
    host: process.env.DB_CENTER_HOST,
    dialect: process.env.DB_CENTER_OPTIONS_DIALECT,
    pool: {
        max: parseInt(process.env.DB_CENTER_POOL_MAX),
        min: parseInt(process.env.DB_CENTER_POOL_MIN),
        acquire: process.env.DB_CENTER_POOL_ACQUIRE,
        idle: process.env.DB_CENTER_POOL_IDLE
    }
  }
}

const connectBranch = (branch) => {
  DB_BRANCH_CONNECTION.database = `FOODCOURT_${branch}`;
  return mySequelize(DB_BRANCH_CONNECTION)
}

module.exports = {
  dbBranchConn: connectBranch,
  dbCenterConn: mySequelize(DB_CENTER_CONNECTION)
}