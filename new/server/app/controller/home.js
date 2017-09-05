'use strict';
const fs = require('fs');
const path = require('path');
module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      // this.ctx.body = 'hi, egg';
      // yield this.ctx.render('index/index.html');
      this.ctx.body = fs.readFileSync(path.resolve(__dirname, '../view/index/index.html'), 'utf-8');
    }
  }
  return HomeController;
};
