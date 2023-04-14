const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req, res) => {
    // validate request body
    if (!req.body.admin || !req.body.password) {
        return res.status(400).json({ message: "Phone and password required" });
    }
    const admin = await prisma.admin.findUnique({
        where: {
            username: req.body.username,
        },
    });
    if (!admin) {
        return res.status(400).json({ message: "Admin not found" });
    }
    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        admin.password
    );
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: admin.id }, secret, { expiresIn: "24h" });
    return res.status(200).json({ token: token, message: "Login successful" });

};

module.exports = {
    login,
};