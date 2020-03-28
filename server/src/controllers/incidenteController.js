const connection = require('../database/conection');

async function create(req,res) {
    const ong_id = req.headers.authorization;
    const {title, description, value} = req.body;

   const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id
    });

   return res.json({id});
}
async function index(req,res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1 ) * 5)
        .select([
            'incidents.*',  
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
         ]);
    
    res.header('x-total-count', count['count(*)']);
    return res.json({ incidents });
}

async function drop(req,res) {
    const incident_id = req.params.id;
    const ong_id = req.headers.authorization;
    
    const incident = await connection('incidents')
        .where('id', incident_id)
        .select('ong_id')
        .first();

    if(incident.ong_id !== ong_id) {
        return res.status(401).json({ error: "not perminted"});
    }

    await connection('incidents').where('id', incident_id).delete();

    return res.status(204).send(); 

}

module.exports = {
    create,
    index,
    drop,
}