const router = require('express').Router()
const usersRoutes = require('./user.routes')


module.exports = () => {

	router.use( usersRoutes() )

	return router
}