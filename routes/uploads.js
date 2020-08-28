/*
route: api/uploads/
 */

const { fileUpload } = require( "../controllers/uploads" );
const { validateJWT } = require( "../middlewares/JWT-validator" );
const { Router } = require( 'express' );
const expressFileUpload = require( 'express-fileupload' );
const { returnImage } = require( "../controllers/uploads" );
const router = Router();

router.use( expressFileUpload() );

router.put( '/:type/:id', validateJWT, fileUpload );

router.get( '/:type/:photo', returnImage );

module.exports = router;
