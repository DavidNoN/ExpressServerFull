const Hospital = require( '../models/hospital' );

const getHospitals = async ( req, res ) => {

    const hospitals = await Hospital.find()
                                    .populate( 'user', 'name img' );

    res.json( {
        ok: true,
        hospitals
    } );
}

const createHospital = async ( req, res ) => {

    const uid = req.uid;
    const hospital = new Hospital( {
        user: uid,
        ...req.body
    } );

    try {

        const hospitalDB = await hospital.save();

        res.json( {
            ok: true,
            hospital: hospitalDB
        } );

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Contact the admin'
        } )
    }

}

const updateHospital = async ( req, res ) => {

    const hospitalID = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById( hospitalID );

        if ( !hospitalDB ) {
            return res.status( 404 ).json( {
                ok: true,
                msg: 'Hospital not found'
            } );
        }

        const changesHospital = {
            ...req.body,
            user: uid
        }

        const hospitalUpdate = await Hospital.findByIdAndUpdate( hospitalID, changesHospital, { new: true } );

        res.json( {
            ok: true,
            hospital: hospitalUpdate
        } );

    } catch ( error ) {

        console.log( error );

        res.status( 500 ).json( {
            ok: false,
            msg: 'Contact the web Admin'
        } )
    }


}

const deleteHospital = async ( req, res ) => {

    const hospitalID = req.params.id;

    try {

        const hospitalDB = await Hospital.findById( hospitalID );

        if ( !hospitalDB ) {
            return res.status( 404 ).json( {
                ok: true,
                msg: 'Hospital not found'
            } );
        }


        await Hospital.findByIdAndDelete(hospitalID);

        res.json( {
            ok: true,
            msg: 'Hospital deleted'
        } );

    } catch ( error ) {

        console.log( error );

        res.status( 500 ).json( {
            ok: false,
            msg: 'Contact the web Admin'
        } )
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
