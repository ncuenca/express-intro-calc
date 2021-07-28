"use strict"

/** Simple demo Express app. */

const express = require("express");
const app = express();
const { findMean, findMedian, findMode } = require("./stats")
const { convertStrNums } = require('./utils')

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    throw new BadRequestError("Numbers are required");
  }
  let strNums = req.query.nums.split(",");
  let nums = convertStrNums(strNums);
  if (nums.includes(NaN)) {
    let invalid = strNums[nums.findIndex(Number.isNaN)];
    throw new BadRequestError(`${invalid} is not a number`);
  }
  return res.json({operation: "mean", value: findMean(nums)});
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res, next) { 
  if (Object.keys(req.query).length === 0) {
    throw new BadRequestError("Numbers are required");
  }
  let strNums = req.query.nums.split(",");
  let nums = convertStrNums(strNums);
  if (nums.includes(NaN)) {
    let invalid = strNums[nums.findIndex(Number.isNaN)];
    throw new BadRequestError(`${invalid} is not a number`);
  }
  return res.json({operation: "median", value: findMedian(nums)});
});


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    throw new BadRequestError("Numbers are required");
  }
  let strNums = req.query.nums.split(",");
  let nums = convertStrNums(strNums);
  if (nums.includes(NaN)) {
    let invalid = strNums[nums.findIndex(Number.isNaN)];
    throw new BadRequestError(`${invalid} is not a number`);
  }
  return res.json({operation: "mode", value: findMode(nums)});
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;