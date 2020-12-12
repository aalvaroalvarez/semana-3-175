// const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

//Controlador route signin - localhost:3000/api/auth/signin
exports.signin = async (req, res, next) => {
    try {
        const userData = await models.user.findOne({ where: { email: req.body.email } });
        if (userData) {
            // Validamos si la contraseña es igual
            const passwordIsValid = bcrypt.compareSync(req.body.password, userData.password);
            if (passwordIsValid) {
                const token = jwt.sign({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                }, 'config.secret', {
                    expiresIn: 86400, //(seg) token dura todo un día
                }
                );
                res.status(200).send({
                    accessToken: token
                });
            } else {
                res.status(401).send({ 
                    auth: false, 
                    accessToken: null, 
                    reason:"Invalid Password!" 
                });     
            }
        } else {
            res.status(404).send('User Not Found.');
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        })
        next(error);
    }
}

//Controller route register - localhost:3000/api/auth/register
exports.register = async (req, res, next) => {
    try {
        // Validamos si existe el correo del usuario a registrar
        const userExist = await models.user.findOne({ where: { email: req.body.email } });
        if (!userExist) {
            req.body.password = bcrypt.hashSync(req.body.password, 10); //Encripta contraseña
            const userData = await models.user.create(req.body);
            res.status(200).json(userData);
        } else {
            res.status(200).send({
                message: 'ERROR - email'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        })
        next(error);
    }
}

