module.exports = {
  name: 'react',
  description: 'A simple React + Webpack template',
  mkdir: [
    'src', 'src/components', 'dist', 'ui', 'ui/sass', 'ui/img'
  ],
  touch: [
    'src/index.jsx', 'ui/sass/main.scss'
  ],
  yarn: [
    'node-sass',
    'babel-core',
    'babel-preset-env',
    'babel-preset-react',
    'webpack',
    'webpack-dev-server',
    'url-loader',
    'css-loader',
    'file-loader',
    'sass-loader',
    'style-loader',
    'babel-loader',
    'react',
    'redux',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-dom',
    'react-router-redux'
  ],
  bower: {
    dependencies: [ 'xx', 'mansion' ]
  },
  commands: [
    'atom .',
    'webpack-dev-server',
    'echo ".DS_Store" >> .gitignore',
    'echo "node_modules" >> .gitignore',
    'echo "bower_components" >> .gitignore'
  ]
}