const axios = require('axios');
const pug = require('pug');
const nodeHtmlToImage = require('node-html-to-image');
const wallpaper = require('wallpaper');

const get_qod = async () => {
  return await axios.get('https://quotes.rest/qod?language=en')
    .then(({ data }) => data.contents.quotes[0]);
}

const main = async () => {
  const { quote, author } = await get_qod();
  const compiledHtml = pug.compileFile('index.pug');
  nodeHtmlToImage({
    output: './bg.jpg',
    type: 'jpeg',
    quality: 100,
    html: compiledHtml({quote, author})
  }).then(() => {
    wallpaper.set('./bg.jpg');
  });
}

main();