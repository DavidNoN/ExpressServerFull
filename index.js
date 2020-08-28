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

// Public directory
app.use( express.static( 'public' ) );

// //  Routes

app.use( '/api/users/', require( './routes/users' ) );
app.use( '/api/hospitals/', require( './routes/hospitals' ) );
app.use( '/api/medics/', require( './routes/medics' ) );
app.use( '/api/todo', require( './routes/search' ) );
app.use( '/api/login/', require( './routes/auth' ) );
app.use( '/api/upload/', require( './routes/uploads' ) );


app.listen( process.env[ "PORT" ], () => {
        console.log( 'Server running on port ' + process.env[ "PORT" ] );
    }
)
