const express = require("express");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");
const { generateToken } = require("../utils/jwtUtils");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();
const prisma = new PrismaClient().$extends(withAccelerate());

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const token = generateToken(user);
    res.status(201).send({ user });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "An error occurred" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return res.status(400).send({ error: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).send({ error: "Invalid email or password." });

    const token = generateToken(user);

    res.send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "An error occurred" });
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route.");
});

module.exports = router;
