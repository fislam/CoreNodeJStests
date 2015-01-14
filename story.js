var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var supertest = require('supertest')


describe('Create a story', function(){
	it('Make a POST call to create a story', function(done){
// The story payload		
		storyJson = JSON.stringify({
  "status": "Published",
  "headline": "NodeJS/Mocha automation test story",
  "body": "<body><p>NodeJS/Mocha automation test story</p></body>",
  "contentsourcecode": "USAT",
  "source": "USA TODAY",
  "attributes": [
    {
      "name": "brief",
      "value": "Promo brief"
    },
    {
      "name": "short-hed",
      "value": "AutomationQAATest:  Do not use_Story"
    },
    {
      "name": "seoname",
      "value": "test-for-core-AutomationQAATest"
    },
    {
      "name": "lastaction",
      "value": "Published"
    }
  ],
  "id": 0,
  "propertyID": 1,
  "siteid": 1,
  "assetGroupId": 1,
  "type": "text",
  "positionSpecified": false,
  "handling": {
    "publishto": {
      "pageurl": {
        "shortUrl": "",
        "shortMobileUrl": "",
        "text": "http://ux-stage.usatoday.com/story/news/2015/01/12/test-for-core-AutomationQAATest/{assetid}"
      },
      "ssts": {
        "section": "news"
      },
      "fronts": [
        {
          "id": "158",
          "kikker": "",
          "type": "front",
          "location": "news"
        }
      ]
    }
  }
		})
	var postData = {
		url: 'http://10.189.4.135/aime/AssetsService.svc/asset/upload?ApiKey=test-automation',
		body: storyJson,
		headers: {'Content-Type': 'application/json'}
}
// making the post call to create the story
request.post(postData, function(error, response, body){
	var assetId = JSON.parse(body)
	console.log(assetId.Result)
	id = assetId.Result
	done()
})


		
	})
	it('Call Presentation Service with the Story created', function(done){

		getUrl = 'http://159.54.243.19/presentationservice/v3/assets/'+id+'?sc=1&apiKey=test-automation'
		getUrl = String(getUrl)
		console.log(getUrl)
		var getData = {
			url: getUrl,
			headers: {'Content-Type': 'application/json'}
// having some trouble here.  There is no data being returned since I have not figured out how to do a dealy of 12 seconds 
// to wait for replication
		}
		request(getData, function(error, response, body){
			console.log(body)
			done()
		})

	})
})

/*var chai = require('chai');
var request = require('supertest'),
    express = require('express');
var app = express()
var assert = chai.assert,
    should = chai.should();
var    supertest = require('supertest'),
    api = supertest('http://159.54.243.12/presentationservice/v3/assets/20849045'),
    expect = chai.expect;



describe('Presentation test', function() {

  it('Hit the presentation service', function(done) {
    api.get('?sc=1&apiKey=test-automation')
    .expect('Content-Type', /json/)
    .expect(200)

    .end(function(err, res){
      var assetId = res.body[0].assetId
      expect(res.body[0]).to.have.property('assetId').and.equal(20849045)
      expect(res.body[0]).to.have.property('statusName').and.equal('published')
      expect(res.body[0]).to.have.property('headline').and.equal('Videos show officer shooting armed teen near Ferguson')
      
      console.log(res.body[0].photo.crops)
      console.log(assetId)

      done()
    })
  });

});
*/
