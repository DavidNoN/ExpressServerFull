const User = require( '../models/user' );
const Medic = require( '../models/medics' );
const Hospital = require( '../models/hospital' );
const fs = require( 'fs' );

const deleteImage = ( path ) => {

    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path );
    }

}

const updateImage = async ( type, id, fileName ) => {

    let oldPath = '';

    switch ( type ) {
        case 'medics':
            const medic = await Medic.findById( id );
            if ( !medic ) {
                console.log( 'Is not a medic by id' );
                return false;
            }

            oldPath = `./uploads/medics/${ medic.img }`;

            deleteImage( oldPath )

            medic.img = fileName;
            await medic.save();
            return true;
            break;
        case 'hospitals':

            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                console.log( 'Is not a hospital by id' );
                return false;
            }

            oldPath = `./uploads/medics/${ hospital.img }`;

            deleteImage( oldPath )

            hospital.img = fileName;
            await hospital.save();
            return true;

            break;
        case 'user':

            const user = await User.findById( id );
            if ( !user ) {
                console.log( 'Is not a user by id' );
                return false;
            }

            oldPath = `./uploads/medics/${ user.img }`;

            deleteImage( oldPath )

            user.img = fileName;
            await user.save();
            return true;

            break;
    }

}


module.exports = {
    updateImage
}
