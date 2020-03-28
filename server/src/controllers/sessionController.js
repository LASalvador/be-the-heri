const connection = require('../database/conection');

async function create(req,res) {
    const { id  } = req.body;

    const ong = await connection('ongs').where('id', id).select('name').first();

    if (!ong) {
        return res.status(404).json({error: 'Ong not found'});
    }

    return res.json({ong});
}

module.exports = {
    create
}