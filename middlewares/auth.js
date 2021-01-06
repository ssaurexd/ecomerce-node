const { request, response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')


exports.isAuthenticated = ( req = request, res = response, next ) => {

	const token = req.header('x-token')

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
		
		console.log( error )

		return res.status( 501 ).json({
			ok: false,
			msg: 'Token no valido.'
		})
	}

	next()
}

exports.isAuthenticatedAndAdmin = async ( req = request, res = response, next ) => {

	const token = req.header('x-token')
	
	if( !token ) {

		return res.status( 401 ).json({
			ok: false,
			msg: 'Token inexistente'
		})
	}
	
	try {
		
		const role = 'admin'
		const { uid } = jwt.verify( token, process.env.JWT_SEED )
		const user = await User.findOne({ _id: uid, role })

		if( !user ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'Sin permisos'
			})
		}

		//asignar uid
		req.uid = uid
	} catch ( error ) {

		console.log( error )
		
		return res.status( 501 ).json({
			ok: false,
			msg: 'Token no valido.'
		})
	}

	next()
}