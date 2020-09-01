/*
medics
route: '/api/medics/'
 */


const { check } = require( 'express-validator' );
const { fieldValidator } = require( '../middlewares/field-validator' );
const { Router } = require( 'express' );
const { validateJWT } = require( '../middlewares/JWT-validator' )

const {
    getMedic,
        createMedic,
        updateMedic,
        deleteMedic
} = require( '../controllers/medics' )


const router = Router();

router.get( '/', getMedic );

router.post( '/',
    [
        validateJWT,
        check('name', 'the name of the medic is mandatory').not().isEmpty(),
        check('hospital', 'the hospital ID must be mandatory').isMongoId(),
        fieldValidator
    ],
    createMedic );

router.put( '/:id',
    [
        validateJWT,
        check('name', 'the name of the medic is mandatory').not().isEmpty(),
        check('hospital', 'the hospital ID must be mandatory').isMongoId(),
        fieldValidator
    ], updateMedic );

router.delete( '/:id',
    deleteMedic );


module.exports = router;
