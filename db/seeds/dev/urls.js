exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 123,
        folderId: 1,
        longUrl: 'www.fodors.com',
        clicks: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 456,
        folderId: 2,
        longUrl: 'www.animalplanet.com',
        clicks: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 789,
        folderId: 1,
        longUrl: 'www.washingtonpost.com',
        clicks: 0,
        created_at: new Date
      })
    ]);
  });
};
