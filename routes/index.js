const router = require('express').Router()
const usersRoutes = require('./user.routes')
const productsRoutes = require('./product.routes')


module.exports = () => {

	router.use( usersRoutes() )
	router.use( productsRoutes() )

	return router
}