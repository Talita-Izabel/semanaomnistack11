const connection = require('../database/connection')

// Login - para validar se a conta existe
module.exports = {
    async create(request, response) {
        const {id} = request.body;

        const ong = await connection('ongs')
            .where('id',id)
            .select('name')
            .first();
 
        // Se a ONG não existir ele retorna um error falando que não existe
        if(!ong){
            return response.status(400).json({ error: 'No ONG found whith with this ID'});
        }

        return response.json(ong);
    }
}