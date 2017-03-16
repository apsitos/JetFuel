
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table){
            table.string('short');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table) {
          table.dropColumn('short');
        }),
    ])
};
