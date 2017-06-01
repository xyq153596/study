'use strict';
let path = require('path');
module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1496212531975_4036';

  // add your config here
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.tpl',
    mapping: {
      '.tpl': 'nunjucks'
    },
    root: path.join(appInfo.baseDir, 'app/view')
  }
  config.middleware = ['test'];
  config.css = "傻逼逼";
  return config;
};