const router = require('express').Router()
const { body } = require('express-validator')
const {
	getProducts, newProduct,
	uploadProductImg, deleteProduct
} = require('../controllers/product.controller')
const { isAuthenticatedAndAdmin } = require('../middlewares/auth')
const validateInputs = require('../middlewares/validateInputs')


module.exports = () => {

	router.get('/products', getProducts )

	/* Rutas de productos con autenticacion
	-------------------------------------------------- */
	
	router.post('/products', 
		isAuthenticatedAndAdmin,
		uploadProductImg,
		[
			body('name')
				.not().isEmpty().withMessage('El nombre es obligatorio').escape(),
			body('price')
				.not().isEmpty().withMessage('El precio es obligatorio').escape(),
			body('brand')
				.not().isEmpty().withMessage('La marca es obligatoria').escape(),
			body('category')
				.not().isEmpty().withMessage('La categoria es obligatoria').escape(),
				validateInputs,
		],
		newProduct
	)

	router.delete('/products/:id', 
		isAuthenticatedAndAdmin,
		deleteProduct
	)
	
	/* End of Rutas de productos con autenticacion
	-------------------------------------------------- */

	return router
}