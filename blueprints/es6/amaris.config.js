module.exports = {
  name: 'es6',
  description: 'A ready-to-publish template for ES6 Javascript to be compiled into browser-safe code.',
  require: [ 'name', 'author', 'description' ],
  mkdir: [
    'dist', 'src'
  ],
  copy: [
    'config.js', 'gulpfile.js'
  ],
  npm: {
    devDeps: [
      'gulp', 'gulp-uglify', 'gulp-babel', 'gulp-concat', 'zaq'
    ]
  },
  commands: [
    'atom .',
    'gulp'
  ]
}
