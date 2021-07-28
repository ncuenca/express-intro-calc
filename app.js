/** Simple demo Express app. */

const express = require("express");
const app = express();
const { UnauthorizedError, BadRequestError, ForbiddenError} 
      = require('./expressError');
const { convertStrSums} = require('./utils');
const {findMean, findMedian, findMode} = require('./stats');

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean',(req,res,err) =>{
  
  const strNums = req.query.nums.split(',');
  if(strNums.includes(strNums.findIndex(Number.isNaN))) throw new BadRequestError();
  const convNums = convertStrSums(strNums);  // {Array:Number} converted numbers  
  return res.json({response: {
                      operation:"mean",
                      value: findMean(convNums),
                      }}); 
  
});

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


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
