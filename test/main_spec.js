var Vinyl = require('vinyl'),
  gulp = require("gulp"),
  fs = require("fs"),
  cssimage = require("../"),
  through2 = require("through2"),
  libpath = require("path"),
  should = require("chai").should();

describe("test grunt-css-image", function () {
  var nullimagesPath = libpath.join(__dirname, "expected", "_nullimages.css");
  var nullimages = new Vinyl({
    path: nullimagesPath,
    cwd: "",
    base: ".",
    contents: fs.readFileSync(nullimagesPath)
  });

  var retinaPath = libpath.join(__dirname, "expected", "_retina.scss");
  var retina = new Vinyl({
    path: retinaPath,
    cwd: "",
    base: ".",
    contents: fs.readFileSync(retinaPath)
  });


  var check = function (options) {
    return gulp.src(libpath.join(__dirname, "fixtures", "images", "**/**"))
      .pipe(cssimage(options))
  }

  it("check custom", function (done) {
    var contents = fs.readFileSync(
      libpath.join(__dirname, "expected", "_custom.css")
    ).toString();
    check({
      prefix: "custom-",
      root: "http://example.com",
      separator: "--"
    }).pipe(through2.obj(function (newFile, enc, cb) {
      should.exist(newFile);
      should.exist(newFile.contents);
      contents.should.eql(newFile.contents.toString());
      cb();
      done();
    }));
  });

  it("check full", function () {
    var contents = fs.readFileSync(
      libpath.join(__dirname, "expected", "_full.scss")
    ).toString();
    check({
      sass: true,
      css: true
    }).pipe(through2.obj(function (newFile, enc, cb) {
      should.exist(newFile);
      should.exist(newFile.contents);
      contents.should.eql(newFile.contents.toString());
      cb();
      done();
    }));
  });

  it("check nullimages", function () {
    var contents = fs.readFileSync(
      libpath.join(__dirname, "expected", "_nullimages.css")
    ).toString();
    check({
      sass: false,
      css: false
    }).pipe(through2.obj(function (newFile, enc, cb) {
      should.exist(newFile);
      should.exist(newFile.contents);
      contents.should.eql(newFile.contents.toString());
      cb();
      done();
    }));
  });

  it("check retina", function () {
    var contents = fs.readFileSync(
      libpath.join(__dirname, "expected", "_retina.scss")
    ).toString();
    check({
      sass: true,
      css: false,
      retina: true
    }).pipe(through2.obj(function (newFile, enc, cb) {
      should.exist(newFile);
      should.exist(newFile.contents);
      contents.should.eql(newFile.contents.toString());
      cb();
      done();
    }));
  });
});
