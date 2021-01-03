const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const database = require('./config/db')
const routes = require('./routes')



/* Conectar a la base de datos */
database()

/* Habilitar Cors */
app.use( cors() )

/* Habilitar el body */
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )

/* Rutas */
app.use( '/', routes() )

/* Iniciar el servidor */
app.listen( process.env.PORT, () => {

	console.log(`Server ON => http://localhost:${ process.env.PORT }`)
})