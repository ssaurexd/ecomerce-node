const multer = require('multer')
const shortid = require('shortid')


const multerConfig = ( inputName, path, limits, mimetype = [] ) => {

	let storage = multer.diskStorage({
		destination: function( req, file, cb ) {
	
			cb( null, __dirname + '/../public/uploads/' + path )
		},
		filename: function( req, file, cb ) {

			const extension = file.mimetype.split('/')[1]
			const renameFile = `${ shortid.generate() }.${ extension }`

			cb( null, renameFile )
		}
	})
	let upload = multer({
		limits: { fileSize: parseInt( limits ) },
		storage,
		fileFilter: ( req, file, cb ) => {
				
			if( mimetype.includes( file.mimetype ) ) {

				cb( null, true )
			} else {
				
				cb( new Error('Formato no valido'), false )
			}
		}
	}).single( inputName )

	return upload
}

module.exports = multerConfig