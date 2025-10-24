/**
 * Error handling middleware functions
 */

/**
 * 404 Not found handler
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Route not found' });
};

/**
 * General error handler
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};
