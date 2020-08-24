/*
Path: '/api/login/'
 */

const { Router } = require( 'express' );
const { login } = require( '../controllers/auth' );
const { check } = require( 'express-validator' );
const { fieldValidator } = require( '../middlewares/field-validator' );

const router = Router();

router.post( '/',
    [
        check( 'email', 'The email is mandatory' ).isEmail(),
        check( 'password', 'The password is mandatory' ).not().isEmpty(),
        fieldValidator
    ],
    login );


module.exports = router;
