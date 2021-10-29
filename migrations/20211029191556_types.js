
exports.up = function(knex) {
    return knex.schema.createTable('types', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('type_name').notNullable();
        table.timestamps(true, true); // adds created_at and updated_at
      });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('types');
};
