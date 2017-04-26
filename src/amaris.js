const fs = require('fs');
const zaq = require('zaq');
const Cloq = require('cloq');
const chalk = require('chalk');
const _ = require('underscore');
const mkdir = require('mkdirp');
const shell = require('shelljs');
const params = require('./params.js');
const collector = require('colleqtor');

let amaris = {
  params,
  version: '1.1.0',
  blueprints: collector.listFiles(__dirname + '/../blueprints/', null, true),
  // Require Options -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  require (requirements, input) {
    // innocent until proven guity
    let pass = true;
    _.each(requirements, (requiredParam) => {
      let param = {};

      if (_.has(params, requiredParam)) {
        param = params[requiredParam];
      } else {
        param = params.unknown(requiredParam);
        zaq.warn(`Unknown parameter "${requiredParam}" required by blueprint. `)
      }

      if (!_.has(input, requiredParam)) {
        zaq.err(param.error);
        zaq.err(chalk.dim(`Provide a ${requiredParam} with the -${param.flag} flag.`));
        zaq.err(chalk.dim(`Example: -${param.flag} ${param.example} \n`));
        pass = false;
      }
    });
    return pass;
  },
  // Make dirs -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  directories (dirs) {
    zaq.divider('\n Making directories...', '-=~=');
    _.each(dirs, (dir) => {
      mkdir.sync(dir);
      zaq.win(`Created directory: ${dir}`);
    });
    return true;
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
    return true;
  },
  // Node Modules -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  installNode (npm) {
    zaq.divider('\n Installing Node modules via Yarn...', '-=~=');
    if (npm.deps) {
      zaq.info(chalk.dim(chalk.bold(npm.deps.length) + ' NPM dependencies;'));
      shell.exec('yarn add ' + npm.deps.join(' '));
    }
    if (npm.devDeps) {
      zaq.info(chalk.dim(chalk.bold(npm.devDeps.length) + ' NPM dev dependencies;'));
      shell.exec('yarn add -D ' + npm.devDeps.join(' '));
    }
    return true;
  },
  // Bower Components -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  installBower (bower) {
    zaq.divider('\n Installing Bower components...', '-=~=');
    if (bower.deps) {
      zaq.info(chalk.dim(chalk.bold(bower.deps.length) + ' Bower dependencies;'));
      shell.exec('bower install --save ' + bower.deps.join(' '));
    }
    if (bower.devDeps) {
      zaq.info(chalk.dim(chalk.bold(bower.deps.length) + ' Bower dev dependencies;'));
      shell.exec('bower install --save-dev ' + bower.deps.join(' '));
    }
    return true;
  },
  // Straight Yarn -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  yarnInstall (deps) {
    zaq.divider('\n Installing dependencies (via yarn)...', '-=~=');
    zaq.info(chalk.dim(chalk.bold(deps.length) + ' dependencies;'));
    shell.exec('yarn add ' + bower.deps.join(' '));
    return true;
  }
  // Exec commands -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  runCommands (commands) {
    zaq.divider('\n Running commands...', '-=~=');
    _.each(commands, (command) => {
      zaq.info('Running command: ' + chalk.cyan.bold(command));
      shell.exec(command);
    });
    return true;
  },
  // Run a scaffold template -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  scaffold (blueprint, input) {
    let directory = __dirname + '/../blueprints/' + blueprint + '/';
    let config = require(directory + 'amaris.config.js');

    zaq.space(config.description);

    if (config.require && !amaris.require(config.require, input))
      return false;
    let cloq = new Cloq('scaffolding');

    if (config.mkdir && !amaris.directories(config.mkdir))
      return false;
    cloq.lap('directories');

    if (config.copy && !amaris.copyFiles(config.copy, directory, input))
      return false;
    cloq.lap('copying files');

    if (config.npm && !amaris.installNode(config.npm))
      return false;
    cloq.lap('npm install');

    if (config.bower && !amaris.installBower(config.bower))
      return false;
    cloq.lap('bower install');
    
    if (config.yarn && !amaris.yarnInstall(config.yarn))
      return false;
    cloq.lab('yarn install');

    if (config.commands && !amaris.runCommands(config.commands))
      return false;
    cloq.done('running commands');

    zaq.win(`Successfully scaffolded from the "${chalk.bold(blueprint)}" blueprint. \n`);
    return true;
  }
};

module.exports = amaris;
