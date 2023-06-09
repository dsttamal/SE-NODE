const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const addReport = async (req, res) => {
  const newMedicalReport = await prisma.medicalReport.create({
    data: {
      patient: { connect: { id: parseInt(req.body.patient_id) } },
      bloodReport: req.body.bloodReport,
      serumReport: req.body.serumReport,
      createdBy: { connect: { id: req.auth.id } },
      updatedBy: { connect: { id: req.auth.id } },
    },
  });
  if (!newMedicalReport) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(201).json({
    newMedicalReport: newMedicalReport,
    message: "Report created successfully",
  });
};

const viewAll = async (req, res) => {
  const reports = await prisma.medicalReport.findMany({
    where: {
      status: true,
    },
  });
  if (!reports) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  for (let i = 0; i < reports.length; i++) {
    const patient = await prisma.patient.findUnique({
      where: {
        id: reports[i].patient_id,
      },
    });
    reports[i].patient = patient;
  }

  return res.status(200).json({ reports: reports });
};

const viewByUser = async (req, res) => {
  const reports = await prisma.medicalReport.findMany({
    where: {
      patient_id: parseInt(req.params.id),
      status: true,
    },
  });
  if (!reports) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  for (let i = 0; i < reports.length; i++) {
    const patient = await prisma.patient.findUnique({
      where: {
        id: reports[i].patient_id,
      },
    });
    reports[i].patient = patient;
  }

  return res.status(200).json({ reports: reports });
};

const view = async (req, res) => {
  const report = await prisma.medicalReport.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!report) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  const patient = await prisma.patient.findUnique({
    where: {
      id: report.patient_id,
    },
  });
  report.patient = patient;

  return res.status(200).json({ report: report });
};

module.exports = {
  addReport,
  viewAll,
  viewByUser,
  view
};
