const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js')
const chaiHttp = require('chai-http');

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
    it('should return all folders',(done)=>{
      chai.request(app)
      .get('/api/folders')
      .end((err,res)=>{
        if(err) {done(err)}
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        done()
      })
    })
  })
  describe('POST /api/folders', ()=>{
    it('should add a folder to the array',(done)=>{
      chai.request(app)
      .post('/api/folders')
      .send({name:'food', id:3})
      .end((err,res)=>{
        if(err){done(err);}
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal()
        done()
      })
    })
  })
});
