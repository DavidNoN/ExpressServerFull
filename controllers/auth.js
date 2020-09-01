const { response } = require( 'express' );
const User = require( '../models/user' );
const bcrypt = require( 'bcryptjs' );
const { googleVerify } = require( "../helpers/google-verify" );
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

const googleSignIn = async ( req, res = response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const userDB = await User.findOne( { email } );

        let user;

        if (!userDB){
            user = new User({
                name: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // User exist
            user = userDB;
            user.google = true
        }

        // Save to DB

        await user.save();

        // Generate JWT
        const token = await generateJWT( userDB.id );

        res.json( {
            ok: true,
            token
        } );

    } catch ( error ) {

        res.status( 401 ).json( {
            ok: false,
            msg: 'Invalid Token'
        } );

    }


}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generate JWT
    const token = await generateJWT( uid );

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}
