const { Dog, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });



  describe('Temperament model', () => {
    before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    beforeEach(()=> {
      Temperament.sync ({force: true});  
    });
      it('Should not be created without all fields completed', (done)=> {
      Temperament.create({
        id: '8',
      })
      .then(()=> done (new Error('Should not have been created!!!')))
      .catch(()=> done());
      });
      it('Name have to be a string', ()=>{
        expect(typeof Temperament.name).equal("string")
      })
    });
});