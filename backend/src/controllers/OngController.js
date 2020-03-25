// Para gerar uma string aleatória (para o id)
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
       const ongs = await connection('ongs').select('*');
       return response.json(ongs);
    },

    async create(request, response){
        //const params = request.query;
    //const params = request.params;
    //const body = request.body;
    //console.log(body);

    const { name, email, whatsapp, city, uf } = request.body;

    //Irá gerar 4 bytes aleátorios de caractere e irá converter em strings do tipo hexadecimal
    const id = crypto.randomBytes(4).toString('HEX');

    /* para inserir dados, mas como pode demorar um pouco é preciso retornar o resultado
        dessa ong que foi recem criada só depois que o insert for finalizado utilizando
        await
    */
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })


    // Irá devolver apenas o id da ong, pois a ong tem que saber o id, entao retorna
    return response.json({  id  });
    }
}