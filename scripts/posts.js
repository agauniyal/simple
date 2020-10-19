const fragments = require('./fragments');
const fs = require('fs');
const report = require('vfile-reporter');
const path = require('path');
const replaceExt = require('replace-ext');

const get = () => {
  return fs
    .readdirSync('./posts', { withFileTypes: true })
    .filter((item) => !item.isDirectory() && item.name.endsWith('.md'))
    .map((item) => 'posts/' + item.name);
};

const write = (error, file) => {
  if (error) throw error;
  console.error(report(file));

  const pathToWrite = replaceExt(path.join(file.cwd, 'docs', file.history[0]), '.html');
  const content = fragments.header + file.contents + fragments.footer;
  fs.writeFileSync(pathToWrite, content);
};

const posts_tohtml = (posts) => {
  list = '';
  for (let p of posts)
    list += `
  <li>
    <div>
      <a href=${p.link}>${p.title}</a>
      <span>(${p.tags.join(', ')})</span>
    </div>
    <div>${p.date}</div>
  </li>
  `;

  return `
  <ul class="posts_list">
    ${list}
  </ul>
  `;
};

module.exports = {
  get,
  write,
  posts_tohtml,
};
