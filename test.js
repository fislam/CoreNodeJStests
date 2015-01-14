var chai = require('chai');
var request = require('request'),
    express = require('express');
var app = express();
var assert = chai.assert,
    should = chai.should();
var    supertest = require('supertest'),
    api = supertest('http://159.54.243.12/presentationservice/v3/assets/20849045');
    expect = chai.expect;

describe('Presentation test', function() {

  it('Hit the presentation service', function(done) {
    api.get('?sc=1&apiKey=test-automation')
    .expect('Content-Type', /json/)
    .expect(200)

    .end(function(err, res){
      var assetId = res.body[0].assetId
      expect(res.body[0]).to.have.property('assetId').and.equal(20849045);
      expect(res.body[0]).to.have.property('statusName').and.equal('published');
      expect(res.body[0]).to.have.property('headline').and.equal('Videos show officer shooting armed teen near Ferguson');
      
      //console.log(res.body[0].photo.crops);
      console.log(assetId);

      done();
    })
  });



});


