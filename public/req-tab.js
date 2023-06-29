
;(function() {
  function $(selector) {
    return document.querySelector(selector);
  }

  function onClick(elem, l) {
    elem.addEventListener('click', l);
  }


  var content = $('#content');
  var noop = function() {};

  var wb = window.whistleBridge;
  var cgiOpts = {
    url: 'whistle.pbui/cgi-bin/pbview',
    type: 'post',
    mode: 'cancel'
  };


  var getBodyJSON = wb.createRequest(cgiOpts);

  wb.addSessionRequestListener(function(item) {
    console.log('item.req ' +  JSON.stringify(item.req));
    if (!item) {
      return;
    }
    var base64 = item.req.base64;
    if (!base64) {
      content.textContent = 'content empty';
      return;
    }
    var loadJSON = function() {
      content.textContent = '计算中...';
      content.onclick = noop;
      getBodyJSON({base64: base64}, function(data) {
        if (!data) {
          content.onclick = loadJSON;
          content.textContent = '请求失败，请点击<strong>重试</strong>！';
          return;
        }
        content.textContent = data.pbjs;
      });
    };
    loadJSON();
  });
})();
