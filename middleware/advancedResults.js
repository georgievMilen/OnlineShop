const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Finding resource
  query = model.find();

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
  };

  next();
};

module.exports = advancedResults;
