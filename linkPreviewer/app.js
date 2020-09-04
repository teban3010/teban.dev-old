require('dotenv').config();

const path = require('path');
const { promises: fs } = require('fs');
const matter = require('gray-matter');
const linkPreviewGenerator = require('link-preview-generator');
const axios = require('axios');

const getFiles = async (p = path.join(__dirname, '..')) => {
  const entries = await fs.readdir(p, { withFileTypes: true });

  // Get files within the current directory and add a path key to the file objects
  const files = entries
    .filter((file) => !file.isDirectory())
    .filter((file) => file.name.includes('.md'))
    .map((file) => ({ ...file, path: p + file.name }));

  // Get folders within the current directory
  const folders = entries.filter((folder) => folder.isDirectory());

  /*
          Add the found files within the subdirectory to the files array by calling the
          current function itself
        */
  for (const folder of folders) {
    files.push(...(await getFiles(path.join(p, folder.name, '/'))));
  }

  return files;
};

const getPreviewLink = (content) => {
  const regex = /\[\%card\]\((.*?)\)/g;
  let str = content;
  let m;
  let previewLinks = [];

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    previewLinks.push(m[1]);

    str = str.replace(m[0], '');
  }

  return previewLinks;
};

const getPreviewData = async (links) => {
  let previewData = [];

  for (const link of links) {
    try {
      console.log(`Processing ${link}`);
      const data = await linkPreviewGenerator(link);
      previewData.push({ ...data, url: link });
    } catch (error) {
      console.log(`Cannot process ${link}, error: ${error.message}`);
    }
  }

  return previewData;
};

const savePreviewData = async (previewData) => {
  try {
    await axios.post(process.env.API_SETTER_URL, previewData);
  } catch (error) {
    console.error(error);
  }
};

const getFilesContent = async () => {
  const files = await getFiles(path.join(__dirname, '..'));

  let links = [];

  for (const file of files) {
    const { content } = matter((await fs.readFile(file.path)).toString());
    const previewLinks = getPreviewLink(content);

    if (previewLinks.length > 0) {
      links = links.concat(previewLinks);
    }
  }

  links = links.filter((l, idx) => links.indexOf(l) === idx);

  if (links.length === 0) {
    return;
  }

  const previewData = await getPreviewData(links);

  if (previewData.length > 0) {
    return;
  }

  await savePreviewData();
};

getFilesContent();
