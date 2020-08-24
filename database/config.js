const mongoose = require( 'mongoose' );

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env["DB_CNN"],
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            } );

        console.log( 'Db Online' );
    } catch ( error ) {
        console.log( error );
        throw new Error( 'Could not start DB' );
    }


}

module.exports = {
    dbConnection
}
