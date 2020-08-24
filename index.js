const express = require( 'express' );
require( 'dotenv' ).config();
const { dbConnection } = require( './database/config' );
const cors = require( 'cors' )

// Create Express server

const app = express();

// CORS
app.use( cors() );

// Read and parse body
app.use( express.json() );

// Database
dbConnection().then();

// //  Routes

app.use( '/api/users/', require( './routes/users' ) );
app.use( '/api/login/', require( './routes/auth' ) );


app.listen( process.env[ "PORT" ], () => {
        console.log( 'Server running on port ' + process.env[ "PORT" ] );
    }
)
