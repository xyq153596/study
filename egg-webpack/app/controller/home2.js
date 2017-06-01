'use strict';

module.exports = app => {
  class HomeController2 extends app.Controller {
    * index() {
        let data = {
          title: '神经病index',
          body: '傻逼2'
        }
        yield this.ctx.render('index', data);
      }
      * detail() {
        let data = {
          title: '神经病detail',
          body: '傻逼3',
          cookie: this.ctx.app.config.keys
        }
       
        yield this.ctx.render('index', data);
      }
      * getAjax() {
        let data = {
          title: '神经病detail',
          body: '傻逼'
        }

        yield this.ctx.response.body = data;
      }
  }
  return HomeController2;
};