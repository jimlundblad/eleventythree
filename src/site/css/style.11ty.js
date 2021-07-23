const path = require('path')
const fs   = require('fs')
const less = require('less')
const CleanCSS = require('clean-css')
const postcss = require('postcss')
const purgeCSS = require('@fullhuman/postcss-purgecss')

const inputFile = path.join(__dirname, '../_includes/less/main.less')
const outputFile = path.join(__dirname, '../css/style.css')
const desc = require('../../../package.json').description

const comment = `/* ${desc} */`


// const sourceContent = [
//   '../**/*.njk',
//   '../_includes/**/*.html',
//   '../_includes/**/*.md',
//   '../_includes/*.md',
//   '../_includes/*.njk'
// ];


const fileName = "styles.css";

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, '../_includes/less/main.less')
    const rawLess = await fs.readFileSync(inputFile).toString()
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss:  await less.render( rawLess, {
        filename: path.resolve(rawFilepath)
      })
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return await postcss([
      // purgeCSS({
      //   content: sourceContent,
      //   variables: true,
      //   keyframes: true
      // }), // remove css markup not in the templates
      require('autoprefixer'), //prefix for older browsers
      require('cssnano') //minify the css
    ])
    .process(rawCss.css, { from: rawFilepath })
    .then(result => `${comment}\n\n${result.css}`);
  };
}
