process.env.NODE_ENV = 'test'
const config = require('../knexfile.js')['test']
const knex = require('knex')(config)

const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js')
const chaiHttp = require('chai-http');
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  });

  describe('GET /', ()=>{
    it('should return html successfully',(done)=>{
      chai.request(app)
      .get('/')
      .end((err,res)=>{
        if(err) { done(err); }
        expect(res).to.have.status(200)
        expect(res).to.be.html
        done();
      });
    });
  });

  describe('GET /api/folders', ()=>{
    beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });
  afterEach((done)=>{
    knex.migrate.rollback()
    .then(()=>{
      done()
    })
  })
    it('should return all folders',(done)=>{
      chai.request(app)
      .get('/api/folders')
      .end((err,res)=>{
        if(err) {done(err)}
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body).to.have.length(2)
        done()
      })
    })
  })
  describe('GET /api/folders/:id/urls',()=>{
    beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });
  afterEach((done)=>{
    knex.migrate.rollback()
    .then(()=>{
      done();
    })
  })
    it('should return all urls that belong to an ID',(done)=>{
      chai.request(app)
      .get('/api/folders/1/urls')
      .end((err,res)=>{
        if(err) {done(err)}
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        done();
      })
    })
  })
  describe('POST /api/urls',()=>{
    beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });
  afterEach((done)=>{
    knex.migrate.rollback()
    .then(()=>{
      done()
    })
  })
    it('should add a url to the url array',(done)=>{
      chai.request(app)
      .post('/api/urls')
      .send({
        id: 123,
        folderId: 1,
        short:'goo.gle',
        longUrl: 'www.google.com',
        clicks: 0,
        created_at: new Date
      })
      .end((err,res)=>{
        if(err){ done(err) }
        expect(res).to.have.status(200)
        done();
      })
    })
  })
  describe('POST /api/folders', ()=>{
    beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });
  afterEach((done)=>{
    knex.migrate.rollback()
    .then(()=>{
      done();
    })
  })
    it('should add a folder to the array',()=>{
      chai.request(app)
      .post('/api/folders')
      .send({
         name:'Music'})
      .end((err,res)=>{
        if(err){done(err);}
        expect(res).to.have.status(200)
        done()
      })
    })
  })

});
