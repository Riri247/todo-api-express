const express = require ('express');

const jsonParser = express.json({strict:true});

module.exports = jsonParser;