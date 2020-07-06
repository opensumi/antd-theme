const lessToJs = require('less-vars-to-js');
const fs = require('fs');

// Read the less file in as string
const paletteLess = fs.readFileSync(__dirname + '/antd.less', 'utf8');

// Pass in file contents
const palette = lessToJs(paletteLess, { resolveVariables: true, stripPrefix: true });
fs.writeFileSync(__dirname + '/a.js', JSON.stringify(palette, null, 4), 'utf-8');
