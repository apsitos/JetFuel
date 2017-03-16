
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('folders', function(table) {
            table.increments('id').primary();
            table.string('name');

            table.timestamps();
        }),

        knex.schema.createTable('urls', function(table){
            table.string('id').primary();
            table.string('folderId')
                 .references('id')
                 .inTable('folders');
            table.string('longUrl');
            table.string('short');
            table.integer('clicks');

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('folders'),
        knex.schema.dropTable('urls')
    ])
};
