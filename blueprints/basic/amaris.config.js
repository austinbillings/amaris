module.exports = {
  name: 'basic',
  description: 'A blank, framework-free website starting template. Includes Gulp, jQuery, Underscore, Xx, Jawn, and Mansion.',
  require: [ 'name', 'author' ],
  mkdir: [
    'js', 'html', 'scss', 'dist'
  ],
  copy: [
    'index.html',
    'bower.json',
    'gulpfile.js',
    'package.json',
    'scss/main.scss',
    'scss/mixins.scss'
  ],
  bower: {
    deps: [
      'jquery', 'underscore', 'xx', 'jawn', 'mansion'
    ]
  },
  npm: {
    devDeps: [
      'bower-files', 'path', 'zaq', 'chalk', 'merge-stream', 'gulp', 'gulp-sass', 'gulp-less', 'gulp-copy', 'gulp-filter', 'gulp-rename', 'gulp-uglify', 'gulp-concat', 'gulp-replace', 'gulp-uglifycss', 'gulp-image-resize'
    ]
  },
  commands: [
    'gulp deps',
    'gulp sass',
    'atom .'
  ]
}
