module.exports = function (eleventyConfig) {

   // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

  // eleventyConfig.addWatchTarget("./src/site/_includes/js/*.js");
  // eleventyConfig.addWatchTarget("./src/site/_includes/less/*.less");

  // This year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // minify the html output
  eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // pass some assets right through for now as there is no images
  eleventyConfig.addPassthroughCopy("./src/site/images");

  // Copy src/compiled-assets to /assets
  eleventyConfig.addPassthroughCopy({ 'src/site/scripts': 'assets' });

  return {
    dir: {
      input: 'src/site',
      output: '_site',
      data: "_data"
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };
};