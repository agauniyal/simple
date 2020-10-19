const processor = require('./processor');
const posts = require('./posts');
const fragments = require('./fragments');
const vfile = require('to-vfile');
const replaceExt = require('replace-ext');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

rimraf.sync('docs');
mkdirp.sync('docs/posts');

post_metas = [];

// generate posts
posts.get().forEach((post) => {
  p = processor.preprocess(post_metas);
  p.process(vfile.readSync(post), posts.write);
});

post_metas.forEach((meta, i) => {
  meta['link'] = replaceExt(posts.get()[i], '.html');
});

// generate intro
pathToIntro = path.join('docs', 'index.html');
listOfPosts = posts.posts_tohtml(post_metas);
fs.writeFileSync(pathToIntro, fragments.header + fragments.intro + listOfPosts + fragments.footer);
