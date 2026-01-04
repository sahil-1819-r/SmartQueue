const centralErrorHandler = (err, req, res, next) => {
  console.error(err);
  const statuscode = err.statuscode || 500;
  const message = err.message || "Interna; Server Error";

  res.status(statuscode).json({
    success: false,
    message
    });
};

export default centralErrorHandler;