const { request, response } = require('express')
const { validationResult } = require('express-validator')


const validateInputs = ( req = request, res = response, next ) => {

	const errors = validationResult( req )

	//manejo de errores
	if( !errors.isEmpty() ) {

		return res.status( 400 ).json({
			ok: false,
			errors: errors.array()
		})
	}

	next()
}

module.exports = validateInputs
