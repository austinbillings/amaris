const zaq = require('zaq');
const fs = require('fs');
const _ = require('underscore');
const chalk = require('chalk');
const Cloq = require('cloq');
const shell = require('shelljs');
const mkdir = require('mkdirp');
const collector = require('./collector.js');

let havok = {
  jobs: ['frontend'],
  // Require Options -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  require (requirements, options) {
    _.each(requirements, (msg, key) => {
      if (!_.has(options, key)) { zaq.err(msg); process.exit(1); }
    });
  },
  // Make dirs -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  directories (dirs) {
    zaq.divider('\n Making directories...', '-=~=');
    _.each(dirs, (dir) => {
      mkdir.sync(dir);
      zaq.win(`Created directory: ${dir}`);
    });
  },
  // Copy files -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  copyFiles (list, directory, options) {
    zaq.divider('\n Copying files...', '-=~=');
    let files = collector.getFileContent(list, true, false, directory);
    files = _.mapObject(files, (file) => _.template(file)(options));
    _.each(files, (content, fileName) => {
      fs.writeFileSync(fileName, content);
      zaq.win(`Copied file: ${fileName}`);
    });
  },
  // Node Modules -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  installNode (npm) {
    zaq.divider('\n Installing Node modules...', '-=~=');
    if (npm.deps) {
      zaq.info(chalk.dim(chalk.bold(npm.deps.length) + ' NPM dependencies;'));
      shell.exec('npm i --save ' + npm.deps.join(' '), {silent: true});
    }
    if (npm.devDeps) {
      zaq.info(chalk.dim(chalk.bold(npm.devDeps.length) + ' NPM dev dependencies;'));
      shell.exec('npm i --save-dev ' + npm.devDeps.join(' '), {silent: true});
    }
  },
  // Bower Components -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  installBower (bower) {
    zaq.divider('\n Installing Bower components...', '-=~=');
    if (bower.deps) {
      zaq.info(chalk.dim(chalk.bold(bower.deps.length) + ' Bower dependencies;'));
      shell.exec('bower install --save ' + bower.deps.join(' '), {silent: true});
    }
    if (bower.devDeps) {
      zaq.info(chalk.dim(chalk.bold(bower.deps.length) + ' Bower dev dependencies;'));
      shell.exec('bower install --save-dev ' + bower.deps.join(' '), {silent: true});
    }
  },
  // Exec commands -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  runCommands (commands) {
    _.each(commands, (command) => {
      zaq.divider('\n Running commands...', '-=~=');
      zaq.info('Running command: ' + chalk.cyan.bold(command));
      shell.exec(command, {silent: true});
    });
  },
  // Run a scaffold template -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  scaffold (set, options) {
    let cloq = new Cloq('Scaffolding');
    let cwd = './';
    let directory = __dirname + '/../jobs/' + set + '/';
    let config = require(directory + 'havok.config.js');
    if (config.require) havok.require(config.require, options);
    cloq.lap('requiring');
    if (config.mkdir) havok.directories(config.mkdir);
    cloq.lap('directories');
    if (config.copy) havok.copyFiles(config.copy, directory, options);
    cloq.lap('copying files');
    if (config.npm) havok.installNode(config.npm);
    cloq.lap('npm install');
    if (config.bower) havok.installBower(config.bower);
    cloq.lap('bower install');
    if (config.commands) havok.runCommands(config.commands);
    cloq.done('running commands');
    zaq.win('Successfully scaffolded from the "' + chalk.bold(set) + '" blueprint.\n');
  }
};

module.exports = havok;
