'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/detail', 'home.detail');
  app.get('/api/:id', 'news.index');
};
