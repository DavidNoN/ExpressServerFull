/*
route: api/todo/:search
 */

const { getDocumentsCollection } = require( "../controllers/search" );
const { validateJWT } = require( "../middlewares/JWT-validator" );
const { getTodo } = require( "../controllers/search" );
const { Router } = require( 'express' );
const router = Router();

router.get('/:search', validateJWT, getTodo);

router.get('/collection/:table/:search', validateJWT, getDocumentsCollection);

module.exports = router;
