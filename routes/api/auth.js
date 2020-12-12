const router = require('express').Router(); //obtenemos el router de express
const userController = require('../../controllers/UserController')

// Manejo de rutas localhost:3000/api/auth
router.post('/register', userController.register);
router.post('/signin',userController.signin);

module.exports = router;
