'use strict';

const loader  = require('../lib/loader.js');
const Koa     = require('koa');
const request = require('supertest');
const chai    = require('chai');
const expect  = chai.expect;



describe('loader.js - Routes loader', function () {

  describe('Exceptions', function() {
    it('Should throw \'Koa app as first parameter expected\' Exception', function () {
      expect(loader.bind(loader)).to.throw('koa app as first parameter expected');
    });
  });

  describe('Single route file', function () {
    it('should GET -> status -> [200] - Sync', function (done) {

      var app = loader(new Koa(), {
        path  : 'test/routes/single.js',
        async : false
      });

      request(app.listen())
        .get('/route-gen')
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done(err);
          }
          done();
        });
    });
  });



  describe('Multipe routes files', function () {
     it('should GET -> status -> [200] - Async', function (done) {

      loader( new Koa(), {
        path  : 'test/routes/multiple',
        async : true
      })
      .then(app => {

        request(app.listen())
          .get('/second-route-gen')
          .expect(200)
          .end((err, res) => {
            if (err) {
              console.log("err --> ", err);
              return done(err);
            }
            done();
          });

      })
      .catch(err => {
        return done(err);
      });
    });
  });
});