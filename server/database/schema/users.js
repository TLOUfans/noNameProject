'use strict'

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  code: String,
  name: String,
  password: String,
  regDate: Date
})