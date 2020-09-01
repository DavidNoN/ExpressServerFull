const { response } = require( 'express' );

const Medic = require( '../models/medics' );

const getMedic = async ( req, res ) => {

    const medics = await Medic.find()
                              .populate( 'user', 'name img' )
                              .populate( 'hospital', 'name img' );

    res.json( {
        ok: true,
        medics
    } );
}

const createMedic = async ( req, res ) => {

    const uid = req.uid;
    const medic = new Medic( {
        user: uid,
        ...req.body
    } )

    try {

        const medicDB = await medic.save();

        res.json( {
            ok: true,
            medic: medicDB
        } )
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            ok: false,
            msg: 'Contact with the admin'
        } );

    }

}

const updateMedic = async ( req, res ) => {

    const medicID = req.params.id;
    const uid = req.uid;

    try {

        const medicDB = await Medic.findById( medicID );

        if ( !medicDB ) {
            return res.status( 404 ).json( {
                ok: true,
                msg: 'Hospital not found'
            } );
        }

        const changesMedic = {
            ...req.body,
            user: uid
        }

        const medicUpdate = await Medic.findByIdAndUpdate( medicID, changesMedic, { new: true } );

        res.json( {
            ok: true,
            hospital: medicUpdate
        } );

    } catch ( error ) {

        console.log( error );

        res.status( 500 ).json( {
            ok: false,
            msg: 'Contact the web Admin'
        } )
    }
}

const deleteMedic = async ( req, res ) => {

    const medicID = req.params.id;

    try {

        const medicDB = await Medic.findById( medicID );

        if ( !medicDB ) {
            return res.status( 404 ).json( {
                ok: true,
                msg: 'Hospital not found'
            } );
        }

        await Medic.findByIdAndDelete( medicID );

        res.json( {
            ok: true,
            msg: 'Medic deleted'
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
    getMedic,
    createMedic,
    updateMedic,
    deleteMedic
}
