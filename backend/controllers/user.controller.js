const userModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
require('dotenv').config();
const cryptr = new Cryptr(process.env.Crtyper_Key);
const userController = {

    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            const exsiting = await userModel.findOne({ email: email });
            if (exsiting) return res.status(409).json({ msg: "Account already exists...😂", success: false });

            const encryptedPass = cryptr.encrypt(password);
            const user = await userModel.create({
                name,
                email,
                password: encryptedPass
            })
            const token = jwt.sign({
                email: email
            }, process.env.SECRET_KEY_JWT, { expiresIn: '2d' });
            await user.save()
            const newuser = {
                ...user.toJSON(),
                password: null,
                token
            }
            return res.status(201).json({ msg: "Account created successfully...😍", success: true, newuser })
        } catch (error) {
            console.log(error)
            return res.status(501).json({ msg: "Internal Server Error...", success: false })
        }
    },
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const exsiting = await userModel.findOne({ email });
            if (!exsiting) return res.status(401).json({ msg: "User not found...🤦‍♀️", success: false });
            const decryptedPass = cryptr.decrypt(exsiting.password);
            if (password != decryptedPass) return res.status(401).json({ msg: "Invalid password...😢", success: false });
            const token = jwt.sign({
                email: email
            }, process.env.SECRET_KEY_JWT, { expiresIn: '2d' });
            const data = {
                user: {
                    ...exsiting.toJSON(),
                    password: null,
                },
                token

            }
            return res.status(200).json({ msg: "Login successful...😘", success: true, data })
        } catch (error) {
            return res.status(501).json({ msg: "Internal Server Error...", success: false })
        }
    },

};

module.exports = userController;