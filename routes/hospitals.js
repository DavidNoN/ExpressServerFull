/*
Hospitals
route: '/api/hospitals/'
 */

const { check } = require( 'express-validator' );
const { fieldValidator } = require( '../middlewares/field-validator' );
const { Router } = require( 'express' );
const { validateJWT } = require( '../middlewares/JWT-validator' )

const {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require( '../controllers/hospitals' )


const router = Router();

router.get( '/', getHospitals );

router.post( '/',
    [
        validateJWT,
        check('name', 'the name of the hospital is mandatory').not().isEmpty(),
        fieldValidator
    ],
    createHospital );

router.put( '/:id',
    [
        validateJWT,
        check('name', 'the name of the hospital is mandatory').not().isEmpty(),
        fieldValidator
    ], updateHospital );

router.delete( '/:id',
    deleteHospital );


module.exports = router;
