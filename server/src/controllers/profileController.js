const connection = require('../database/conection');

async function index(req,res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection('incidents').where('ong_ig', ong_id).select('*');

    return res.json({incidents});
}

module.exports = {
    index
}