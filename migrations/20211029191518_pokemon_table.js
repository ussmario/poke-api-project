exports.up = function(knex) {
  return knex.schema.createTable('pokemon_table', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('name').notNullable();
    table.integer('poke_id');
    table.integer('height');
    table.integer('weight');

table.string()''image_url;    table.timestamps(true, true); // adds created_at and updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pokemon_table');
};