const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise( (resolve, reject ) => {

        const payload = {
            uid,
        }

        jwt.sign(payload, process.env[ "JWT_SECRET" ], {
            expiresIn: '36h'
        }, (err, token) => {

            if (err){
                console.log(err);
                reject('Was not possible generate a JWT')
            } else {
                resolve( token );
            }
        });
    });


}

module.exports = {
    generateJWT
}
