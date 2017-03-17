exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 101,
        name: 'travel',
        created_at: new Date
      }),
      knex('folders').insert({
        id: 102,
        name: 'animals',
        created_at: new Date
      })
    ]);
  });
};
