const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  // validate request body
  if (!req.body.phone || !req.body.password) {
    return res.status(400).json({ message: "Phone and password required" });
  }
  if (req.body.phone.length !== 11) {
    return res.status(400).json({ message: "Phone number must be 11 digits" });
  }
  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  // create user
  const newUser = await prisma.user.create({
    data: {
      full_name: req.body.full_name,
      phone: req.body.phone,
      password: hashedPassword,
      gender: req.body.gender,
      dob: req.body.dob,
      email: req.body.email,
      blood_group: req.body.blood_group,
      address: req.body.address,
      reffered_by: req.body.reffered_by,
      status: req.body.status,
      createdBy: req.auth.id,
      updatedBy: req.auth.id,
    },
  });
  if (!newUser) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res
    .status(201)
    .json({ newUser: newUser, message: "User created successfully" });
};

module.exports = {
  register,
};