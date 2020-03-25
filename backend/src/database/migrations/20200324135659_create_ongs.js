/* Método up responsável pela criação da tabela */
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

/* Método down responsável caso precise voltar atras da criação de uma tabela (deletar)*/
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
