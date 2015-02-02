var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var request = require('request');
var chai = require('chai');
var mod = require('./create_asset');

describe('Create a story', function() {
    this.timeout(0)
    it('Should return asset id', function (done) {
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
        });
        var postData = {
            url: 'http://10.189.4.135/aime/AssetsService.svc/asset/upload',
            body: storyJson,
            headers: {'Content-Type': 'application/json'}

        };
        request.post(postData, function (err, res, body) {
            console.log("hello mama")
            res.statusCode.should.equal(200);
            var res_body = JSON.parse(body);
            console.log(res.body);
            Aid = res_body.Result;
            console.log(Aid);
            console.log("bye mama")
            done();
        })
    });

    it('Should delete the asset', function (done) {
        var test = mod.create_asset();
        console.log(test);
        console.log("end function");

        console.log("first test");
        delete_url = 'http://10.189.4.135/aime/Utilities.svc/deleteasset?AssetId=' + Aid;
        console.log(delete_url);
        delete_data = {
            url: delete_url,
            headers: {'Content-Type': 'application/json'}
        };
        request.post(delete_data, function (err, res, body) {
            res.statusCode.should.equal(200)
            console.log("test");
            done();
        });
    });
});


