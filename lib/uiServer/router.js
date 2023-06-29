const axios = require('axios')

const toPbJSON = async (body) => {
  const r = await axios
    .post('http://127.0.0.1:8000/decode', body);

  // 可视化
  const data = JSON.stringify(r.data, null, 2);
  console.log('data ' + data)
  return data
};

module.exports = (router) => {
  router.post('/cgi-bin/pbview', async (ctx) => {
    const {base64} = ctx.request.body;
    console.log('body ' + base64 + 'type ' + (typeof base64));
    const result = { pbjs: '' };
    if (base64 && typeof base64 === 'string') {
      result.pbjs = await toPbJSON(Buffer.from(base64, 'base64'));
    }
    console.log('pbjs ' + result.pbjs)
    ctx.body = result;
  });
};
