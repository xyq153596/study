require('./style.scss');
console.log("webpack启动了");
fetch("http://127.0.0.1:7001/getAjax")
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log("存在一个问题，状态码为：" + response.status);
        return;
      }
      //检查响应文本
      response.json().then(function (data) {
        console.log(data);
      });
    }
  )
  .catch(function (err) {
    console.log("Fetch错误:" + err);
  });