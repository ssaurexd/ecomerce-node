const { request, response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const validateJWT = ( req = request, res = response, next ) => {

	const token = req.header( 'x-token' )

	if( !token ) {

		return res.status( 401 ).json({
			ok: false,
			msg: 'Token inexistente'
		})
	}

	try {
		
		const { uid } = jwt.verify( token, process.env.JWT_SEED )

		//asignar uid
		req.uid = uid
	} catch ( error ) {
		
		return res.status( 501 ).json({
			ok: false,
			msg: 'Token no valido.'
		})
	}

	next()
}

module.exports = validateJWT