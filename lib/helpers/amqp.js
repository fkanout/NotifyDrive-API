/**
 * Created by JS on 25/12/2016.
 */

// const open = require('amqplib').connect(process.env.AMQP);

// const publish = async function(data, queue){
//     console.log(data, queue);
//     open.then(function (conn){
//         let ok = conn.createChannel();
//         ok = ok.then(function (ch){
//             ch.assertQueue(queue);
//             ch.sendToQueue(queue, new Buffer(data));
//         });
//         return ok;
//     }).then(null, console.warn);
// };


// module.exports.publish = publish;
