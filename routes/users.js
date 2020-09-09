/*
Route: /api/users
 */


const { check } = require( 'express-validator' );
const { fieldValidator } = require( '../middlewares/field-validator' )
const { Router } = require( 'express' );
const { getUsers, createUser, updateUser, deleteUser } = require( '../controllers/users' )
const { validateJWT, validateAdminRole, validateAdminRoleOrSameUser } = require( '../middlewares/JWT-validator' )

const router = Router();

router.get( '/', validateJWT, getUsers );

router.post( '/',
    [
        check( 'name', 'the name is mandatory' ).not().isEmpty(),
        check( 'password', 'the password is mandatory' ).not().isEmpty(),
        check( 'email', 'the email must be unique' ).isEmail(),
        fieldValidator
    ],
    createUser );

router.put( '/:id',
    [
        validateJWT,
        validateAdminRoleOrSameUser,
        check( 'name', 'the name is mandatory' ).not().isEmpty(),
        check( 'email', 'the email must be unique' ).isEmail(),
        check( 'role', 'The role is mandatory' ).not().isEmpty(),
    ], updateUser );

router.delete( '/:id',
    validateJWT,
    deleteUser );


module.exports = router;
