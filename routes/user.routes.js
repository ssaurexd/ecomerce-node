const router = require('express').Router()
const { body } = require('express-validator')
const validateInputs = require('../middlewares/validateInputs')
const validateJWT = require('../middlewares/validateJWT')
const {
	SignUp, SignIn,
	uploadAvatar
} = require('../controllers/user.controller')


module.exports = () => {

	router.post('/signup',
		[
			body('email').not().isEmpty().withMessage('El email es obligatorio')
						.isEmail().withMessage('Ingresa un email valido'),
			body('password').not().isEmpty().withMessage('La contraseña es obligatoria'),
			body('name').not().isEmpty().withMessage('El nombre es obligatorio'),
			validateInputs
		], 
		SignUp
	)
	router.post('/signin', 
		[
			body('email').not().isEmpty().withMessage('El email es obligatorio')
						.isEmail().withMessage('Ingresa un email valido'),
			body('password').not().isEmpty().withMessage('La contraseña es obligatoria'),
			validateInputs
		],
		SignIn
	)

	/* Rutas de usuario con autenticacion
	-------------------------------------------------- */
	
	router.post('/avatar',
		validateJWT,
		uploadAvatar
	)
	
	/* End of Rutas de usuario con autenticacion
	-------------------------------------------------- */

	return router
}