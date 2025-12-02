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
            // res.cookie("admin_token", token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            //     maxAge: 1000 * 60 * 60 * 24
            // });
            res.cookie("admin_token", token, {
                httpOnly: true,
                secure: true,         // hamesha true (https use karo)
                sameSite: 'None',     // cross-site ke liye
                maxAge: 1000 * 60 * 60 * 24,
                path: '/',
            });

            return res.status(201).json({ msg: "Admin  Login...", success: true, token })
        } catch (error) {
            return res.status(501).json({ msg: "Internal Server Error...", success: false })
        }
    },
};

module.exports = adminController;