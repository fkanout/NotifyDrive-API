const open = require('amqplib').connect(process.env.AMQP);

const publish = async (data, queue) => {
  open.then((conn) => {
    let ok = conn.createChannel();
    ok = ok.then((ch) => {
      ch.assertQueue(queue);
      ch.sendToQueue(queue, new Buffer(data));
    });
    return ok;
  }).then(null, console.warn);
};


module.exports.publish = publish;
