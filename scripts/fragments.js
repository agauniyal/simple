const fs = require('fs');

const header = fs.readFileSync('fragments/header.html');
const intro = fs.readFileSync('fragments/intro.html');
const footer = fs.readFileSync('fragments/footer.html');

module.exports = {
  header,
  intro,
  footer,
};
