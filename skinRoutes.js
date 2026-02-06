import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Skin Page");
});

export default router;
