// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');
// Your Google Cloud Platform project ID
const projectId = 'imagereader-167016';
// Instantiates a client
const visionClient = Vision({
  projectId: projectId,
  keyFilename: './crm_config.json'
});

// Performs label detection on the image file
const imageCRM = async (image) =>{
    try{
        return await visionClient.detectText(image);
    }catch(err){
        console.log(err);

    }
}
module.export = imageCRM;