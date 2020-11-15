const axios = require('axios');
const pug = require('pug');
const nodeHtmlToImage = require('node-html-to-image');
const wallpaper = require('wallpaper');

axios.get('https://quotes.rest/qod?language=en')
  .then(({ data }) => {
    const { quote, author } = data.contents.quotes[0];
    const compilePug = pug.compileFile(__dirname + '/index.pug');
    const imagePath = __dirname + '/bg.jpg';
    nodeHtmlToImage({
      output: imagePath,
      type: 'jpeg',
      quality: 100,
      html: compilePug({ quote, author })
    }).then(() => {
      wallpaper.set(imagePath);
    });
  })
  .catch(() => console.log('API Timeout: Try again after an hour'));