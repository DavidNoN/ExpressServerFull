const { response } = require('express');

const Medic = require('../models/medics');

const getMedic = async (req, res) => {

    const medics = await Medic.find()
        .populate('user', 'name img')
        .populate('hospital', 'name img');

    res.json({
        ok: true,
        medics
    });
}

const createMedic = async (req, res) => {

const uid = req.uid;
const medic = new Medic({
    user: uid,
    ...req.body
})

    try {

        const medicDB = await medic.save();

        res.json({
            ok: true,
            medic: medicDB
        })
    } catch ( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin'
        });

    }

}

const updateMedic = (req, res) => {

    res.json({
        ok: true,
        msg: 'updateMedic'
    });
}

const deleteMedic = (req, res) => {

    res.json({
        ok: true,
        msg: 'deleteMedic'
    });
}

module.exports = {
    getMedic,
    createMedic,
    updateMedic,
    deleteMedic
}
