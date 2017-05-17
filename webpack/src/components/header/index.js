// require('./style.sass');
var htmlTpl = require("./view.hbs");
var data = {
  title: "草泥马"
};
var tpl = htmlTpl(data);
module.exports = tpl;