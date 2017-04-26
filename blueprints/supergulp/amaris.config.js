module.exports = {
  name: 'supergulp',
  description: 'A featureful, *relatively* unopinionated gulp setup with dependency handling, image thumnailing and optimization, SASS & ES6 transpiling, static serving and more.',
  copy: [ 'gulpfile.js' ],
  npm: {
    devDeps: [
      'zaq', 
      'gulp', 
      'path', 
      'open', 
      'chalk', 
      'gulp-sass', 
      'gulp-less', 
      'gulp-copy', 
      'gulp-babel', 
      'gulp-filter',
      'bower-files',
      'gulp-rename', 
      'gulp-uglify', 
      'gulp-concat', 
      'merge-stream', 
      'gulp-replace',
      'child_process', 
      'gulp-imagemin', 
      'gulp-uglifycss', 
      'babel-preset-env',
      'gulp-image-resize',
    ]
  }
}
