const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

//instancia de express en mi app
const app = express();

app.use(cors()); //Poder realizar peticiones desde otro proyecto

//middleware morgan para detectar peticiones
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Primera ruta
app.use('/api', apiRouter);

app.set('PORT', 3000); //Seteamos el puerto

app.get('/', function (req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

module.exports = app;