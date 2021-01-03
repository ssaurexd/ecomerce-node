const fs = require('fs')


const deleteFile = ( fileName, path ) => {

	const preImage = __dirname + `/../public/uploads/${ path }/${ fileName }`

	/* Eliminar img anterior */
	fs.unlinkSync( preImage, error => {

		if( error ) {

			throw new Error( error )
		}

		return
	})
}

module.exports = deleteFile