const fs = require('fs');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const getFolders = (path) => fs.readdirSync(`${process.cwd()}/content/${path}`);

module.exports = withPlugins([optimizedImages], {
  trailingSlash: true,
  exportPathMap: function () {
    const posts = getFolders('posts');
    const talks = getFolders('talks');
    const tips = getFolders('tip');

    const paths = {
      '/': { page: '/' },
    };

    posts.forEach((fn) => {
      paths[`/post/${fn.replace('.md', '')}`] = {
        page: '/post/[slug]',
        query: { params: { slug: fn.replace('.md', '') } },
      };
    });

    talks.forEach((fn) => {
      paths[`/talks/${fn.replace('.md', '')}`] = {
        page: '/talks/[slug]',
        query: { params: { slug: fn.replace('.md', '') } },
      };
    });

    tips.forEach((fn) => {
      paths[`/tip/${fn.replace('.md', '')}`] = {
        page: '/tip/[slug]',
        query: { params: { slug: fn.replace('.md', '') } },
      };
    });

    return paths;
  },
});
