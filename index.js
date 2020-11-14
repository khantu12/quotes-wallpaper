const axios = require('axios');
const pug = require('pug');
const htmlToImage = require('node-html-to-image');
const wallpaper = require('wallpaper');

const get_qod = async () => {
  return await axios.get('https://quotes.rest/qod?language=en')
    .then(({ data }) => data.contents.quotes[0]);
}

const main = async () => {
  const { quote, author } = await get_qod();
  const compiledHtml = pug.compile('index.pug', { quote, author });
  await htmlToImage({
    output: './bg.png',
    html: compiledHtml
  });
  await wallpaper.set('./bg.png');
}

main();