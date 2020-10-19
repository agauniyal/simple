const unified = require('unified');
const markdown = require('remark-parse');
const frontmatter = require('remark-frontmatter');
const slug = require('remark-slug');
const linkHeadings = require('remark-autolink-headings');
const squeezeParagraphs = require('remark-squeeze-paragraphs');
const externalLinks = require('remark-external-links');
const gfm = require('remark-gfm');
const remark2rehype = require('remark-rehype');
const format = require('rehype-format');
const html = require('rehype-stringify');
const shiki = require('rehype-shiki');
const yaml = require('js-yaml');

extractPostMeta = (post_metas) => {
  return (tree) => {
    meta = yaml.load(tree.children[0].value);
    post_metas.push(meta);
  };
};

const preprocess = (post_metas) =>
  unified()
    .use(markdown)
    .use(() => extractPostMeta(post_metas))
    .use(gfm)
    .use(frontmatter, ['yaml', 'toml'])
    .use(externalLinks, { target: false, rel: ['nofollow'] })
    .use(slug)
    .use(linkHeadings)
    .use(squeezeParagraphs)
    .use(remark2rehype)
    .use(format)
    .use(html)
    .data('settings', { fragment: true })
    .use(shiki);

module.exports = {
  preprocess,
};
