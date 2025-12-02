const adminModel = require('../models/admin.model');
var jwt = require('jsonwebtoken');
const adminController = {
    async adminLogin(req, res) {
        const { email, password } = req.body;
        try {
            const admin = await adminModel.findOne({ email });
            if (!admin) return res.status(301).json({ msg: "Admin Not Exsit..", success: false });
            if (password !== admin.password) return res.status(301).json({ msg: "password not match..", success: false });
            const token = jwt.sign({
                id: admin._id,
                email: admin.email
            }, process.env.SECRET_KEY_JWT, { expiresIn: '2d' });
            return res.status(201).json({ msg: "Admin  Login...", success: true, token })
        } catch (error) {
            return res.status(501).json({ msg: "Internal Server Error...", success: false })
        }
    },
};

module.exports = adminController;