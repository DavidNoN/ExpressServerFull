const { updateImage } = require( "../helpers/update-image" );
const { response } = require( 'express' );
const { v4: uuidv4 } = require( 'uuid' );
const fs = require( 'fs' );

const path = require( 'path' );

const fileUpload = ( req, res = response ) => {

    const type = req.params.type;
    const id = req.params.id;

    const validTypes = [ 'hospitals', 'medics', 'users' ];
    if ( !validTypes.includes( type ) ) {
        return res.status( 400 ).json( {
            ok: false,
            msg: 'Is not a medic, an user or a hospital'
        } );

    }

    // Validate a file exists
    if ( !req.files || Object.keys( req.files ).length === 0 ) {
        return res.status( 400 ).json( {
            ok: false,
            msg: 'No files were uploaded'
        } )
    }


    // Process img
    const file = req.files.image;

    const cutName = file.name.split( '.' );
    const fileExtension = cutName[ cutName.length - 1 ];

    // Validate extension
    const validateExtension = [ 'png', 'jpg', 'jpeg', 'gif' ];
    if ( !validateExtension.includes( fileExtension ) ) {
        return res.status( 400 ).json( {
            ok: false,
            msg: 'Is not a allowed extension'
        } );
    }

    // Generate name for the file
    const fileName = `${ uuidv4() }.${ fileExtension }`;

    // Path to save the image
    const path = `./uploads/${ type }/${ fileName }`;

    // Move the image
    file.mv( path, ( error ) => {
        if ( error ) {
            console.log( error );
            return res.status( 500 ).json( {
                ok: false,
                msg: 'Error moving the image'
            } );

        }

        // Update database
        updateImage( type, id, fileName );

        return res.json( {
            ok: true,
            msg: 'File Uploaded',
            fileName
        } );
    } )

}

const returnImage = ( req, res = response ) => {

    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ photo }` );

    // Image by default
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }


}


module.exports = {
    fileUpload,
    returnImage
}
