# Jaq

Minimalist scaffolding for quick, MEAN apps.

## Installation

Use **jaq** from the command line, by installing it globally like so:
```bash
sudo npm install -g jaq
```

## Overview
**Jaq** is a node-based tool to quickly and easily create blank project templates, and then create instances of those projects with a single command. Setup your project "blueprint" however you like, and then Jaq will do all the work of setting up new projects using the given "blueprint".

### Basics

Call an existing blueprint on the command line:
```bash
jaq <name-of-blueprint> [<blueprint-required-arg>...]
```

...and Jaq will build an empty project from your template in the current working directory.

For example, Jaq comes with an "angular" and "basic" blueprint to start. It requires `name` and `author` parameters. Pass them with the `-n` and `-a` arguments, respectively.

```bash
jaq frontend -n 'MyApp' -a 'Dominic Cobb <dom@cobolengineering.com>'
```

First, Jaq checks its `/blueprints` directory for a match to your specified blueprint, which in this case is 'frontend'. It `require()`s a file inside called `jaq.config.js`, which contains the specific configuration for Jaq to recreate the project.


Here's an example `jaq.config.js`

```js
module.exports = {
  name: 'example-blueprint',
  description: 'An example app with simple website setup.',
  require: ['name', 'author'],
  mkdir: ['js', 'html', 'css', 'assets/photos'],
  copy: [
    'index.html',
    'bower.json',
    'gulpfile.js',
    'package.json',
    'js/myScript.js',
    'css/stylesheet.css'
  ],
  bower: {
    deps: ['jquery'],
    devDeps: ['compass']
  },
  npm: {
    deps: ['asdf']
  },
  commands: ['gulp']
}
```

If the required paramaters have been passed, Jaq **starts with creating the directories** specified in `mkdir`. Nested folders here are allowed, and do not require that parent folders be created beforehand (in the above example, the 'assets' folder is created automatically and populated with a 'photos' folder).

Next, Jaq **copies the files** specified in `copy` from the blueprint's directory to your working directory, overwriting any existing files of the same name. This is where you may make use of the parameters required in your configuration. The file contents of all copied files are processed to resolve parameterized variables using ERB syntax. For example, your `index.html` file might include the following line:

```html
<title><%= name %></title>
```
 If you pass `-n Supercool` when you call Jaq, "Supercool" will be used as the name, and replace all instances of `<%= name %>` in your code. This will result in the following line in your new project's `index.html` file:

 ```html
 <title>Supercool</title>
 ```

Next, Jaq installs the necessary NPM Dependencies and Development Dependencies, as specified in the configuration's `npm.deps` and `npm.devDeps` arrays. Note: a `package.json` file is **not** automatically created in the new directory, so make sure one is created before using Jaq, or, better yet, include one as part of the copy process above. Then, this process is repeated for Bower, using `bower.deps` and `bower.devDeps`.

Finally, any commands listed in the `commands` array are executed in their given order.
