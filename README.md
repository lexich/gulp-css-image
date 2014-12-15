# gulp-css-image
==============
> Gulp task for generate css/scss classes from the existing images

[![Build Status](https://travis-ci.org/lexich/gulp-css-image.svg)](https://travis-ci.org/lexich/gulp-css-image)
[![npm version](https://badge.fury.io/js/gulp-css-image.svg)](http://badge.fury.io/js/gulp-css-image)
[![Coverage Status](https://coveralls.io/repos/lexich/gulp-css-image/badge.png)](https://coveralls.io/r/lexich/gulp-css-image)
[![Dependency Status](https://david-dm.org/lexich/gulp-css-image.svg)](https://david-dm.org/lexich/gulp-css-image)
[![devDependency Status](https://david-dm.org/lexich/gulp-css-image/dev-status.svg)](https://david-dm.org/lexich/gulp-css-image#info=devDependencies)

## Usage
### Default Usage (generate css)
```javascript
var cssimage = require("gulp-css-image");
gulp.task("cssimage", function(){
  return gulp.src("images/**/**")
    .pipe(cssimage())
    .pipe(gulp.dest("./image.css"))
});
```

```bash
> ls -l ./images
1.jpg
```

image.css
```css
/* This file is generated */
.img_1{
  width: 400px;
  height: 300px;
  background-image: url(1.jpg);
  background-size: 400px 300px;
}
```
### Generate scss
If you want generate scss use `scss` options
```javascript
var cssimage = require("gulp-css-image");
gulp.task("cssimage", function(){
  return gulp.src("images/**/**")
    .pipe(cssimage({
      css: false,
      scss: true,
      name: "image.css"
    }))
    .pipe(gulp.dest("."))
});
```
```scss
/* This file is generated */
@mixin img_1(){
  width: 400px;
  height: 300px;
  background-image: url(1.jpg);
  background-size: 400px 300px;
}
img_1__width: 400px;
img_1__height: 300px;
```

## Options
gulp-css-image is gulp plugin and use [css-image](https://github.com/lexich/css-image) module functionality. Full description of option's configuration read [css-image](https://github.com/lexich/css-image#options)

###Default options
- css: true
- scss: false
- retina: false,
- squeeze: 1
- root: ""
- separator: "_"
- prefix: "img_"
- name: "_img.css"

## Changelog:
0.0.3 - bug fix (add lodash to deps)  
0.0.2 - add `name` option of generated file  
0.0.1 - release  
