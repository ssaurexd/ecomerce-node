const mongoose = require('mongoose')
require('dotenv').config()


const db = async() => {

	try {
		
		await mongoose.connect( process.env.MONGO_URL, { 
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		console.log( 'Database ON' )
	} 
	catch ( error ) {
		
		console.log( error )
		throw new Error( 'Database OFF' )
	}
}

module.exports = db