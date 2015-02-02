var request = require('request');

storyJsons = JSON.stringify({
    "status": "Published",
    "headline": "NodeJS/Mocha automation test story INSIDE",
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
postDatas = {
    url: 'http://10.189.4.135/aime/AssetsService.svc/asset/upload',
    body: storyJsons,
    headers: {'Content-Type': 'application/json'}
};
function create_asset(){
    console.log("inside function");
    request.post(postDatas, function(error, response, body){
        response.statusCode.should.equal(200);
        console.log("start post request");
        res_body = JSON.parse(body);
        console.log(response.body);
        id = res_body.Result;
        console.log(id);
        console.log("end request")
        return id
    })
    //console.log(id)
    console.log("Print")

}

exports.create_asset = create_asset;
