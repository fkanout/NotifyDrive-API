
module.exports = () => function cors(ctx, next) {
  if (ctx.method === 'OPTIONS') {
    const allowHeaders = ctx.get('Access-Control-Request-Headers');
    ctx.set('Access-Control-Allow-Headers', allowHeaders);
    ctx.status = 204;
  }
  if (process.env.ENV && process.env.ENV === 'DEV') {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH');
  }
  return next();
};
