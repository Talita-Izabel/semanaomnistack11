const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        //Para a paginação, não mostrar todos os casos de uma vez
        const { page = 1} = request.query;
        
        //Mostrar o total de casos
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email',
                'ongs.whatsapp', 
                'ongs .city',
                'ongs.uf' 
            ]);

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // const[id] é para pegar o id que foi gerado a partir desse cadastro
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({ id });
        /* Serve para saber qual usuario esta logado atraves do cabeçalho, guarda informações 
        do contexto dessa requisição, com dados da autenticação do usário, dados do idioma e tal
        request.headers;*/
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        // verificar se o id existe para deletar a ong
        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first(); // retorna apenas um resultado

            /*Se o ong_id desse incidente que foi buscado for diferente do ong_id 
            que está logado na aplicação, vai dar um erro */
            if(incident.ong_id != ong_id){
                // 401 significa não autorizado
                return response.status(401).json({ error: 'Operation not permitted.'});
            }
        await connection('incidents').where('id', id).delete();
        
        // 204 resposta que deu sucesso, mas não tem conteudo
        return response.status(204).send();
    }
};