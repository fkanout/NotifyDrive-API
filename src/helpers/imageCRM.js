// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');
// Your Google Cloud Platform project ID
const projectId = 'imagereader-167016';
// Instantiates a client
const visionClient = Vision({
  projectId: projectId,
  keyFilename: './crm_config.json'
});

const rpn = require('request-promise-native');

// Performs label detection on the image file
const imageCRM = async (image) =>{
    const body = {
             "requests": [
                {
                "image": {
                    "content": image
                },
                "features": [
                    {
                    "type": "TEXT_DETECTION"
                    }
                ]
                }
            ]
        };
    try{
        return await rpn.post({
            url: 'https://vision.googleapis.com/v1/images:annotate',
            qs: {
                'key': 'AIzaSyCwSEDGhFvlALLReFPDT0TfzZ4760ic6gw'
            },
            headers: {
                'Content-Type': 'application/javascript',
            },
            body: JSON.stringify(body)
        });
    }catch(err){
        console.log('here');
        console.log(err);

    }
}
module.exports.imageCRM = imageCRM;