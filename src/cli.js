#! /usr/bin/env node
const havok = require('./app.js');
const opts = require('minimist')(process.argv.slice(2));
const zaq = require('zaq');
const chalk = require('chalk');
const _ = require('underscore');
const version = '0.0.1';

if (opts.n) opts.name = opts.n;
if (opts.d) opts.description = opts.d;
if (opts.a) opts.author = opts.a;

if (!opts._.length) {
  zaq.err('No Havok preset provided. Exiting.');
  process.exit(1);
}

let form = opts._[0];
delete opts._;

if (!_.contains(havok.jobs, form)) {
  zaq.err(`Invalid blueprint provided: ${form} not found.`);
  process.exit(1);
}

zaq.divider('', '#!');
zaq.space(`\tHavok, a scaffolding tool, v${version}, by AJB\n\tRunning blueprint: ` + chalk.bold(form));
zaq.divider('', '#!');

havok.scaffold(form, opts);
