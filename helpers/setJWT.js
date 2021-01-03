const jwt = require('jsonwebtoken')
require('dotenv').config()


const setJWT = ( uid, extraData = {} ) => {

	return new Promise(( resolve, reject ) => {

		const payload = { uid, ...extraData }

		jwt.sign( 
			payload, process.env.JWT_SEED, 
			{ 
				expiresIn: '2h'
			}, 
			( error, token ) => {

				if( error ) {

					console.log( error )
					reject( 'No se pudo generar el token' )
				}

				resolve( token )
			}
		)
	})
}

module.exports = setJWT