module.exports = {
  url: process.env.URL || "http://localhost:8080",
  siteName: require('../../..//package.json').name,
  siteDescription: require('../../../package.json').description,
  authorName: require('../../../package.json').author.name,
};
