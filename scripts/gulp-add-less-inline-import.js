const PluginError = require('plugin-error');
const through = require('through2');

const pluginName = 'gulp-add-less-inline-import';

function handleLessInlineImport(content) {
  return content.replace(/@import/g, '@import (inline)');
}

module.exports = () => {
  return through.obj(function (file, enc, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(new PluginError(pluginName, 'Streaming not supported'));
      return;
    }

    try {
      const compiledLessVarsText = handleLessInlineImport(file.contents.toString());
      file.contents = Buffer.from(compiledLessVarsText);
      this.push(file);
    } catch (error) {
      this.emit(
        'error',
        new PluginError(pluginName, error, {
          fileName: file.path,
          showProperties: false,
        }),
      );
    }
    callback();
  });
};
