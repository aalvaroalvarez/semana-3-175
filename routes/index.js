const router = require('express').Router(); //obtenemos el router de express
const apiRouterUser = require('./api/auth'); //importamos la ruta auth

router.use('/auth',apiRouterUser);

module.exports = router;