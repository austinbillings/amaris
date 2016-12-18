module.exports = {
  name: 'frontend',
  require: {
    name: 'A name for your project is required. Use the -n flag to provide a name.',
    author: 'An author of this project is required. Use the -a flag to provide an author name and email, like so: "Antwon Barnabus <antwon@barnabus.biz>"'
  },
  mkdir: [
    'js',
    'js/controllers',
    'js/services',
    'js/directives',
    'html',
    'html/partials',
    'html/views',
    'html/templates',
    'scss',
    'assets',
    'data',
    'dist'
  ],
  copy: [
    'index.html',
    'bower.json',
    'gulpfile.js',
    'package.json',
    'js/module.js',
    'js/controllers/base.js',
    'html/views/main.html',
    'scss/main.scss',
    'scss/mixins.scss'
  ],
  bower: {
    deps: [
      'jquery',
      'underscore',
      'angular',
      'angular-animate',
      'hookup',
      'ringo',
      'jawn',
      'northeast',
      'font-awesome',
      'xx',
      'mansion'
    ]
  },
  npm: {
    devDeps: [
      'bower-files',
      'path',
      'zaq',
      'chalk',
      'merge-stream',
      'gulp',
      'gulp-sass',
      'gulp-less',
      'gulp-copy',
      'gulp-filter',
      'gulp-rename',
      'gulp-uglify',
      'gulp-concat',
      'gulp-replace',
      'gulp-uglifycss',
      'gulp-image-resize'
    ]
  },
  commands: [
    'gulp deps'
  ]
}
