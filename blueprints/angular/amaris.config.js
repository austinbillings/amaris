module.exports = {
  name: 'angular',
  description: 'An Angular frontend app with integrated Gulp, Ringo, Xx, Northeast, and Mansion.',
  require: [ 'name', 'author' ],
  mkdir: [
    'js', 'js/controllers', 'js/services', 'js/directives', 'html', 'html/partials', 'html/views', 'html/templates', 'scss', 'assets', 'json', 'dist'
  ],
  copy: [
    'index.html', 'bower.json', 'gulpfile.js', 'package.json', 'js/module.js', 'js/controllers/base.js', 'html/views/main.html', 'scss/main.scss', 'scss/mixins.scss'
  ],
  bower: {
    deps: [
      'jquery', 'underscore', 'angular', 'angular-animate', 'hookup', 'ringo', 'jawn', 'northeast', 'font-awesome', 'xx', 'mansion'
    ]
  },
  npm: {
    devDeps: [
      'bower-files', 'path', 'zaq', 'chalk', 'merge-stream', 'gulp', 'gulp-sass', 'gulp-less', 'gulp-copy', 'gulp-filter', 'gulp-rename', 'gulp-uglify', 'gulp-concat', 'gulp-replace', 'gulp-uglifycss', 'gulp-image-resize'
    ]
  },
  commands: [
    'gulp deps',
    'gulp app',
    'gulp sass',
    'atom .',
    'gulp'
  ]
}
