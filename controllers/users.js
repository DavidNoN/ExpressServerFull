const User = require( '../models/user' );
const bcrypt = require( 'bcryptjs' );
const { response } = require( 'express' );
const { generateJWT } = require( '../helpers/jwt' );


const getUsers = async ( req, res ) => {

    const user = await User.find( {}, 'name email role google' );

    res.json( {
        ok: true,
        users: user,
        uid: req.uid
    } );
}

const createUser = async ( req, res ) => {

    const { email, password } = req.body;


    try {

        const emailExist = await User.findOne( { email } );

        if ( emailExist ) {
            return res.status( 400 ).json( {
                ok: false,
                msg: 'That email already exist'
            } );
        }

        const user = new User( req.body );

        // Password Encrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Save user
        await user.save();

        // Generate Token
        const token = await generateJWT( user.id );

        res.json( {
            ok: true,
            user,
            token
        } );

    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'Unexpected error... check logs'
        } )
    }


}

const updateUser = async ( req, res = response ) => {

    // TODO: Validate token and proof the user is correct

    const uid = req.params.id;


    try {

        const userDb = await User.findById( uid );

        if ( !userDb ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'There is no exist an user with that ID'
            } )
        }

        // Updates
        const { password, google, email, ...fields } = req.body;

        if ( userDb.email !== email ) {
            const emailExist = await User.findOne( ( { email } ) );
            if ( emailExist ) {
                return res.status( 400 ).json( {
                    ok: false,
                    msg: 'An user with that email already exist'
                } );
            }
        }

        fields.email = email;


        const userUpdated = await User.findByIdAndUpdate( uid, fields, { new: true } );

        res.json( {
            ok: true,
            user: userUpdated
        } )

    } catch ( error ) {
        res.status( 500 ).json( {
            ok: false,
            msg: 'Unexpected error'
        } )
    }
}

const deleteUser = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'There is no exist an user with the ID provided'
            } );
        }

        await User.findByIdAndDelete( uid );

        res.json( {
            ok: true,
            msg: 'User deleted'
        } )


    } catch ( e ) {
        console.log( e );
        res.status( 400 ).json( {
            ok: false,
            msg: 'Talk with the admin'
        } )
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
