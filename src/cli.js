#! /usr/bin/env node
// Reqs ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
const zaq = require('zaq');
const chalk = require('chalk');
const _ = require('underscore');
const input = require('minimist')(process.argv.slice(2));
// Local ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
const jaq = require('./jaq.js');
const params = require('./params.js');
// No blueprint provided ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
if (!input._.length) {
  zaq.err('No blueprint provided. Exiting.');
  process.exit(1);
}
// Check if blueprint exists ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
let form = input._.shift();
if (!_.contains(jaq.blueprints, form)) {
  zaq.err(`Invalid blueprint provided: "${form}" not found.`);
  process.exit(1);
}
// Flag option decompression ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
_.each(params, (info, key) => {
  if (_.has(input, info.flag)) input[key] = input[info.flag];
  if (input[key]) zaq.info(`Using '${input[key]}' as '${key}'.`);
});
// Splash ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
zaq.divider('', '#!');
zaq.space(
`\t jaq, a scaffolding tool, v${jaq.version}, by ajb
\t ${chalk.dim('Running blueprint')}: ${chalk.blue.bold(form)}`);
zaq.divider('', '#!');
// Do the thing ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
jaq.scaffold(form, input);
// Bye ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
