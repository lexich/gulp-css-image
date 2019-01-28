var through2 = require("through2"),
  sizeOf = require("image-size"),
  libpath = require("path"),
  defaults = require("lodash/defaults"),
  cssimage = require("css-image"),
  Vinyl = require('vinyl'),
  PluginError = require('plugin-error');

module.exports = function (param) {
  "use strict";
  // if necessary check for required param(s), e.g. options hash, etc.
  if (!param) {
    param = {};
  }
  var options = defaults(param, {
    css: true,
    scss: false,
    retina: false,
    squeeze: 1,
    root: "",
    separator: "_",
    prefix: "img_",
    name: "_img.css"
  });

  var info = [];
  // see "Writing a plugin"
  // https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
  function process_css_image(file, enc, callback) {
    /*jshint validthis:true*/

    // Do nothing if no contents
    if (file.isNull()) {
      return callback();
    }
    if (file.isStream()) {
      this.emit("error",
        new PluginError("gulp-css-image", "Stream content is not supported"));
      return callback();
    }
    // check if file.contents is a `Buffer`
    if (file.isBuffer() || file.isFile()) {
      try {
        var result = sizeOf(file.path);

        result.file = libpath.relative(file.base, file.path);
        info.push(result);
      } catch (e) {}
    }
    return callback();
  }

  function flush_css_image(callback) {
    var txt = "/* This file is generated */\n";
    txt += cssimage(info, options);
    this.push(new Vinyl({
      base: ".",
      path: options.name,
      contents: new Buffer(txt)
    }));
    return callback();
  }

  return through2.obj(process_css_image, flush_css_image);
};
