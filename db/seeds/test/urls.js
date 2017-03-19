exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 123,
        folderId: 1,
        longUrl: 'www.fodors.com',
        short:123,
        clicks: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 456,
        folderId: 2,
        longUrl: 'www.animalplanet.com',
        short:456,
        clicks: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 789,
        folderId: 1,
        longUrl: 'www.washingtonpost.com',
        short:789,
        clicks: 0,
        created_at: new Date
      })
    ]);
  });
};
