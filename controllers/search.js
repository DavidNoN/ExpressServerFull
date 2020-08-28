const User = require( '../models/user' );
const Medic = require( '../models/medics' );
const Hospital = require( '../models/hospital' );

// getTodo

const getTodo = async ( req, res ) => {

    const search = req.params.search;
    const regex = new RegExp( search, 'i' );


    const [ users, medics, hospitals ] = await Promise.all( [
        User.find( { name: regex } ),
        Medic.find( { name: regex } ),
        Hospital.find( { name: regex } )
    ] )

    res.json( {
        ok: true,
        users,
        medics,
        hospitals
    } );

}

const getDocumentsCollection = async ( req, res ) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp( search, 'i' );

    let data = [];

    switch ( table ) {
        case 'medics':
            data = await Medic.find( { name: regex } )
                              .populate( 'user', 'name img' )
                              .populate( 'hospital', 'name img' );
            break;
        case 'hospitals':
            data = await Hospital.find( { name: regex } )
                                 .populate( 'user', 'name img' );
            break;
        case 'users':
            data = await User.find( { name: regex } );
            break;

        default:
            return res.status( 400 ).json( {
                ok: false,
                msg: 'The table must be from users/medics/hospitals'
            } );
    }

    res.json( {
        ok: true,
        results: data
    } );

}


module.exports = {
    getTodo,
    getDocumentsCollection
}
