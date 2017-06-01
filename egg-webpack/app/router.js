'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/detail', 'home.detail');
  app.get('/getAjax', 'home.getAjax');
  app.get('/getAjax', 'home2.getAjax');
};
