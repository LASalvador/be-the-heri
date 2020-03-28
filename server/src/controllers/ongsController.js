const crypto = require('crypto');
const connection = require('../database/conection');

async function index(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id, 
        name,
        whatsapp,
        email, 
        city, 
        uf
    });

    res.json({ id });
}

async function list(req, res) {
    const ongs = await connection('ongs').select('*');
    res.json(ongs);
}

module.exports = {
    index,
    list
}