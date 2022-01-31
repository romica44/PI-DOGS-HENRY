/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
 
describe('/dogs', () => {
    it('GET respond with status 200', () =>
      agent.get('/dogs').expect(200)
    );
  })

describe ('/dogs?name=', ()=>{
  it('GET respond with status 200 if the name is a string', ()=>{
    agent.get('/dogs?name=pug')
    .expect((res)=>{
      expect(res.status).equal(200)})
  })
})
});




