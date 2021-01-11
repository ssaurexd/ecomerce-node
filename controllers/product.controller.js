const { request, response } = require("express")
const multer = require('multer')
const Product = require('../models/Product')
const multerConfig = require('../config/multerConfig')
const deleteFile = require('../helpers/deleteFile')


exports.getProducts = async ( req = request, res = response ) => {

	try {
		
		const products = await Product.find()

		res.json({
			ok: true,
			products
		})
	} catch ( error ) {
		
		res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

exports.newProduct = async ( req = request, res = response ) => {

	try {
		
		const { name, price, inStock, description, brand, category } = req.body
		const product = await Product.create({
			name,
			price,
			inStock,
			description,
			brand,
			category: category.split(','),
			image: req.file ? req.file.filename : null
		})
		
		res.json({
			ok: true,
			msg: 'Producto creado',
			product
		})
	} catch ( error ) {
		
		console.log( error )
		res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

exports.deleteProduct = async ( req = request, res = response ) => {

	const { id } = req.params
	const product = await Product.findById( id )

	if( !product ) {

		return res.status( 404 ).json({
			ok: false,
			msg: 'El producto no existe'
		})
	}

	try {
		
		await Product.findByIdAndDelete( id ) 
		deleteFile( product.image, 'product' )

		res.json({
			ok: true,
			msg: 'Producto eliminado'
		})
	} catch ( error ) {
		
		console.log( error )
		res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

exports.uploadProductImg = async ( req = request, res = response, next ) => {

	const upload = multerConfig( 
		'image',
		'/product',
		500000,
		[
			'image/png',
			'image/jpeg'
		]
	)
	
	upload( req, res, function( error ) {

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

		next()
	})

}