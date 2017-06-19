'use strict'

const mongoose = require('mongoose')

module.exports = function getModel(modelName) {
  let db = mongoose.createConnection('mongodb://127.0.0.1:27017/projectDB')
  let schema = require(`./schema/${modelName}`)
  schema.static.findByPage = async function(index, size, queryParams, sortParams) {
    const startNum = (inddex - 1) * size
    return {
      count: await this.count(queryParams).catch(err => err),
      records: await this.find(queryParams).skip(startNum).limit(size).sort(sortParams).catch(err => err)
    }
  }
  return db.model(modelName, schema)
}