const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  // validate request body
  if (!req.body.phone || !req.body.full_name) {
    return res.status(400).json({ message: "Phone and Name required" });
  }
  if (req.body.phone.length !== 11) {
    return res.status(400).json({ message: "Phone number must be 11 digits" });
  }
  const dob = new Date(req.body.dob);
  // create user
  const newUser = await prisma.patient.create({
    data: {
      full_name: req.body.full_name,
      phone: req.body.phone,
      gender: req.body.gender,
      marriage: req.body.marriage,
      past_treatment: req.body.past_treatment,
      dob: dob,
      blood_group: req.body.blood_group,
      address: req.body.address,
      reffered_by: req.body.reffered_by,
      status: req.body.status,
      createdBy: { connect: { id: req.auth.id } },
      updatedBy: { connect: { id: req.auth.id } },
    },
  });
  if (!newUser) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res
    .status(201)
    .json({ newUser: newUser, message: "User created successfully" });
};

const viewAll = async (req, res) => {
  const users = await prisma.patient.findMany({
    where: {
      status: true,
    },
  });
  if (!users) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ users: users });
};

const view = async (req, res) => {
  const user = await prisma.patient.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user: user });
};

module.exports = {
  register,
  viewAll,
  view,
};
