const express = require('express')
const next = require('next')
const { parse } = require('url');
const { assetPrefix } = require('./build');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const replace = require('replace-in-file');
const nextBuildDir = `${process.cwd()}/.next`;
const ENV_SECRET = 'xxxabc123';

// Set env variable on server side
process.env.SECRET_X = ENV_SECRET;

// Replace 
const replaceConf = {
  from: [/REPLACED_AT_RUNTIME_SECRET_X/g],
  to: [ENV_SECRET],
  files: [`${nextBuildDir}/*`, `${nextBuildDir}/**/*`],
};
const filesAltered = replace.sync(replaceConf).filter(e => e.hasChanged);

console.log(`Altered ${filesAltered.length} build files...`);

(async () => {
  await app.prepare();

  const server = express();
  //const { assetPrefix } = await app.loadConfig();

  server.get(`/${assetPrefix}*`, (req, res) => {
    req.url = req.url.replace(`${assetPrefix}/`, '');

    return handle(req, res, parse(req.url, true));
  });

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})();
