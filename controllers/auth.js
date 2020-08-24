const { response } = require( 'express' );
const User = require( '../models/user' );
const bcrypt = require( 'bcryptjs' );
const { generateJWT } = require( '../helpers/jwt' );

const login = async ( req, res ) => {

    const { email, password } = req.body;

    try {

        // Verify email
        const userDB = await User.findOne( { email } );

        if ( !userDB ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'email not found'
            } );
        }

        // verify password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'Password not valid'
            } );
        }

        // Generate Token
        const token = await generateJWT( userDB.id );

        res.json( {
            ok: true,
            token
        } );

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Contact the admin'
        } );

    }

}


module.exports = {
    login
}
