export default function errorHandler(err, req, res, next) {
  console.error("Stack Trace:", err.stack);
  res.status(500).json({ error: "Something went wrong!", message: err.message });
}
