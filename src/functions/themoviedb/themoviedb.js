const fetch = require("node-fetch");
const { URLSearchParams } = require('url');
 
exports.handler = async function(event, context) {

  const params = new URLSearchParams();
        params.append('api_key', process.env.TMDB_API);
        params.append('language', 'en-GB');

  const url = `https://api.themoviedb.org/3/movie/now_playing?${params}`;

  const headers = {
    Accept: "application/json",
  };

  try {
    const response = await fetch(url, {
      headers
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      console.log(response)
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();




    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};