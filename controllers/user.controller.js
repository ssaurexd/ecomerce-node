const { request, response } = require('express');
const bcrypt = require('bcrypt')
const multer = require('multer')
const multerConfig = require('../config/multerConfig')
const deleteFile = require('../helpers/deleteFile')
const User = require('../models/User')
const setJWT = require('../helpers/setJWT')


exports.SignUp = async ( req = request, res = response ) => {

	const { email, password } = req.body

	try {
		
		let user = await User.findOne({ email })

		if( user ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'El correo ya está registrado.'
			})
		}

		user = new User( req.body )
		user.encryptPassword( password )
		await user.save()

		res.json({
			ok: true
		})

	} catch ( error ) {
		
		console.log( error )

		res.status( 500 ).json({
			ok: false
		})
	}
}

exports.SignIn = async ( req = request, res = response ) => {

	const { email, password } = req.body

	try {
		
		const user = await User.findOne({ email, active: true })

		if( !user ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'El correo aún no está registrado.'
			})
		}

		/* Verificar contraseña */
		const passwordIsCorrect = bcrypt.compareSync( password, user.password )

		if( !passwordIsCorrect ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'Contraseña incorrecta.'
			})
		}
	
		const token = await setJWT(user._id,{
			name: user.name,
			email: user.email
		})

		res.json({
			ok: true,
			token
		})

	} catch ( error ) {
		
		console.log( error )

		res.status( 500 ).json({
			ok: false,
			msg: 'Oop! Something went wrong.'
		})
	}
}

exports.uploadAvatar = ( req = request, res = response ) => {
	
	const upload = multerConfig( 
		'avatar',
		'/user/avatar',
		500000,
		[
			'image/png',
			'image/jpeg'
		]
	)
	
	upload( req, res, async function( error ) {
				
		/* Validando errores */
		if( error ) {

			if( error instanceof multer.MulterError ) {

				if( error.code === 'LIMIT_FILE_SIZE' ) {

					return res.status( 400 ).json({
						ok: false,
						msg: 'La imagen es demasiado grande, limite: 500KB' 
					})
				} else {

					return res.status( 400 ).json({
						ok: false,
						msg: error.message
					})
				}
			} 
			else {

				return res.status( 400 ).json({
					ok: false,
					msg: error.message
				})
			}
		} 

		try {
			
			const user = await User.findOne({ _id: req.uid })

			/* Eliminar imagen anterior */
			if( user.avatar ) {
	
				deleteFile( user.avatar, '/user/avatar' )
			}

			user.avatar = req.file.filename
			user.save()
			
			res.json({
				ok: true,
				msg: 'La imagen se subio correctamente'
			})
		} catch ( error ) {
			
			console.log( error )
			res.status( 500 ).json({
				ok: false,
				msg: 'Oop! Something went wrong.'
			})
		}
	})
}

exports.updateUser = async ( req = request, res = response ) => {

	const { uid } = req
	const { email, name } = req.body

	try {
		
		const user = await User.findOneAndUpdate( uid, {
			email,
			name
		}, { 
			new: true 
		}).select('-password -createdAt -updatedAt -__v')
		// con select recibe un string para decirle que valores devolver o si tienen - excluir

		res.json({
			ok: true,
			msg: 'Usuario actualizado',
			user
		})
	} catch ( error ) {
		
		console.log( error )
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}