const jwt = require( 'jsonwebtoken' );
const User = require('../models/user');



const validateJWT = ( req, res, next ) => {

    // Read token
    const token = req.header( 'x-token' );

    if ( !token ) {
        return res.status( 401 ).json( {
            ok: false,
            msg: 'There is no token'
        } )
    }

    try {

        const { uid } = jwt.verify( token, process.env[ "JWT_SECRET" ] );

        req.uid = uid;

        next();

    } catch ( error ) {
        return res.status( 401 ).json( {
            ok: false,
            msg: 'No valid token'
        } )
    }

}

const validateAdminRole = async ( req, res, next ) => {

    const uid = req.uid;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ){
            return res.status( 404 ).json({
                ok: false,
                msg: 'User does not exist'
            });
        }

        if ( userDB.role !== 'ADMIN_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'You don\'t have permissions to access that area'  
            });
        }

        next()

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        })
    }
}

const validateAdminRoleOrSameUser = async ( req, res, next ) => {

    const uid = req.uid;
    const id =  req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ){
            return res.status( 404 ).json({
                ok: false,
                msg: 'User does not exist'
            });
        }

        if ( userDB.role === 'ADMIN_ROLE' || uid === id ){
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'You don\'t have permissions to access that area'  
            });
        }

        

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        })
    }
}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRoleOrSameUser
}
