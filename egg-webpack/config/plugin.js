'use strict';

// had enabled by egg
// exports.static = true;

exports.handlebars = {
  enable: false,
  package: 'egg-view-handlebars'
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};